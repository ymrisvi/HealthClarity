import { medicalReports, medicineSearches, type MedicalReport, type InsertMedicalReport, type MedicineSearch, type InsertMedicineSearch } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // Medical Reports
  createMedicalReport(report: InsertMedicalReport): Promise<MedicalReport>;
  getMedicalReport(id: string): Promise<MedicalReport | undefined>;
  
  // Medicine Searches
  createMedicineSearch(search: InsertMedicineSearch): Promise<MedicineSearch>;
  getMedicineSearch(medicineName: string): Promise<MedicineSearch | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createMedicalReport(insertReport: InsertMedicalReport): Promise<MedicalReport> {
    const [report] = await db
      .insert(medicalReports)
      .values(insertReport)
      .returning();
    return report;
  }

  async getMedicalReport(id: string): Promise<MedicalReport | undefined> {
    const [report] = await db
      .select()
      .from(medicalReports)
      .where(eq(medicalReports.id, id));
    return report || undefined;
  }

  async createMedicineSearch(insertSearch: InsertMedicineSearch): Promise<MedicineSearch> {
    const [search] = await db
      .insert(medicineSearches)
      .values(insertSearch)
      .returning();
    return search;
  }

  async getMedicineSearch(medicineName: string): Promise<MedicineSearch | undefined> {
    const [search] = await db
      .select()
      .from(medicineSearches)
      .where(eq(medicineSearches.medicineName, medicineName));
    return search || undefined;
  }
}

export class MemStorage implements IStorage {
  private medicalReports: Map<string, MedicalReport>;
  private medicineSearches: Map<string, MedicineSearch>;

  constructor() {
    this.medicalReports = new Map();
    this.medicineSearches = new Map();
  }

  async createMedicalReport(insertReport: InsertMedicalReport): Promise<MedicalReport> {
    const id = randomUUID();
    const report: MedicalReport = {
      ...insertReport,
      id,
      createdAt: new Date(),
      extractedText: insertReport.extractedText ?? null,
      analysis: insertReport.analysis ?? null,
    };
    this.medicalReports.set(id, report);
    return report;
  }

  async getMedicalReport(id: string): Promise<MedicalReport | undefined> {
    return this.medicalReports.get(id);
  }

  async createMedicineSearch(insertSearch: InsertMedicineSearch): Promise<MedicineSearch> {
    const id = randomUUID();
    const search: MedicineSearch = {
      ...insertSearch,
      id,
      createdAt: new Date(),
      searchResult: insertSearch.searchResult ?? null,
    };
    this.medicineSearches.set(id, search);
    return search;
  }

  async getMedicineSearch(medicineName: string): Promise<MedicineSearch | undefined> {
    return Array.from(this.medicineSearches.values()).find(
      (search) => search.medicineName.toLowerCase() === medicineName.toLowerCase()
    );
  }
}

export const storage = new DatabaseStorage();
