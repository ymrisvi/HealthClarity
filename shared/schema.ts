import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const medicalReports = pgTable("medical_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  extractedText: text("extracted_text"),
  analysis: jsonb("analysis"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const medicineSearches = pgTable("medicine_searches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  medicineName: text("medicine_name").notNull(),
  searchResult: jsonb("search_result"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  medicalReports: many(medicalReports),
  medicineSearches: many(medicineSearches),
}));

export const medicalReportsRelations = relations(medicalReports, ({ one }) => ({
  user: one(users, {
    fields: [medicalReports.userId],
    references: [users.id],
  }),
}));

export const medicineSearchesRelations = relations(medicineSearches, ({ one }) => ({
  user: one(users, {
    fields: [medicineSearches.userId],
    references: [users.id],
  }),
}));

export const insertMedicalReportSchema = createInsertSchema(medicalReports).omit({
  id: true,
  createdAt: true,
});

export const insertMedicineSearchSchema = createInsertSchema(medicineSearches).omit({
  id: true,
  createdAt: true,
});

export const upsertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export type InsertMedicalReport = z.infer<typeof insertMedicalReportSchema>;
export type MedicalReport = typeof medicalReports.$inferSelect;

export type InsertMedicineSearch = z.infer<typeof insertMedicineSearchSchema>;
export type MedicineSearch = typeof medicineSearches.$inferSelect;

export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;

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
