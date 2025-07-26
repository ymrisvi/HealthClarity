import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SocialLoginBanner from "@/components/social-login-banner";
import MedicalDisclaimer from "@/components/medical-disclaimer";
import { FileText, Search, Shield, Users, Zap, Clock } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-medical-blue p-2 rounded-xl mr-3">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">MedReport Assistant</h1>
                <p className="text-sm text-slate-600">Understanding medical reports made simple</p>
              </div>
            </div>
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="bg-medical-blue hover:bg-blue-700 text-white"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Medical Disclaimer */}
      <MedicalDisclaimer />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Understand Your Medical Reports
            <span className="text-medical-blue"> Instantly</span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Upload your lab results, X-rays, or medical reports and get clear, simple explanations. 
            Search for medicine information in everyday language that anyone can understand.
          </p>
        </div>

        {/* Social Login Showcase */}
        <SocialLoginBanner 
          title="Get Started with Social Login"
          description="Connect with your preferred account to access unlimited medical report analysis and personal history tracking"
        />

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 text-center shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="bg-medical-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-medical-blue" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Medical Report Analysis</h3>
            <p className="text-slate-600">
              Upload ECG reports, blood tests, X-rays, and other medical documents. 
              Get simple explanations of what everything means.
            </p>
          </Card>

          <Card className="p-8 text-center shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="bg-healthcare-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-healthcare-teal" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Medicine Information</h3>
            <p className="text-slate-600">
              Search for any medicine and learn what it does, potential side effects, 
              and important information in clear, simple language.
            </p>
          </Card>

          <Card className="p-8 text-center shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="bg-warning-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-warning-orange" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Secure & Private</h3>
            <p className="text-slate-600">
              Your medical information is processed securely and privately. 
              We never store your actual medical files, only the analysis results.
            </p>
          </Card>
        </div>

        {/* Benefits of Signing In */}
        <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 shadow-lg mb-12">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Why Sign In with Social Login?</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Unlimited Access</h4>
                    <p className="text-slate-600 text-sm">Analyze as many medical reports and search medicines as you need</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Personal History</h4>
                    <p className="text-slate-600 text-sm">Access all your previous analyses with timestamps anytime</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Secure Login</h4>
                    <p className="text-slate-600 text-sm">Use your existing Google, GitHub, or other social accounts</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">No Setup Required</h4>
                    <p className="text-slate-600 text-sm">Start using immediately with your preferred social account</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

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