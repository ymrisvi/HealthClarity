import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, Database, FileText, Users } from "lucide-react";
import { useLocation } from "wouter";

export default function Privacy() {
  const [location, navigate] = useLocation();

  return (
    <div className="min-h-screen medical-pattern medical-gradient">
      {/* Mobile Responsive Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 p-2 sm:p-3 rounded-xl shadow-lg">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold gradient-text">Privacy Policy</h1>
                <p className="text-xs sm:text-sm text-slate-600 hidden sm:block">How we protect your information</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
              className="border-slate-300 hover:border-medical-blue px-2 sm:px-4"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Introduction - Mobile Responsive */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-green-500 to-teal-600 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl">
            <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4 px-4">Your Privacy Matters</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Last updated: January 27, 2025
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mt-4">
            We are committed to protecting your privacy and ensuring the security of your personal and medical information.
          </p>
        </div>

        {/* Information We Collect - Mobile Responsive */}
        <Card className="medical-card glass-effect p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 sm:p-3 rounded-xl mb-3 sm:mb-0 sm:mr-4">
              <Database className="w-6 h-6 sm:w-8 sm:h-8 text-blue-700" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Information We Collect</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Account Information</h4>
              <p className="text-slate-600">
                When you create an account, we collect your email address, name, and profile information 
                provided through our authentication service (Replit Auth).
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Medical Reports and Data</h4>
              <p className="text-slate-600">
                We process the medical reports you upload and the medicine information you search for 
                to provide our analysis services. This may include lab results, medical images, and other health-related documents.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Usage Information</h4>
              <p className="text-slate-600">
                We collect information about how you use our service, including the number of reports analyzed, 
                searches performed, and feature usage for improving our platform.
              </p>
            </div>
          </div>
        </Card>

        {/* How We Use Your Information */}
        <Card className="medical-card glass-effect p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-3 rounded-xl mr-4">
              <FileText className="w-8 h-8 text-teal-700" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">How We Use Your Information</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-healthcare-teal rounded-full mt-2"></div>
              <p className="text-slate-600">Provide medical report analysis and medicine information services</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-healthcare-teal rounded-full mt-2"></div>
              <p className="text-slate-600">Improve the accuracy and quality of our AI-powered explanations</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-healthcare-teal rounded-full mt-2"></div>
              <p className="text-slate-600">Maintain your account and provide customer support</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-healthcare-teal rounded-full mt-2"></div>
              <p className="text-slate-600">Send important service updates and security notifications</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-healthcare-teal rounded-full mt-2"></div>
              <p className="text-slate-600">Analyze usage patterns to enhance platform performance</p>
            </div>
          </div>
        </Card>

        {/* Data Security */}
        <Card className="medical-card glass-effect p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl mr-4">
              <Lock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Data Security</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600">
              We implement industry-standard security measures to protect your information:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Encryption</h4>
                  <p className="text-sm text-slate-600">All data is encrypted in transit and at rest</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 rounded-lg">
                  <Database className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Secure Storage</h4>
                  <p className="text-sm text-slate-600">Data stored in secure, compliant databases</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-2 rounded-lg">
                  <Lock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Access Control</h4>
                  <p className="text-sm text-slate-600">Strict access controls and authentication</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-2 rounded-lg">
                  <Eye className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Monitoring</h4>
                  <p className="text-sm text-slate-600">Continuous security monitoring and auditing</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Sharing */}
        <Card className="medical-card glass-effect p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-red-100 to-red-200 p-3 rounded-xl mr-4">
              <Users className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Data Sharing</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600 font-medium">
              We do not sell, trade, or rent your personal information to third parties.
            </p>
            
            <p className="text-slate-600">
              We may share limited information only in these specific circumstances:
            </p>
            
            <div className="space-y-3 mt-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-slate-600">With your explicit consent</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-slate-600">When required by law or legal process</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-slate-600">To protect our rights, property, or safety</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-slate-600">With trusted service providers who assist in platform operations (under strict confidentiality agreements)</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Your Rights */}
        <Card className="medical-card glass-effect p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl mr-4">
              <Shield className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Your Rights</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600">You have the right to:</p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-mint-green rounded-full mt-2"></div>
                <p className="text-slate-600">Access your personal information</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-mint-green rounded-full mt-2"></div>
                <p className="text-slate-600">Correct inaccurate information</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-mint-green rounded-full mt-2"></div>
                <p className="text-slate-600">Delete your account and associated data</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-mint-green rounded-full mt-2"></div>
                <p className="text-slate-600">Export your data</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-mint-green rounded-full mt-2"></div>
                <p className="text-slate-600">Withdraw consent for data processing</p>
              </div>
            </div>
            
            <p className="text-slate-600 mt-6">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="medical-card glass-effect p-8 border-l-4 border-medical-blue">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Us</h3>
          <p className="text-slate-600 mb-4">
            If you have questions about this Privacy Policy or how we handle your information, please contact us:
          </p>
          <div className="space-y-2">
            <p className="text-slate-600"><strong>Email:</strong> privacy@medreport-assistant.com</p>
            <p className="text-slate-600"><strong>Response Time:</strong> We respond to privacy inquiries within 48 hours</p>
          </div>
        </Card>

        {/* Updates */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Policy Updates</h3>
          <p className="text-slate-600">
            We may update this Privacy Policy from time to time. We will notify you of any material changes 
            by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </div>
      </div>
    </div>
  );
}