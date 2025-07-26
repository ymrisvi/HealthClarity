import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { insertMedicalReportSchema, insertMedicineSearchSchema } from "@shared/schema";
import { analyzeMedicalReport, analyzeMedicalImage, getMedicineInformation } from "./services/openai";
import { extractTextFromImage } from "./services/ocr";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Upload and analyze medical report
  app.post("/api/reports/upload", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { originalname, mimetype, buffer } = req.file;
      
      let extractedText = "";
      
      // Extract text based on file type
      if (mimetype === 'application/pdf') {
        // For PDFs, we'll use OpenAI vision API as a fallback
        const base64 = buffer.toString('base64');
        extractedText = await analyzeMedicalImage(base64, mimetype);
      } else {
        // For images, try OCR first, then OpenAI vision as fallback
        try {
          extractedText = await extractTextFromImage(buffer);
          
          // If OCR doesn't extract much text, use OpenAI vision
          if (extractedText.length < 50) {
            const base64 = buffer.toString('base64');
            extractedText = await analyzeMedicalImage(base64, mimetype);
          }
        } catch (ocrError) {
          console.log("OCR failed, using OpenAI vision:", ocrError);
          const base64 = buffer.toString('base64');
          extractedText = await analyzeMedicalImage(base64, mimetype);
        }
      }

      if (!extractedText || extractedText.length < 10) {
        return res.status(400).json({ 
          message: "Unable to extract readable text from the uploaded file. Please ensure the image is clear and contains medical report text." 
        });
      }

      // Analyze the extracted text
      const analysis = await analyzeMedicalReport(extractedText);

      // Store the report
      const reportData = insertMedicalReportSchema.parse({
        fileName: originalname,
        fileType: mimetype,
        extractedText,
        analysis,
      });

      const savedReport = await storage.createMedicalReport(reportData);

      res.json({
        reportId: savedReport.id,
        analysis,
        extractedText: extractedText.substring(0, 500) + (extractedText.length > 500 ? '...' : ''), // Return truncated text for reference
      });

    } catch (error) {
      console.error("Report upload error:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to process medical report"
      });
    }
  });

  // Get report by ID
  app.get("/api/reports/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const report = await storage.getMedicalReport(id);
      
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }

      res.json({
        id: report.id,
        fileName: report.fileName,
        analysis: report.analysis,
        createdAt: report.createdAt,
      });
    } catch (error) {
      console.error("Get report error:", error);
      res.status(500).json({ message: "Failed to retrieve report" });
    }
  });

  // Search medicine information
  app.post("/api/medicines/search", async (req, res) => {
    try {
      const { medicineName } = req.body;
      
      if (!medicineName || typeof medicineName !== 'string') {
        return res.status(400).json({ message: "Medicine name is required" });
      }

      const cleanedName = medicineName.trim();
      if (cleanedName.length < 2) {
        return res.status(400).json({ message: "Medicine name must be at least 2 characters long" });
      }

      // Check if we already have this medicine information
      let existingSearch = await storage.getMedicineSearch(cleanedName);
      
      if (existingSearch && existingSearch.searchResult) {
        return res.json({
          searchId: existingSearch.id,
          medicineInfo: existingSearch.searchResult,
          cached: true,
        });
      }

      // Get medicine information from OpenAI
      const medicineInfo = await getMedicineInformation(cleanedName);

      // Store the search result
      const searchData = insertMedicineSearchSchema.parse({
        medicineName: cleanedName,
        searchResult: medicineInfo,
      });

      const savedSearch = await storage.createMedicineSearch(searchData);

      res.json({
        searchId: savedSearch.id,
        medicineInfo,
        cached: false,
      });

    } catch (error) {
      console.error("Medicine search error:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to search medicine information"
      });
    }
  });

  // Get popular medicine searches (for autocomplete suggestions)
  app.get("/api/medicines/popular", async (req, res) => {
    try {
      // Return some common medicine names for autocomplete
      const popularMedicines = [
        "Paracetamol", "Ibuprofen", "Aspirin", "Omeprazole", "Metformin",
        "Amlodipine", "Simvastatin", "Levothyroxine", "Salbutamol", "Prednisolone",
        "Amoxicillin", "Diclofenac", "Ranitidine", "Cetirizine", "Lorazepam"
      ];
      
      res.json({ medicines: popularMedicines });
    } catch (error) {
      console.error("Popular medicines error:", error);
      res.status(500).json({ message: "Failed to get popular medicines" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
