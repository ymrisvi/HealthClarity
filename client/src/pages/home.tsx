import { useState } from "react";
import FileUpload from "@/components/file-upload";
import { FileUploadWithPerson } from "@/components/file-upload-with-person";
import { PersonManagement } from "@/components/person-management";
import MedicineSearch from "@/components/medicine-search";
import ResultsDisplay from "@/components/results-display";
import MedicalDisclaimer from "@/components/medical-disclaimer";
import AuthBanner from "@/components/auth-banner";
import UserHeader from "@/components/user-header";
import HistoryView from "@/components/history-view";
import SocialLoginBanner from "@/components/social-login-banner";
import SEOHead from "@/components/seo-head";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [selectedPersonId, setSelectedPersonId] = useState<string>("");
  const [activeTab, setActiveTab] = useState("family");
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
        <SEOHead 
          title="Health Clarity - AI Medical Report Analysis Dashboard"
          description="Access your personalized Health Clarity dashboard for AI-powered medical report analysis, medicine information, and family health tracking. Sign in to manage your health data."
          keywords="medical dashboard, health tracking, AI medical analysis, personal health records"
          canonical="https://healthclarity.replit.app/"
        />
        
        <SocialLoginBanner 
          title="Try Health Clarity"
          description="Get one free analysis or sign in for unlimited access to Health Clarity's medical report analysis and medicine information"
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
      <SEOHead 
        title="Health Clarity Dashboard - Your Medical AI Assistant"
        description="Manage your family's health with AI-powered medical report analysis, medicine information, and personalized health tracking. Upload documents and get instant explanations."
        keywords="health dashboard, medical AI, family health tracking, personal health management, medical analysis tools"
        canonical="https://healthclarity.replit.app/"
      />
      
      {/* Enhanced Header - Mobile Responsive */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-2 sm:p-3 rounded-xl shadow-lg">
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold gradient-text">Health Clarity</h1>
                <p className="text-xs sm:text-sm text-slate-600 hidden sm:block">AI-powered medical analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
              <nav className="hidden lg:flex space-x-6 xl:space-x-8">
                <a href="#upload" className="text-slate-700 hover:text-medical-blue font-medium transition-colors relative group text-sm">
                  Upload Report
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-medical-blue transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#medicine" className="text-slate-700 hover:text-medical-blue font-medium transition-colors relative group text-sm">
                  Medicine Lookup
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-healthcare-teal transition-all duration-300 group-hover:w-full"></span>
                </a>
              </nav>
              <div className="flex items-center space-x-2 sm:space-x-4">
                {user?.isAdmin && (
                  <Button 
                    onClick={() => navigate('/admin')}
                    variant="outline"
                    size="sm"
                    className="border-slate-300 hover:border-medical-blue text-xs sm:text-sm px-2 sm:px-3 hidden sm:flex"
                  >
                    <span className="hidden md:inline">Admin Panel</span>
                    <span className="md:hidden">Admin</span>
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

      {/* Main Content - Mobile Responsive */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* Authentication Banner */}
        {usageLimitReached ? (
          <AuthBanner showLoginPrompt={true} />
        ) : !isAuthenticated ? (
          <AuthBanner remainingUses={1} />
        ) : null}
        
        {/* Enhanced Hero Section - Mobile Responsive */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-teal-600 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl floating">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white drop-shadow-lg pulse-slow" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold gradient-text mb-3 sm:mb-4 px-4">Understanding Your Health Information</h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
            Upload your medical reports or search for medicine information to get clear, simple explanations powered by advanced AI technology.
          </p>
          <div className="heartbeat-line w-32 sm:w-40 lg:w-48 h-1 mx-auto mt-4 sm:mt-6"></div>
        </div>

        {/* Main Content Tabs - Mobile Responsive */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8 sm:mb-10 lg:mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 bg-white/70 backdrop-blur-sm h-12 sm:h-14">
            <TabsTrigger value="family" className="text-xs sm:text-sm lg:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-teal-600 data-[state=active]:text-white px-2">
              <span className="hidden sm:inline">Family Members</span>
              <span className="sm:hidden">Family</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-xs sm:text-sm lg:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-teal-600 data-[state=active]:text-white px-2">
              <span className="hidden sm:inline">Medical Reports</span>
              <span className="sm:hidden">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="medicine" className="text-xs sm:text-sm lg:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-teal-600 data-[state=active]:text-white px-2">
              <span className="hidden sm:inline">Medicine Lookup</span>
              <span className="sm:hidden">Medicine</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="family" className="space-y-4 sm:space-y-6">
            <Card className="medical-card p-6 sm:p-8 lg:p-10 glass-effect hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                <div className="bg-gradient-to-br from-purple-100 to-pink-200 p-3 sm:p-4 rounded-2xl mb-4 sm:mb-0 sm:mr-4 lg:mr-6 shadow-lg">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-purple-700 medical-icon" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Family Member Management</h3>
                  <p className="text-slate-600 text-sm sm:text-base lg:text-lg">Add family members to track their medical reports with personal context</p>
                </div>
              </div>

              <PersonManagement 
                selectedPersonId={selectedPersonId}
                onPersonSelect={(personId) => {
                  setSelectedPersonId(personId);
                  if (personId) {
                    setActiveTab("reports");
                  }
                }}
              />
              
              <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
                <span className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm font-medium">Individual Profiles</span>
                <span className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm font-medium">Separate Histories</span>
                <span className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm font-medium">Context Matching</span>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4 sm:space-y-6">
            <Card id="upload" className="medical-card p-6 sm:p-8 lg:p-10 glass-effect hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 sm:p-4 rounded-2xl mb-4 sm:mb-0 sm:mr-4 lg:mr-6 shadow-lg">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-blue-700 medical-icon" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Upload Medical Report</h3>
                  <p className="text-slate-600 text-sm sm:text-base lg:text-lg">Get AI-powered explanations of your lab results with person-specific context</p>
                </div>
              </div>

              <FileUploadWithPerson 
                onAnalysisComplete={handleReportAnalysis}
                selectedPersonId={selectedPersonId}
                onPersonSelect={setSelectedPersonId}
              />
              
              <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
                <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">ECG Reports</span>
                <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">Blood Tests</span>
                <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">X-Rays</span>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="medicine" className="space-y-4 sm:space-y-6">
            <Card id="medicine" className="medical-card p-6 sm:p-8 lg:p-10 glass-effect hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-3 sm:p-4 rounded-2xl mb-4 sm:mb-0 sm:mr-4 lg:mr-6 shadow-lg">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 text-teal-700 medical-icon" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Medicine Information</h3>
                  <p className="text-slate-600 text-sm sm:text-base lg:text-lg">Learn about medicines in simple terms</p>
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
          </TabsContent>


        </Tabs>

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

      {/* Footer - Mobile Responsive */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 md:col-span-2">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
                </div>
                <span className="text-lg sm:text-xl font-bold">Health Clarity</span>
              </div>
              <p className="text-slate-300 mb-4 text-sm sm:text-base">
                Making medical information accessible and understandable for everyone. Empowering patients with knowledge while emphasizing the importance of professional medical care.
              </p>
              <div className="text-xs sm:text-sm text-slate-400">
                <p className="font-medium mb-1">⚠️ Important Medical Disclaimer</p>
                <p>This tool provides educational information only and should not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers.</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Features</h4>
              <ul className="space-y-1 sm:space-y-2 text-slate-300 text-sm sm:text-base">
                <li><a href="#upload" className="hover:text-white transition-colors">Report Analysis</a></li>
                <li><a href="#medicine" className="hover:text-white transition-colors">Medicine Lookup</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Simple Explanations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Protected</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Legal & Support</h4>
              <ul className="space-y-1 sm:space-y-2 text-slate-300 text-sm sm:text-base">
                <li><button onClick={() => navigate('/contact')} className="hover:text-white transition-colors text-left">Contact Us</button></li>
                <li><button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
                <li><button onClick={() => navigate('/terms')} className="hover:text-white transition-colors text-left">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-slate-400">
            <p className="text-xs sm:text-sm">&copy; 2025 Health Clarity. All rights reserved. This service is for educational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
