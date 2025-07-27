import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/seo-head";
import { FileText, AlertTriangle, Scale, Clock, Shield, Users } from "lucide-react";
import { useLocation } from "wouter";

export default function Terms() {
  const [location, navigate] = useLocation();

  return (
    <div className="min-h-screen medical-pattern medical-gradient">
      <SEOHead 
        title="Terms of Service - Health Clarity AI Medical Platform"
        description="Read the terms of service for Health Clarity AI-powered medical report analysis. Understand your rights and obligations when using our medical AI technology."
        keywords="terms of service, medical AI terms, healthcare platform agreement, AI medical analysis terms"
        canonical="https://healthclarity.replit.app/terms"
      />
      
      {/* Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-3 rounded-xl shadow-lg">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Terms of Service</h1>
                <p className="text-sm text-slate-600">Your agreement with us</p>
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
        {/* Introduction */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold gradient-text mb-4">Terms of Service</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Last updated: January 27, 2025
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mt-4">
            Please read these Terms of Service carefully before using Health Clarity.
          </p>
        </div>

        {/* Acceptance */}
        <Card className="medical-card glass-effect p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl mr-4">
              <FileText className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Acceptance of Terms</h3>
          </div>
          
          <p className="text-slate-600 leading-relaxed">
            By accessing and using Health Clarity, you accept and agree to be bound by the terms and 
            provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </Card>

        {/* Medical Disclaimer */}
        <Card className="medical-card glass-effect p-8 mb-8 border-l-4 border-red-500">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-red-100 to-red-200 p-3 rounded-xl mr-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Important Medical Disclaimer</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600 leading-relaxed font-semibold">
              Health Clarity is for educational and informational purposes only and is not intended to 
              replace professional medical advice, diagnosis, or treatment.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-slate-600">Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-slate-600">Never disregard professional medical advice or delay in seeking it because of something you have read on Health Clarity</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-slate-600">If you think you may have a medical emergency, call your doctor or emergency services immediately</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-slate-600">We do not recommend or endorse any specific medications, treatments, or medical procedures</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Service Description */}
        <Card className="medical-card glass-effect p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl mr-4">
              <Shield className="w-8 h-8 text-blue-700" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Service Description</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600">
              MedReport Assistant provides:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-medical-blue rounded-full mt-2"></div>
                <p className="text-slate-600">AI-powered analysis of medical reports and documents</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-medical-blue rounded-full mt-2"></div>
                <p className="text-slate-600">Educational information about medications and their general effects</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-medical-blue rounded-full mt-2"></div>
                <p className="text-slate-600">Translation of medical terminology into plain language</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-medical-blue rounded-full mt-2"></div>
                <p className="text-slate-600">General health information for educational purposes</p>
              </div>
            </div>
            
            <p className="text-slate-600 mt-6 font-medium">
              Our service is designed to help you better understand medical information, not to provide medical advice or diagnosis.
            </p>
          </div>
        </Card>

        {/* User Responsibilities */}
        <Card className="medical-card glass-effect p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl mr-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">User Responsibilities</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600">By using our service, you agree to:</p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p className="text-slate-600">Use the service for lawful purposes only</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p className="text-slate-600">Provide accurate information when creating your account</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p className="text-slate-600">Keep your account credentials secure and confidential</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p className="text-slate-600">Not upload any content that violates privacy rights or contains malicious software</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p className="text-slate-600">Respect the intellectual property rights of others</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p className="text-slate-600">Not attempt to gain unauthorized access to our systems</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Limitations of Service */}
        <Card className="medical-card glass-effect p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-xl mr-4">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Service Limitations</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600">Please understand that:</p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <p className="text-slate-600">AI analysis may not be 100% accurate and should not be relied upon for medical decisions</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <p className="text-slate-600">Service availability may be interrupted for maintenance or technical issues</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <p className="text-slate-600">We may modify or discontinue features with reasonable notice</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <p className="text-slate-600">Usage limits may apply to ensure fair access for all users</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy and Data */}
        <Card className="medical-card glass-effect p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-3 rounded-xl mr-4">
              <Shield className="w-8 h-8 text-teal-700" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Privacy and Data Handling</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600">
              Your privacy is important to us. By using our service:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-healthcare-teal rounded-full mt-2"></div>
                <p className="text-slate-600">You consent to the collection and processing of your data as described in our Privacy Policy</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-healthcare-teal rounded-full mt-2"></div>
                <p className="text-slate-600">You understand that uploaded medical reports are processed by AI to provide analysis</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-healthcare-teal rounded-full mt-2"></div>
                <p className="text-slate-600">You can delete your account and associated data at any time</p>
              </div>
            </div>
            
            <p className="text-slate-600 mt-4">
              Please review our <button 
                onClick={() => navigate('/privacy')} 
                className="text-medical-blue hover:underline font-medium"
              >
                Privacy Policy
              </button> for detailed information about how we handle your data.
            </p>
          </div>
        </Card>

        {/* Liability Limitation */}
        <Card className="medical-card glass-effect p-8 mb-8 border-l-4 border-orange-500">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-3 rounded-xl mr-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Limitation of Liability</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600 font-semibold">
              MedReport Assistant and its operators shall not be liable for any direct, indirect, incidental, 
              special, or consequential damages resulting from:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                <p className="text-slate-600">Use or inability to use our service</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                <p className="text-slate-600">Any medical decisions made based on information from our platform</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                <p className="text-slate-600">Technical errors, data loss, or service interruptions</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                <p className="text-slate-600">Unauthorized access to your data due to circumstances beyond our control</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Changes to Terms */}
        <Card className="medical-card glass-effect p-8 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Changes to Terms</h3>
          <p className="text-slate-600 leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. Changes will be effective 
            immediately upon posting to this page. Your continued use of the service after changes are posted 
            constitutes acceptance of the modified terms.
          </p>
        </Card>

        {/* Governing Law */}
        <Card className="medical-card glass-effect p-8 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Governing Law</h3>
          <p className="text-slate-600 leading-relaxed">
            These Terms of Service shall be governed by and construed in accordance with applicable laws. 
            Any disputes arising from these terms or use of the service shall be resolved through appropriate legal channels.
          </p>
        </Card>

        {/* Contact Information */}
        <Card className="medical-card glass-effect p-8 border-l-4 border-medical-blue">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Us</h3>
          <p className="text-slate-600 mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2">
            <p className="text-slate-600"><strong>Email:</strong> mohideenrisviy@gmail.com</p>
            <p className="text-slate-600"><strong>Response Time:</strong> We respond to legal inquiries within 72 hours</p>
          </div>
        </Card>

        {/* Acknowledgment */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Acknowledgment</h3>
          <p className="text-slate-600 leading-relaxed">
            By using Health Clarity, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}