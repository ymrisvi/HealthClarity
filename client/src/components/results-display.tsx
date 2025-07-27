import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";
import type { MedicalAnalysis, MedicineInfo } from "@shared/schema";

interface ResultsDisplayProps {
  type: 'report' | 'medicine';
  data: any;
  onClose: () => void;
}

export default function ResultsDisplay({ type, data, onClose }: ResultsDisplayProps) {
  if (type === 'report') {
    return <ReportResults data={data} onClose={onClose} />;
  } else {
    return <MedicineResults data={data} onClose={onClose} />;
  }
}

function ReportResults({ data, onClose }: { data: { analysis: MedicalAnalysis; person?: { name: string; age?: number; sex?: string } }, onClose: () => void }) {
  const { analysis, person } = data;
  
  // Handle cases where analysis might be undefined or incomplete
  if (!analysis || !analysis.reportType) {
    return (
      <Card className="shadow-lg border border-slate-200 mb-8">
        <div className="p-8">
          <div className="text-center">
            <p className="text-slate-600">Analysis results are being processed...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border border-slate-200 mb-8">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-mint-green/10 p-3 rounded-xl mr-4">
              <CheckCircle className="w-8 h-8 text-mint-green" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                {person ? `${person.name}'s Report Analysis` : 'Your Report Analysis'}
              </h3>
              <p className="text-slate-600">
                {person 
                  ? `Personalized analysis for ${person.name}${person.age ? ` (${person.age} years old)` : ''}${person.sex ? `, ${person.sex}` : ''}`
                  : 'Understanding your medical results in simple terms'
                }
              </p>
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

        <div className="space-y-6">
          <div className="bg-slate-50 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <Badge variant="secondary" className="mr-2">
                {analysis.reportType}
              </Badge>
              <h4 className="text-lg font-semibold text-slate-900">Report Summary</h4>
            </div>
            <p className="text-slate-700">{analysis.summary}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {analysis.normalResults && analysis.normalResults.length > 0 && (
              <div className="bg-green-50 rounded-xl p-6">
                <h5 className="font-medium text-green-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Normal Results:
                </h5>
                <ul className="text-green-700 space-y-2">
                  {analysis.normalResults.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.needsAttention && analysis.needsAttention.length > 0 && (
              <div className="bg-amber-50 rounded-xl p-6">
                <h5 className="font-medium text-amber-800 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Needs Attention:
                </h5>
                <ul className="text-amber-700 space-y-2">
                  {analysis.needsAttention.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
            <h5 className="font-medium text-blue-800 mb-2 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              What This Means for You:
            </h5>
            <p className="text-slate-700">{analysis.explanation}</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
            <h5 className="font-medium text-red-800 mb-2">Important Reminder:</h5>
            <p className="text-red-700">
              This analysis is for educational purposes only. Please discuss these results with your healthcare provider 
              for proper medical interpretation and next steps.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function MedicineResults({ data, onClose }: { data: { medicineInfo: MedicineInfo }, onClose: () => void }) {
  const { medicineInfo } = data;

  return (
    <Card className="shadow-lg border border-slate-200 mb-8">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-healthcare-teal/10 p-3 rounded-xl mr-4">
              <Info className="w-8 h-8 text-healthcare-teal" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Medicine Information</h3>
              <p className="text-slate-600">
                Understanding <span className="font-medium">{medicineInfo.medicineName}</span> in simple terms
              </p>
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

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">What is {medicineInfo.medicineName}?</h4>
              <p className="text-slate-700 mb-4">{medicineInfo.whatItDoes}</p>
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-medium text-slate-800 mb-2">Medicine Type:</h5>
                <Badge className="bg-blue-100 text-blue-800">{medicineInfo.medicineType}</Badge>
              </div>
            </div>

            <div className="bg-mint-green/5 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">What to Expect</h4>
              <ul className="text-slate-700 space-y-2">
                {medicineInfo.expectedEffects.map((effect, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-mint-green mt-0.5 mr-2 flex-shrink-0" />
                    <span>{effect}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-amber-800 mb-4">Possible Side Effects</h4>
              <div className="space-y-3">
                {medicineInfo.sideEffects.common && medicineInfo.sideEffects.common.length > 0 && (
                  <div>
                    <h5 className="font-medium text-amber-700 mb-1">Common:</h5>
                    <ul className="text-amber-700 text-sm space-y-1">
                      {medicineInfo.sideEffects.common.map((effect, index) => (
                        <li key={index}>• {effect}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {medicineInfo.sideEffects.rare && medicineInfo.sideEffects.rare.length > 0 && (
                  <div>
                    <h5 className="font-medium text-amber-700 mb-1">Rare:</h5>
                    <ul className="text-amber-700 text-sm space-y-1">
                      {medicineInfo.sideEffects.rare.map((effect, index) => (
                        <li key={index}>• {effect}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {medicineInfo.sideEffects.serious && medicineInfo.sideEffects.serious.length > 0 && (
                  <div>
                    <h5 className="font-medium text-red-700 mb-1">Serious:</h5>
                    <ul className="text-red-700 text-sm space-y-1">
                      {medicineInfo.sideEffects.serious.map((effect, index) => (
                        <li key={index}>• {effect}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-red-800 mb-4">Who Should Avoid This</h4>
              <ul className="text-red-700 space-y-2">
                {medicineInfo.contraindications.map((contraindication, index) => (
                  <li key={index} className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{contraindication}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {medicineInfo.importantNotes && medicineInfo.importantNotes.length > 0 && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <h5 className="font-medium text-blue-800 mb-2">Important Reminders:</h5>
              <ul className="text-slate-700 space-y-1">
                {medicineInfo.importantNotes.map((note, index) => (
                  <li key={index}>• {note}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
            <h5 className="font-medium text-red-800 mb-2">Disclaimer:</h5>
            <p className="text-red-700">
              This information is for educational purposes only and should not replace professional medical advice. 
              Always consult your healthcare provider before starting, stopping, or changing any medication.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
