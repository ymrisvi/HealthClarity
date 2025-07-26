import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, FileText, Pill, Calendar, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import ResultsDisplay from "./results-display";

interface HistoryViewProps {
  onClose: () => void;
}

export default function HistoryView({ onClose }: HistoryViewProps) {
  const [selectedItem, setSelectedItem] = useState<{
    type: 'report' | 'medicine';
    data: any;
  } | null>(null);

  const { data: history, isLoading } = useQuery({
    queryKey: ['/api/user/history'],
  });

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
    <Card className="shadow-lg border border-slate-200 mb-8">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-slate-100 p-3 rounded-xl mr-4">
              <Calendar className="w-8 h-8 text-slate-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Your Analysis History</h3>
              <p className="text-slate-600">View and access your previous medical reports and medicine searches</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
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
          <div className="space-y-6">
            {/* Medical Reports */}
            {history?.medicalReports && history.medicalReports.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-medical-blue" />
                  Medical Reports ({history.medicalReports.length})
                </h4>
                <div className="space-y-3">
                  {history.medicalReports.map((report: any) => (
                    <div 
                      key={report.id}
                      className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 cursor-pointer transition-colors"
                      onClick={() => setSelectedItem({ 
                        type: 'report', 
                        data: { analysis: report.analysis } 
                      })}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-medical-blue/10 p-2 rounded-lg">
                            <FileText className="w-5 h-5 text-medical-blue" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{report.fileName}</p>
                            <p className="text-sm text-slate-500">
                              {format(new Date(report.createdAt), 'PPp')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{report.analysis?.reportType || 'Medical Report'}</Badge>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Medicine Searches */}
            {history?.medicineSearches && history.medicineSearches.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <Pill className="w-5 h-5 mr-2 text-healthcare-teal" />
                  Medicine Searches ({history.medicineSearches.length})
                </h4>
                <div className="space-y-3">
                  {history.medicineSearches.map((search: any) => (
                    <div 
                      key={search.id}
                      className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 cursor-pointer transition-colors"
                      onClick={() => setSelectedItem({ 
                        type: 'medicine', 
                        data: { medicineInfo: search.searchResult } 
                      })}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-healthcare-teal/10 p-2 rounded-lg">
                            <Pill className="w-5 h-5 text-healthcare-teal" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{search.medicineName}</p>
                            <p className="text-sm text-slate-500">
                              {format(new Date(search.createdAt), 'PPp')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{search.searchResult?.medicineType || 'Medicine'}</Badge>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(!history?.medicalReports?.length && !history?.medicineSearches?.length) && (
              <div className="text-center py-12">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-slate-400" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">No History Yet</h4>
                <p className="text-slate-500">Start by uploading a medical report or searching for medicine information.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}