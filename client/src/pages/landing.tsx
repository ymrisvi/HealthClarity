import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SocialLoginBanner from "@/components/social-login-banner";
import MedicalDisclaimer from "@/components/medical-disclaimer";
import MedicalHeroSection from "@/components/medical-hero-section";
import { FileText, Search, Shield, Users, Zap, Clock, Activity, Heart, Stethoscope } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  return (
    <div className="min-h-screen medical-bg-pattern">
      {/* Enhanced Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-medical-blue to-healthcare-teal p-3 rounded-xl mr-4 shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">MedReport Assistant</h1>
                <p className="text-sm text-slate-600">AI-powered medical report analysis</p>
              </div>
            </div>
            <Button 
              onClick={handleLogin}
              className="bg-gradient-to-r from-medical-blue to-healthcare-teal hover:from-blue-700 hover:to-teal-700 text-white shadow-lg"
            >
              <Heart className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Medical Disclaimer */}
      <MedicalDisclaimer />

      {/* Hero Section */}
      <MedicalHeroSection onLoginClick={handleLogin} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Social Login Showcase */}
        <SocialLoginBanner 
          title="Get Started with Social Login"
          description="Connect with your preferred account to access unlimited medical report analysis and personal history tracking"
        />

        {/* Enhanced Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold gradient-text mb-4">Powerful Medical AI Features</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our advanced AI technology makes complex medical information accessible to everyone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="medical-card p-8 text-center glass-effect">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-medical-blue medical-icon" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Advanced Report Analysis</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Upload ECG reports, blood tests, X-rays, and other medical documents. 
                Our AI provides detailed explanations of results, normal ranges, and areas needing attention.
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">ECG</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Blood Tests</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">X-Rays</span>
              </div>
            </Card>

            <Card className="medical-card p-8 text-center glass-effect">
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-healthcare-teal medical-icon" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Comprehensive Medicine Database</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Search thousands of medicines and get detailed information about uses, effects, 
                side effects, and interactions in language that's easy to understand.
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">Uses</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">Side Effects</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">Interactions</span>
              </div>
            </Card>

            <Card className="medical-card p-8 text-center glass-effect">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-mint-green medical-icon" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Enterprise-Grade Security</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Your health data is processed with bank-level security. We analyze your reports 
                without permanently storing sensitive medical information.
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Encrypted</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Private</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">HIPAA Ready</span>
              </div>
            </Card>
          </div>
        </div>



        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Get Started?</h3>
          <p className="text-slate-600 mb-8">Sign in with your social account and start understanding your medical reports today.</p>
          <Button 
            size="lg"
            onClick={() => window.location.href = '/api/login'}
            className="bg-medical-blue hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Sign In with Social Account
          </Button>
        </div>
      </main>
    </div>
  );
}