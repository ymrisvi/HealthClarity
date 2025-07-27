import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, FileText, Pill, Calendar, ChevronRight, User, Users, Filter } from "lucide-react";
import { format } from "date-fns";
import { type Person, type MedicalReport, type MedicineSearch } from "@shared/schema";
import ResultsDisplay from "./results-display";

interface HistoryViewProps {
  onClose: () => void;
}

interface HistoryData {
  medicalReports: (MedicalReport & { person?: Person })[];
  medicineSearches: (MedicineSearch & { person?: Person })[];
  persons: Person[];
}

export default function HistoryView({ onClose }: HistoryViewProps) {
  const [selectedItem, setSelectedItem] = useState<{
    type: 'report' | 'medicine';
    data: any;
  } | null>(null);
  const [selectedPersonFilter, setSelectedPersonFilter] = useState<string>("all");

  const { data: history, isLoading } = useQuery<HistoryData>({
    queryKey: ['/api/user/history'],
  });

  // Helper function to get person name or "General"
  const getPersonName = (personId?: string | null) => {
    if (!personId) return "General";
    const person = history?.persons?.find(p => p.id === personId);
    return person?.name || "Unknown Person";
  };

  // Filter data by selected person
  const filteredReports = history?.medicalReports?.filter(report => 
    selectedPersonFilter === "all" || 
    (selectedPersonFilter === "general" && !report.personId) ||
    report.personId === selectedPersonFilter
  ) || [];

  const filteredSearches = history?.medicineSearches?.filter(search => 
    selectedPersonFilter === "all" || 
    (selectedPersonFilter === "general" && !search.personId) ||
    search.personId === selectedPersonFilter
  ) || [];

  // Group data by person for organized display
  const groupedData = () => {
    const groups: { [key: string]: { name: string; reports: typeof filteredReports; searches: typeof filteredSearches; person?: Person } } = {};
    
    // Add general category
    groups["general"] = {
      name: "General",
      reports: filteredReports.filter(r => !r.personId),
      searches: filteredSearches.filter(s => !s.personId)
    };
    
    // Add person-specific groups
    history?.persons?.forEach(person => {
      const personReports = filteredReports.filter(r => r.personId === person.id);
      const personSearches = filteredSearches.filter(s => s.personId === person.id);
      
      if (personReports.length > 0 || personSearches.length > 0) {
        groups[person.id] = {
          name: person.name,
          reports: personReports,
          searches: personSearches,
          person
        };
      }
    });
    
    return groups;
  };

  if (selectedItem) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setSelectedItem(null)}
            className="text-slate-600 hover:text-slate-900"
          >
            ← Back to History
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <ResultsDisplay 
          type={selectedItem.type}
          data={selectedItem.data}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    );
  }

  return (
    <Card className="shadow-lg border border-slate-200 mb-8 max-w-6xl mx-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="bg-gradient-to-br from-blue-100 to-teal-100 p-3 rounded-xl mr-4 shadow-sm">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Your Analysis History</h3>
              <p className="text-sm sm:text-base text-slate-600">View and access your previous medical reports and medicine searches</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 self-end sm:self-auto"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-4 animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="w-32 h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="w-48 h-3 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Person Filter Tabs */}
            {history?.persons && history.persons.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Filter className="w-4 h-4 mr-2 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Filter by Family Member:</span>
                </div>
                <Tabs value={selectedPersonFilter} onValueChange={setSelectedPersonFilter} className="w-full">
                  <TabsList className="flex flex-wrap justify-start bg-slate-100 p-1 h-auto w-full gap-1">
                    <TabsTrigger 
                      value="all" 
                      className="text-xs sm:text-sm px-3 py-2 data-[state=active]:bg-white flex-shrink-0 whitespace-nowrap"
                    >
                      <Users className="w-3 h-3 mr-1" />
                      All ({(history?.medicalReports?.length || 0) + (history?.medicineSearches?.length || 0)})
                    </TabsTrigger>
                    <TabsTrigger 
                      value="general" 
                      className="text-xs sm:text-sm px-3 py-2 data-[state=active]:bg-white flex-shrink-0 whitespace-nowrap"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      General ({((history?.medicalReports?.filter(r => !r.personId)?.length || 0) + (history?.medicineSearches?.filter(s => !s.personId)?.length || 0))})
                    </TabsTrigger>
                    {history?.persons?.map((person) => {
                      const personReports = history.medicalReports?.filter(r => r.personId === person.id)?.length || 0;
                      const personSearches = history.medicineSearches?.filter(s => s.personId === person.id)?.length || 0;
                      const totalCount = personReports + personSearches;
                      
                      return totalCount > 0 ? (
                        <TabsTrigger 
                          key={person.id}
                          value={person.id} 
                          className="text-xs sm:text-sm px-3 py-2 data-[state=active]:bg-white flex-shrink-0 whitespace-nowrap"
                        >
                          <User className="w-3 h-3 mr-1" />
                          {person.name} ({totalCount})
                        </TabsTrigger>
                      ) : null;
                    })}
                  </TabsList>
                </Tabs>
              </div>
            )}

            {/* History Content */}
            <div className="space-y-6">
              {/* Medical Reports */}
              {filteredReports.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Medical Reports ({filteredReports.length})
                  </h4>
                  <div className="grid gap-3">
                    {filteredReports.map((report) => (
                      <div 
                        key={report.id}
                        className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 cursor-pointer transition-all hover:shadow-sm border border-transparent hover:border-blue-200"
                        onClick={() => setSelectedItem({ 
                          type: 'report', 
                          data: { analysis: report.analysis } 
                        })}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start space-x-3 min-w-0 flex-1">
                            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              {/* Fixed filename overflow */}
                              <p className="font-medium text-slate-900 truncate pr-2" title={report.fileName}>
                                {report.fileName}
                              </p>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                                <p className="text-sm text-slate-500">
                                  {format(new Date(report.createdAt), 'PPp')}
                                </p>
                                {report.personId && (
                                  <div className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit">
                                    <User className="w-3 h-3 mr-1" />
                                    {getPersonName(report.personId)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <Badge variant="secondary" className="text-xs">
                              {(report.analysis as any)?.reportType || 'Medical Report'}
                            </Badge>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Medicine Searches */}
              {filteredSearches.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                    <Pill className="w-5 h-5 mr-2 text-teal-600" />
                    Medicine Searches ({filteredSearches.length})
                  </h4>
                  <div className="grid gap-3">
                    {filteredSearches.map((search) => (
                      <div 
                        key={search.id}
                        className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 cursor-pointer transition-all hover:shadow-sm border border-transparent hover:border-teal-200"
                        onClick={() => setSelectedItem({ 
                          type: 'medicine', 
                          data: { medicineInfo: search.searchResult } 
                        })}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start space-x-3 min-w-0 flex-1">
                            <div className="bg-teal-100 p-2 rounded-lg flex-shrink-0">
                              <Pill className="w-5 h-5 text-teal-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-slate-900 truncate pr-2" title={search.medicineName}>
                                {search.medicineName}
                              </p>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                                <p className="text-sm text-slate-500">
                                  {format(new Date(search.createdAt), 'PPp')}
                                </p>
                                {search.personId && (
                                  <div className="flex items-center text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full w-fit">
                                    <User className="w-3 h-3 mr-1" />
                                    {getPersonName(search.personId)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <Badge variant="secondary" className="text-xs">
                              {(search.searchResult as any)?.medicineType || 'Medicine'}
                            </Badge>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {(!filteredReports.length && !filteredSearches.length) && (
                <div className="text-center py-12">
                  <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-slate-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    {selectedPersonFilter === "all" ? "No History Yet" : `No Records for ${selectedPersonFilter === "general" ? "General" : history?.persons?.find(p => p.id === selectedPersonFilter)?.name}`}
                  </h4>
                  <p className="text-slate-500">
                    {selectedPersonFilter === "all" 
                      ? "Start by uploading a medical report or searching for medicine information."
                      : "No medical reports or medicine searches found for this selection."
                    }
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  );
}