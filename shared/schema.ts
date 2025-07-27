import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, index, boolean, integer, date, decimal } from "drizzle-orm/pg-core";
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
  isAdmin: boolean("is_admin").default(false),
  usageCount: integer("usage_count").default(0),
  lastVisit: timestamp("last_visit"),
  totalVisits: integer("total_visits").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Persons table - individuals for whom medical reports can be tracked
export const persons = pgTable("persons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  name: varchar("name").notNull(),
  age: integer("age"),
  sex: varchar("sex"), // 'Male', 'Female', 'Other'
  height: decimal("height", { precision: 5, scale: 2 }), // in cm
  weight: decimal("weight", { precision: 5, scale: 2 }), // in kg
  relationship: varchar("relationship"), // 'Self', 'Spouse', 'Child', 'Parent', 'Other'
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const medicalReports = pgTable("medical_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  personId: varchar("person_id").references(() => persons.id),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  extractedText: text("extracted_text"),
  analysis: jsonb("analysis"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const medicineSearches = pgTable("medicine_searches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  personId: varchar("person_id").references(() => persons.id),
  medicineName: text("medicine_name").notNull(),
  searchResult: jsonb("search_result"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User activity tracking table for admin analytics
export const userActivity = pgTable("user_activity", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  activityType: varchar("activity_type").notNull(), // 'login', 'report_upload', 'medicine_search'
  details: jsonb("details"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Daily usage statistics for admin dashboard
export const usageStats = pgTable("usage_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  date: date("date").notNull(),
  reportAnalyses: integer("report_analyses").default(0),
  medicineSearches: integer("medicine_searches").default(0),
  totalActions: integer("total_actions").default(0),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  persons: many(persons),
  medicalReports: many(medicalReports),
  medicineSearches: many(medicineSearches),
  userActivity: many(userActivity),
  usageStats: many(usageStats),
}));

export const personsRelations = relations(persons, ({ one, many }) => ({
  user: one(users, {
    fields: [persons.userId],
    references: [users.id],
  }),
  medicalReports: many(medicalReports),
  medicineSearches: many(medicineSearches),
}));

export const medicalReportsRelations = relations(medicalReports, ({ one }) => ({
  user: one(users, {
    fields: [medicalReports.userId],
    references: [users.id],
  }),
  person: one(persons, {
    fields: [medicalReports.personId],
    references: [persons.id],
  }),
}));

export const medicineSearchesRelations = relations(medicineSearches, ({ one }) => ({
  user: one(users, {
    fields: [medicineSearches.userId],
    references: [users.id],
  }),
  person: one(persons, {
    fields: [medicineSearches.personId],
    references: [persons.id],
  }),
}));

export const userActivityRelations = relations(userActivity, ({ one }) => ({
  user: one(users, {
    fields: [userActivity.userId],
    references: [users.id],
  }),
}));

export const usageStatsRelations = relations(usageStats, ({ one }) => ({
  user: one(users, {
    fields: [usageStats.userId],
    references: [users.id],
  }),
}));

export const insertPersonSchema = createInsertSchema(persons).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  age: z.number().int().min(0).max(120).optional(),
  sex: z.enum(['Male', 'Female', 'Other']).optional(),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  relationship: z.enum(['Self', 'Spouse', 'Child', 'Parent', 'Sibling', 'Other']).optional(),
});

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

export type InsertPerson = z.infer<typeof insertPersonSchema>;
export type Person = typeof persons.$inferSelect;

export type InsertMedicalReport = z.infer<typeof insertMedicalReportSchema>;
export type MedicalReport = typeof medicalReports.$inferSelect;

export type InsertMedicineSearch = z.infer<typeof insertMedicineSearchSchema>;
export type MedicineSearch = typeof medicineSearches.$inferSelect;

export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;

export type UserActivity = typeof userActivity.$inferSelect;
export type InsertUserActivity = typeof userActivity.$inferInsert;
export type UsageStats = typeof usageStats.$inferSelect;
export type InsertUsageStats = typeof usageStats.$inferInsert;

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
