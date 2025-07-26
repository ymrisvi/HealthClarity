import { AlertTriangle } from "lucide-react";

export default function MedicalDisclaimer() {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-amber-800">Important Medical Disclaimer</h3>
            <p className="text-sm text-amber-700 mt-1">
              This tool is for educational purposes only and does not provide medical advice. 
              Always consult with qualified healthcare professionals for medical decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
