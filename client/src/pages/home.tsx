import { useState } from "react";
import FileUpload from "@/components/file-upload";
import MedicineSearch from "@/components/medicine-search";
import ResultsDisplay from "@/components/results-display";
import MedicalDisclaimer from "@/components/medical-disclaimer";
import AuthBanner from "@/components/auth-banner";
import UserHeader from "@/components/user-header";
import HistoryView from "@/components/history-view";
import SocialLoginBanner from "@/components/social-login-banner";
import { Card } from "@/components/ui/card";
import { FileText, Search, Shield, Info, Users, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { isUsageLimitError } from "@/lib/authUtils";

export default function Home() {
  const [activeResult, setActiveResult] = useState<{
    type: 'report' | 'medicine';
    data: any;
  } | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [usageLimitReached, setUsageLimitReached] = useState(false);
  
  const { isAuthenticated } = useAuth();

  const handleReportAnalysis = (data: any) => {
    setActiveResult({ type: 'report', data });
    setUsageLimitReached(false);
  };

  const handleMedicineResult = (data: any) => {
    setActiveResult({ type: 'medicine', data });
    setUsageLimitReached(false);
  };

  const handleError = (error: Error) => {
    if (isUsageLimitError(error)) {
      setUsageLimitReached(true);
    }
  };

  if (showHistory) {
    return <HistoryView onClose={() => setShowHistory(false)} />;
  }

  // Show a compact version for authenticated users who might want to try the service
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100">
        <SocialLoginBanner 
          title="Try Our Medical Report Assistant"
          description="Get one free analysis or sign in for unlimited access to medical report analysis and medicine information"
        />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 shadow-lg border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="bg-medical-blue/10 p-3 rounded-xl mr-4">
                  <FileText className="w-8 h-8 text-medical-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Upload Medical Report</h3>
                  <p className="text-slate-600">Get simple explanations of your lab results</p>
                </div>
              </div>
              <FileUpload 
                onAnalysisComplete={handleReportAnalysis} 
                onError={handleError}
              />
            </Card>

            <Card className="p-8 shadow-lg border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="bg-healthcare-teal/10 p-3 rounded-xl mr-4">
                  <Search className="w-8 h-8 text-healthcare-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Medicine Lookup</h3>
                  <p className="text-slate-600">Learn about medicines in simple terms</p>
                </div>
              </div>
              <MedicineSearch 
                onSearchComplete={handleMedicineResult}
                onError={handleError}
              />
            </Card>
          </div>

          {/* Results Section */}
          {activeResult && (
            <ResultsDisplay 
              type={activeResult.type}
              data={activeResult.data}
              onClose={() => setActiveResult(null)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-medical-blue p-2 rounded-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">MedReport Assistant</h1>
                <p className="text-sm text-slate-600">Understanding medical reports made simple</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                <a href="#upload" className="text-slate-700 hover:text-medical-blue font-medium transition-colors">
                  Upload Report
                </a>
                <a href="#medicine" className="text-slate-700 hover:text-medical-blue font-medium transition-colors">
                  Medicine Lookup
                </a>
                <a href="#about" className="text-slate-700 hover:text-medical-blue font-medium transition-colors">
                  About
                </a>
              </nav>
              <UserHeader onShowHistory={() => setShowHistory(true)} />
            </div>
          </div>
        </div>
      </header>

      {/* Medical Disclaimer Banner */}
      <MedicalDisclaimer />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Authentication Banner */}
        {usageLimitReached ? (
          <AuthBanner showLoginPrompt={true} />
        ) : !isAuthenticated ? (
          <AuthBanner remainingUses={1} />
        ) : null}
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Understanding Your Health Information</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Upload your medical reports or search for medicine information to get clear, simple explanations without complex medical jargon.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Upload Medical Reports */}
          <Card id="upload" className="p-8 shadow-lg border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="bg-medical-blue/10 p-3 rounded-xl mr-4">
                <FileText className="w-8 h-8 text-medical-blue" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Upload Medical Report</h3>
                <p className="text-slate-600">Get simple explanations of your lab results</p>
              </div>
            </div>

            <FileUpload 
              onAnalysisComplete={handleReportAnalysis} 
              onError={handleError}
            />
          </Card>

          {/* Medicine Lookup */}
          <Card id="medicine" className="p-8 shadow-lg border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="bg-healthcare-teal/10 p-3 rounded-xl mr-4">
                <Search className="w-8 h-8 text-healthcare-teal" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Medicine Information</h3>
                <p className="text-slate-600">Learn about medicines in simple terms</p>
              </div>
            </div>

            <MedicineSearch 
              onSearchComplete={handleMedicineResult}
              onError={handleError}
            />
          </Card>
        </div>

        {/* Results Section */}
        {activeResult && (
          <ResultsDisplay 
            type={activeResult.type}
            data={activeResult.data}
            onClose={() => setActiveResult(null)}
          />
        )}

        {/* How It Works Section */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-12">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-medical-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-medical-blue">1</span>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Upload or Search</h4>
              <p className="text-slate-600">Upload your medical report or enter a medicine name you want to understand better.</p>
            </div>
            <div className="text-center">
              <div className="bg-healthcare-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-healthcare-teal">2</span>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">AI Analysis</h4>
              <p className="text-slate-600">Our AI analyzes the medical information and converts complex terms into simple language.</p>
            </div>
            <div className="text-center">
              <div className="bg-mint-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-mint-green">3</span>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Clear Explanation</h4>
              <p className="text-slate-600">Get easy-to-understand explanations that help you make informed health decisions.</p>
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Your Safety is Our Priority</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
                <Shield className="w-12 h-12 text-mint-green mx-auto" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">No Medical Advice</h4>
              <p className="text-sm text-slate-600">We provide information, not medical recommendations</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
                <Lock className="w-12 h-12 text-medical-blue mx-auto" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Privacy Protected</h4>
              <p className="text-sm text-slate-600">Your medical data is processed securely and not stored</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
                <Info className="w-12 h-12 text-healthcare-teal mx-auto" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Educational Only</h4>
              <p className="text-sm text-slate-600">Designed to help you understand, not diagnose</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
                <Users className="w-12 h-12 text-amber-500 mx-auto" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Consult Doctors</h4>
              <p className="text-sm text-slate-600">Always discuss with healthcare professionals</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-medical-blue p-2 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">MedReport Assistant</span>
              </div>
              <p className="text-slate-300 mb-4">
                Making medical information accessible and understandable for everyone. Empowering patients with knowledge while emphasizing the importance of professional medical care.
              </p>
              <div className="text-sm text-slate-400">
                <p className="font-medium mb-1">⚠️ Important Medical Disclaimer</p>
                <p>This tool provides educational information only and should not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers.</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#upload" className="hover:text-white transition-colors">Report Analysis</a></li>
                <li><a href="#medicine" className="hover:text-white transition-colors">Medicine Lookup</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Simple Explanations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Protected</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 MedReport Assistant. All rights reserved. This service is for educational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
