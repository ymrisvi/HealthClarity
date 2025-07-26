import { 
  medicalReports, 
  medicineSearches, 
  users,
  type MedicalReport, 
  type InsertMedicalReport, 
  type MedicineSearch, 
  type InsertMedicineSearch,
  type User,
  type UpsertUser
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Medical Reports
  createMedicalReport(report: InsertMedicalReport): Promise<MedicalReport>;
  getMedicalReport(id: string): Promise<MedicalReport | undefined>;
  getUserMedicalReports(userId: string): Promise<MedicalReport[]>;
  
  // Medicine Searches
  createMedicineSearch(search: InsertMedicineSearch): Promise<MedicineSearch>;
  getMedicineSearch(medicineName: string): Promise<MedicineSearch | undefined>;
  getUserMedicineSearches(userId: string): Promise<MedicineSearch[]>;
  
  // Usage tracking for anonymous users
  getAnonymousUsageCount(sessionId: string): Promise<number>;
  incrementAnonymousUsage(sessionId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  private anonymousUsage = new Map<string, number>();

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Medical Reports
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

  async getUserMedicalReports(userId: string): Promise<MedicalReport[]> {
    return await db
      .select()
      .from(medicalReports)
      .where(eq(medicalReports.userId, userId))
      .orderBy(desc(medicalReports.createdAt));
  }

  // Medicine Searches
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

  async getUserMedicineSearches(userId: string): Promise<MedicineSearch[]> {
    return await db
      .select()
      .from(medicineSearches)
      .where(eq(medicineSearches.userId, userId))
      .orderBy(desc(medicineSearches.createdAt));
  }

  // Anonymous usage tracking
  async getAnonymousUsageCount(sessionId: string): Promise<number> {
    return this.anonymousUsage.get(sessionId) || 0;
  }

  async incrementAnonymousUsage(sessionId: string): Promise<void> {
    const current = this.anonymousUsage.get(sessionId) || 0;
    this.anonymousUsage.set(sessionId, current + 1);
  }
}

export class MemStorage implements IStorage {
  private medicalReports: Map<string, MedicalReport>;
  private medicineSearches: Map<string, MedicineSearch>;
  private users: Map<string, User>;
  private anonymousUsage: Map<string, number>;

  constructor() {
    this.medicalReports = new Map();
    this.medicineSearches = new Map();
    this.users = new Map();
    this.anonymousUsage = new Map();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = this.users.get(userData.id!);
    const user: User = {
      ...userData,
      id: userData.id!,
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      createdAt: existingUser?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // Medical Reports
  async createMedicalReport(insertReport: InsertMedicalReport): Promise<MedicalReport> {
    const id = randomUUID();
    const report: MedicalReport = {
      ...insertReport,
      id,
      userId: insertReport.userId || null,
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

  async getUserMedicalReports(userId: string): Promise<MedicalReport[]> {
    return Array.from(this.medicalReports.values())
      .filter(report => report.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Medicine Searches
  async createMedicineSearch(insertSearch: InsertMedicineSearch): Promise<MedicineSearch> {
    const id = randomUUID();
    const search: MedicineSearch = {
      ...insertSearch,
      id,
      userId: insertSearch.userId || null,
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

  async getUserMedicineSearches(userId: string): Promise<MedicineSearch[]> {
    return Array.from(this.medicineSearches.values())
      .filter(search => search.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Anonymous usage tracking
  async getAnonymousUsageCount(sessionId: string): Promise<number> {
    return this.anonymousUsage.get(sessionId) || 0;
  }

  async incrementAnonymousUsage(sessionId: string): Promise<void> {
    const current = this.anonymousUsage.get(sessionId) || 0;
    this.anonymousUsage.set(sessionId, current + 1);
  }
}

export const storage = new DatabaseStorage();
