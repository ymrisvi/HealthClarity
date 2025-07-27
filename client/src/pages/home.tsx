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
import { FileText, Search, Shield, Info, Users, Lock, Activity, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { isUsageLimitError } from "@/lib/authUtils";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeResult, setActiveResult] = useState<{
    type: 'report' | 'medicine';
    data: any;
  } | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [usageLimitReached, setUsageLimitReached] = useState(false);
  const [location, navigate] = useLocation();
  
  const { user, isAuthenticated } = useAuth();

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
    <div className="min-h-screen medical-pattern medical-gradient">
      {/* Enhanced Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-3 rounded-xl shadow-lg">
                <Activity className="w-8 h-8 text-white drop-shadow-sm" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">MedReport Assistant</h1>
                <p className="text-sm text-slate-600">AI-powered medical analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                <a href="#upload" className="text-slate-700 hover:text-medical-blue font-medium transition-colors relative group">
                  Upload Report
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-medical-blue transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#medicine" className="text-slate-700 hover:text-medical-blue font-medium transition-colors relative group">
                  Medicine Lookup
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-healthcare-teal transition-all duration-300 group-hover:w-full"></span>
                </a>

              </nav>
              <div className="flex items-center space-x-4">
                {user?.isAdmin && (
                  <Button 
                    onClick={() => navigate('/admin')}
                    variant="outline"
                    className="border-slate-300 hover:border-medical-blue"
                  >
                    Admin Panel
                  </Button>
                )}
                <UserHeader onShowHistory={() => setShowHistory(true)} />
              </div>
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
        
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-teal-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl floating">
            <Heart className="w-12 h-12 text-white drop-shadow-lg pulse-slow" />
          </div>
          <h2 className="text-5xl font-bold gradient-text mb-4">Understanding Your Health Information</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Upload your medical reports or search for medicine information to get clear, simple explanations powered by advanced AI technology.
          </p>
          <div className="heartbeat-line w-48 h-1 mx-auto mt-6"></div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Upload Medical Reports */}
          <Card id="upload" className="medical-card p-10 glass-effect">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl mr-6 shadow-lg">
                <FileText className="w-10 h-10 text-blue-700 medical-icon" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900">Upload Medical Report</h3>
                <p className="text-slate-600 text-lg">Get AI-powered explanations of your lab results</p>
              </div>
            </div>

            <FileUpload 
              onAnalysisComplete={handleReportAnalysis} 
              onError={handleError}
            />
            
            <div className="mt-6 flex justify-center space-x-3">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">ECG Reports</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Blood Tests</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">X-Rays</span>
            </div>
          </Card>

          {/* Medicine Lookup */}
          <Card id="medicine" className="medical-card p-10 glass-effect">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-4 rounded-2xl mr-6 shadow-lg">
                <Search className="w-10 h-10 text-teal-700 medical-icon" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900">Medicine Information</h3>
                <p className="text-slate-600 text-lg">Learn about medicines in simple terms</p>
              </div>
            </div>

            <MedicineSearch 
              onSearchComplete={handleMedicineResult}
              onError={handleError}
            />
            
            <div className="mt-6 flex justify-center space-x-3">
              <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">Uses & Effects</span>
              <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">Side Effects</span>
              <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">Interactions</span>
            </div>
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
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">1</span>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Upload or Search</h4>
              <p className="text-slate-600">Upload your medical report or enter a medicine name you want to understand better.</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-700">2</span>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">AI Analysis</h4>
              <p className="text-slate-600">Our AI analyzes the medical information and converts complex terms into simple language.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-700">3</span>
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
                <Shield className="w-12 h-12 text-green-600 mx-auto" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">No Medical Advice</h4>
              <p className="text-sm text-slate-600">We provide information, not medical recommendations</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
                <Lock className="w-12 h-12 text-blue-600 mx-auto" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Privacy Protected</h4>
              <p className="text-sm text-slate-600">Your medical data is processed securely and not stored</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
                <Info className="w-12 h-12 text-teal-600 mx-auto" />
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
                <div className="bg-blue-600 p-2 rounded-lg">
                  <FileText className="w-6 h-6 text-white drop-shadow-sm" />
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
              <h4 className="text-lg font-semibold mb-4">Legal & Support</h4>
              <ul className="space-y-2 text-slate-300">

                <li><button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">Terms of Service</button></li>
                <li><a href="mailto:legal@medreport-assistant.com" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 MedReport Assistant. All rights reserved. This service is for educational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
