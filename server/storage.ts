import { type MedicalReport, type InsertMedicalReport, type MedicineSearch, type InsertMedicineSearch } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Medical Reports
  createMedicalReport(report: InsertMedicalReport): Promise<MedicalReport>;
  getMedicalReport(id: string): Promise<MedicalReport | undefined>;
  
  // Medicine Searches
  createMedicineSearch(search: InsertMedicineSearch): Promise<MedicineSearch>;
  getMedicineSearch(medicineName: string): Promise<MedicineSearch | undefined>;
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

export const storage = new MemStorage();
