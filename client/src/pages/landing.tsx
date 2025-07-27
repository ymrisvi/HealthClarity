import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SocialLoginBanner from "@/components/social-login-banner";
import MedicalDisclaimer from "@/components/medical-disclaimer";
import MedicalHeroSection from "@/components/medical-hero-section";
import SEOHead from "@/components/seo-head";
import { FileText, Search, Shield, Users, Zap, Clock, Activity, Heart, Stethoscope, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Landing() {
  const [location, navigate] = useLocation();
  
  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  return (
    <div className="min-h-screen medical-bg-pattern">
      <SEOHead 
        title="Health Clarity - AI Medical Report Analysis & Medicine Information"
        description="Transform complex medical reports into simple explanations with AI. Get instant analysis of lab results, X-rays, ECGs, and comprehensive medicine information for your entire family. Free to start."
        keywords="medical report analysis, AI medical assistant, lab results explained, ECG analysis, X-ray interpretation, blood test results, medicine information, family health tracking, telemedicine, health technology"
        canonical="https://healthclarity.replit.app/"
      />
      
      {/* Enhanced Header - Mobile Responsive */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-2 sm:p-3 rounded-xl mr-2 sm:mr-4 shadow-lg">
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold gradient-text">Health Clarity</h1>
                <p className="text-xs sm:text-sm text-slate-600 hidden sm:block">AI-powered medical report analysis</p>
              </div>
            </div>
            <Button 
              onClick={handleLogin}
              size="sm"
              className="bg-gradient-to-r from-medical-blue to-healthcare-teal hover:from-blue-700 hover:to-teal-700 text-white shadow-lg text-xs sm:text-sm px-3 sm:px-4"
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Sign In</span>
              <span className="xs:hidden">Sign In</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Medical Disclaimer */}
      <MedicalDisclaimer />

      {/* Hero Section */}
      <MedicalHeroSection onLoginClick={handleLogin} />

      {/* Main Content - Mobile Responsive */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Social Login Showcase */}
        <SocialLoginBanner 
          title="Get Started with Social Login"
          description="Connect with your preferred account to access unlimited medical report analysis and personal history tracking"
        />

        {/* Enhanced Features Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4 px-2">Powerful Medical AI Features</h3>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-4">
              Our advanced AI technology makes complex medical information accessible to everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="medical-card p-6 sm:p-8 text-center glass-effect">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-sm" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">Advanced Report Analysis</h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                Upload ECG reports, blood tests, X-rays, and other medical documents. 
                Our AI provides detailed explanations of results, normal ranges, and areas needing attention.
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">ECG</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">Blood Tests</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">X-Rays</span>
              </div>
            </Card>

            <Card className="medical-card p-6 sm:p-8 text-center glass-effect">
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-sm" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">Comprehensive Medicine Database</h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                Search thousands of medicines and get detailed information about uses, effects, 
                side effects, and interactions in language that's easy to understand.
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs sm:text-sm font-medium">Uses</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs sm:text-sm font-medium">Side Effects</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs sm:text-sm font-medium">Interactions</span>
              </div>
            </Card>

            <Card className="medical-card p-6 sm:p-8 text-center glass-effect lg:col-span-1 md:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-br from-green-600 to-green-700 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-sm" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">Enterprise-Grade Security</h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                Your health data is processed with bank-level security. We analyze your reports 
                without permanently storing sensitive medical information.
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium">Encrypted</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium">Private</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium">HIPAA Ready</span>
              </div>
            </Card>
          </div>
        </div>



        {/* Call to Action - Mobile Responsive */}
        <div className="text-center px-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">Ready to Get Started?</h3>
          <p className="text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base">Sign in with your social account and start understanding your medical reports today.</p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            className="bg-medical-blue hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
          >
            Sign In with Social Account
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-2 rounded-lg mr-3">
                  <Activity className="w-6 h-6 text-white drop-shadow-sm" />
                </div>
                <h3 className="text-xl font-bold">Health Clarity</h3>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                AI-powered medical report analysis and medicine information, 
                designed to help you understand your health in simple language.
              </p>
              <div className="bg-gradient-to-r from-red-100 to-orange-100 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-red-800 text-sm font-medium">Medical Disclaimer</p>
                    <p className="text-red-700 text-xs mt-1">
                      For educational purposes only. Always consult healthcare professionals for medical advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={handleLogin}
                    className="text-slate-400 hover:text-white transition-colors flex items-center group"
                  >
                    Report Analysis
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleLogin}
                    className="text-slate-400 hover:text-white transition-colors flex items-center group"
                  >
                    Medicine Search
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </li>

              </ul>
            </div>

            {/* Support & Legal Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support & Legal</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="text-slate-400 hover:text-white transition-colors flex items-center group"
                  >
                    Contact Us
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/privacy')}
                    className="text-slate-400 hover:text-white transition-colors flex items-center group"
                  >
                    Privacy Policy
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/terms')}
                    className="text-slate-400 hover:text-white transition-colors flex items-center group"
                  >
                    Terms of Service
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              © 2025 MedReport Assistant. All rights reserved. | Educational tool - not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}