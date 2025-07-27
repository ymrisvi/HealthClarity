import OpenAI from "openai";
import { type MedicalAnalysis, type MedicineInfo, medicalAnalysisSchema, medicineInfoSchema } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || process.env.API_KEY 
});

export async function analyzeMedicalReport(
  extractedText: string, 
  reportType?: string, 
  personContext?: { name: string; age?: number; sex?: string; height?: number; weight?: number }
): Promise<MedicalAnalysis> {
  try {
    let contextInfo = "";
    if (personContext) {
      contextInfo = `
    
    Patient context for this analysis:
    - Name: ${personContext.name}
    ${personContext.age ? `- Age: ${personContext.age} years old` : ''}
    ${personContext.sex ? `- Sex: ${personContext.sex}` : ''}
    ${personContext.height ? `- Height: ${personContext.height} cm` : ''}
    ${personContext.weight ? `- Weight: ${personContext.weight} kg` : ''}
    
    Please consider this person's demographics when explaining the results and reference ranges.`;
    }

    const prompt = `You are a medical expert tasked with explaining medical reports in simple, non-technical language. 
    
    Analyze the following medical report text and provide a clear explanation suitable for patients:
    
    "${extractedText}"${contextInfo}
    
    Please respond with a JSON object containing:
    - summary: A brief overview of what this report shows${personContext ? ` for ${personContext.name}` : ''}
    - normalResults: Array of findings that are within normal ranges (explain in simple terms, consider age/sex specific ranges where relevant)
    - needsAttention: Array of findings that may need attention (explain in simple terms, no medical jargon, consider demographic context)
    - explanation: A paragraph explaining what these results mean for the patient's health${personContext ? `, taking into account their age and demographics` : ''}
    - reportType: The type of medical report this appears to be (e.g., "Blood Test", "ECG", "X-Ray", etc.)
    
    Use simple language, avoid medical jargon, and focus on helping the patient understand their results without providing medical advice or recommendations.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful medical information assistant. Explain medical reports in simple terms without providing medical advice or recommendations. Always remind users to consult healthcare professionals for medical decisions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return medicalAnalysisSchema.parse(result);
  } catch (error) {
    console.error("Error analyzing medical report:", error);
    throw new Error("Failed to analyze medical report. Please try again.");
  }
}

export async function analyzeMedicalImage(base64Image: string, fileType: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all visible text from this medical report image. Focus on medical data, test results, measurements, and any diagnostic information. Return only the extracted text content."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${fileType};base64,${base64Image}`
              }
            }
          ],
        },
      ],
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("Error analyzing medical image:", error);
    throw new Error("Failed to extract text from image. Please try again.");
  }
}

export async function getMedicineInformation(medicineName: string): Promise<MedicineInfo> {
  try {
    const prompt = `Provide detailed information about the medicine "${medicineName}" in simple, patient-friendly language.
    
    Please respond with a JSON object containing:
    - medicineName: The name of the medicine
    - medicineType: What type of medicine it is (e.g., "Pain reliever", "Antibiotic", etc.)
    - whatItDoes: Simple explanation of what this medicine does
    - expectedEffects: Array of what patients can expect when taking this medicine
    - sideEffects: Object with three arrays:
      - common: Common side effects (>1% of patients)
      - rare: Rare side effects (<1% of patients) 
      - serious: Serious side effects that require immediate medical attention
    - contraindications: Array of who should not take this medicine
    - importantNotes: Array of important reminders about dosage, interactions, etc.
    
    Use simple language, avoid medical jargon, and focus on practical information patients need to know. Do not provide dosage recommendations or medical advice.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful pharmaceutical information assistant. Provide medicine information in simple terms without giving medical advice or specific dosage recommendations. Always remind users to consult healthcare professionals."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return medicineInfoSchema.parse(result);
  } catch (error) {
    console.error("Error getting medicine information:", error);
    throw new Error("Failed to get medicine information. Please try again.");
  }
}
