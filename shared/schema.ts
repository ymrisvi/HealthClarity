import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const medicalReports = pgTable("medical_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  extractedText: text("extracted_text"),
  analysis: jsonb("analysis"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const medicineSearches = pgTable("medicine_searches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  medicineName: text("medicine_name").notNull(),
  searchResult: jsonb("search_result"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMedicalReportSchema = createInsertSchema(medicalReports).omit({
  id: true,
  createdAt: true,
});

export const insertMedicineSearchSchema = createInsertSchema(medicineSearches).omit({
  id: true,
  createdAt: true,
});

export type InsertMedicalReport = z.infer<typeof insertMedicalReportSchema>;
export type MedicalReport = typeof medicalReports.$inferSelect;

export type InsertMedicineSearch = z.infer<typeof insertMedicineSearchSchema>;
export type MedicineSearch = typeof medicineSearches.$inferSelect;

// Response types for API
export const medicalAnalysisSchema = z.object({
  summary: z.string(),
  normalResults: z.array(z.string()),
  needsAttention: z.array(z.string()),
  explanation: z.string(),
  reportType: z.string(),
});

export const medicineInfoSchema = z.object({
  medicineName: z.string(),
  medicineType: z.string(),
  whatItDoes: z.string(),
  expectedEffects: z.array(z.string()),
  sideEffects: z.object({
    common: z.array(z.string()),
    rare: z.array(z.string()),
    serious: z.array(z.string()),
  }),
  contraindications: z.array(z.string()),
  importantNotes: z.array(z.string()),
});

export type MedicalAnalysis = z.infer<typeof medicalAnalysisSchema>;
export type MedicineInfo = z.infer<typeof medicineInfoSchema>;
