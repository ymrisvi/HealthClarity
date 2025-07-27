import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Heart, FileText, Stethoscope, Shield, Zap } from "lucide-react";

interface MedicalHeroSectionProps {
  onLoginClick: () => void;
}

export default function MedicalHeroSection({ onLoginClick }: MedicalHeroSectionProps) {
  return (
    <div className="relative min-h-screen medical-pattern medical-gradient overflow-hidden">
      {/* Floating Medical Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating absolute top-20 left-10 opacity-10">
          <Heart className="w-16 h-16 text-medical-blue" />
        </div>
        <div className="floating absolute top-40 right-20 opacity-10" style={{ animationDelay: '1s' }}>
          <Activity className="w-12 h-12 text-healthcare-teal" />
        </div>
        <div className="floating absolute bottom-32 left-1/4 opacity-10" style={{ animationDelay: '2s' }}>
          <Stethoscope className="w-14 h-14 text-medical-blue" />
        </div>
        <div className="floating absolute top-1/3 right-1/3 opacity-10" style={{ animationDelay: '3s' }}>
          <FileText className="w-10 h-10 text-healthcare-teal" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center mb-16">
          {/* Hero Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-medical-blue to-healthcare-teal p-6 rounded-3xl shadow-2xl">
                <div className="bg-white p-4 rounded-2xl">
                  <FileText className="w-16 h-16 text-medical-blue medical-icon" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Medical Reports</span>
            <br />
            <span className="text-slate-800">Made Simple</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Upload your lab results, X-rays, or medical reports and get instant, 
            <span className="font-semibold text-medical-blue"> AI-powered explanations</span> in language 
            that's easy to understand.
          </p>

          {/* Heartbeat Line */}
          <div className="heartbeat-line w-64 h-1 mx-auto mb-12"></div>

          {/* CTA Button */}
          <Button 
            onClick={onLoginClick}
            size="lg"
            className="bg-gradient-to-r from-medical-blue to-healthcare-teal hover:from-blue-700 hover:to-teal-700 text-white px-12 py-4 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <Activity className="w-6 h-6 mr-3" />
            Start Analyzing Your Reports
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="medical-card p-8 text-center glass-effect">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-medical-blue medical-icon" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Smart Report Analysis</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Our AI understands ECG reports, blood tests, X-rays, and more. 
              Get instant explanations of what your results really mean.
            </p>
          </Card>

          <Card className="medical-card p-8 text-center glass-effect">
            <div className="bg-gradient-to-br from-teal-100 to-teal-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-healthcare-teal medical-icon" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Medicine Information</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Search any medicine and learn what it does, potential side effects, 
              and important information in clear, simple language.
            </p>
          </Card>

          <Card className="medical-card p-8 text-center glass-effect">
            <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-mint-green medical-icon" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Secure & Private</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Your health data is processed securely and privately. We analyze your reports 
              without storing your personal medical files.
            </p>
          </Card>
        </div>

        {/* Statistics Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-16 border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-medical-blue mb-2">10K+</div>
              <div className="text-slate-600 font-medium">Reports Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-healthcare-teal mb-2">99%</div>
              <div className="text-slate-600 font-medium">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-mint-green mb-2">24/7</div>
              <div className="text-slate-600 font-medium">Always Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-medical-blue mb-2">5 Sec</div>
              <div className="text-slate-600 font-medium">Average Analysis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}