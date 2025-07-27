import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Brain, Users, Award, Clock } from "lucide-react";
import { useLocation } from "wouter";

export default function About() {
  const [location, navigate] = useLocation();

  return (
    <div className="min-h-screen medical-pattern medical-gradient">
      {/* Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-medical-blue to-healthcare-teal p-3 rounded-xl shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">About MedReport Assistant</h1>
                <p className="text-sm text-slate-600">Understanding our mission</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="border-slate-300 hover:border-medical-blue"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-br from-medical-blue to-healthcare-teal w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold gradient-text mb-6">Making Medical Information Accessible</h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Our AI-powered platform helps you understand your medical reports and medicine information in simple, 
            everyday language. No medical degree required – just clear, helpful explanations when you need them most.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="medical-card glass-effect p-8">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl mr-4">
                <Heart className="w-8 h-8 text-medical-blue" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Medical Report Analysis</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Upload your lab results, X-rays, or other medical reports and get clear explanations of what 
              everything means. We break down complex medical terminology into language everyone can understand.
            </p>
          </Card>

          <Card className="medical-card glass-effect p-8">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-3 rounded-xl mr-4">
                <Shield className="w-8 h-8 text-healthcare-teal" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Medicine Information</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Search for any medication to learn what it does, how it works, potential side effects, 
              and important safety information – all explained in simple terms.
            </p>
          </Card>
        </div>

        {/* Our Commitment */}
        <Card className="medical-card glass-effect p-8 mb-16">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-mint-green" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Commitment to You</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Privacy First</h4>
              <p className="text-sm text-slate-600">
                Your medical information is private and secure. We use advanced encryption and never share your data.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-medical-blue" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">AI-Powered Accuracy</h4>
              <p className="text-sm text-slate-600">
                Our advanced AI provides reliable information, but always consult healthcare professionals for medical decisions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-3 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-healthcare-teal" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Available 24/7</h4>
              <p className="text-sm text-slate-600">
                Get instant explanations anytime you need them, whether it's day or night.
              </p>
            </div>
          </div>
        </Card>

        {/* Important Disclaimer */}
        <Card className="medical-card glass-effect p-8 border-l-4 border-orange-500">
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-xl">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Important Medical Disclaimer</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                MedReport Assistant is designed for educational purposes only. Our AI-powered explanations are meant to help you 
                better understand medical information, but they should never replace professional medical advice, diagnosis, or treatment.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Always consult with qualified healthcare professionals before making any medical decisions. If you have questions 
                about your health, medications, or medical reports, please speak with your doctor or healthcare provider.
              </p>
              <p className="text-slate-600 leading-relaxed font-medium">
                In case of medical emergencies, contact emergency services immediately.
              </p>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Get Started?</h3>
          <p className="text-slate-600 mb-6">
            Upload your first medical report or search for medicine information to see how we can help.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-medical-blue to-healthcare-teal text-white px-8 py-3 text-lg font-semibold"
          >
            Start Analyzing Reports
          </Button>
        </div>
      </div>
    </div>
  );
}