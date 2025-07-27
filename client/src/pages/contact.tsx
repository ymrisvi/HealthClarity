import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, ArrowLeft, Heart, Copy, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();

  const emailAddress = "mohideenrisviy@gmail.com";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    toast({
      title: "Email Copied!",
      description: "The email address has been copied to your clipboard.",
    });
  };

  const openEmailClient = () => {
    window.location.href = `mailto:${emailAddress}?subject=MedReport Assistant Inquiry`;
  };

  return (
    <div className="min-h-screen medical-pattern medical-gradient">
      {/* Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-3 rounded-xl shadow-lg">
                <Mail className="w-8 h-8 text-white drop-shadow-sm" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Contact Us</h1>
                <p className="text-sm text-slate-600">We'd love to hear from you</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="border-slate-300 hover:border-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Main Contact Section */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-br from-blue-600 to-teal-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Heart className="w-10 h-10 text-white drop-shadow-sm" />
            </div>
            <h2 className="text-4xl font-bold gradient-text mb-6">Get in Touch</h2>
            <p className="text-slate-600 text-xl leading-relaxed mb-8">
              For any questions, support, feedback, or inquiries about MedReport Assistant, 
              please feel free to reach out directly via email.
            </p>
          </div>

          {/* Email Contact Card */}
          <Card className="p-8 glass-effect border-white/20 text-center mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Mail className="w-8 h-8 text-white drop-shadow-sm" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Email Us Directly</h3>
            
            <div className="bg-slate-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-slate-600 mb-3 font-medium">Contact Email:</p>
              <p className="text-2xl font-bold text-slate-800 mb-4 break-all">{emailAddress}</p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={openEmailClient}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Email Client
                </Button>
                <Button 
                  onClick={copyToClipboard}
                  variant="outline"
                  className="border-slate-300 hover:border-blue-600"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Email
                </Button>
              </div>
            </div>

            <p className="text-slate-600">
              We typically respond to all inquiries within 24-48 hours during business days.
            </p>
          </Card>

          {/* What We Can Help With */}
          <Card className="p-6 glass-effect border-white/20 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 text-center">What can we help you with?</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-slate-600">
              <ul className="space-y-2">
                <li>• Questions about medical report analysis</li>
                <li>• Medicine information inquiries</li>
                <li>• Technical support and troubleshooting</li>
              </ul>
              <ul className="space-y-2">
                <li>• Feature requests and suggestions</li>
                <li>• Account and billing questions</li>
                <li>• General feedback and improvements</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Medical Disclaimer */}
        <Card className="mt-12 p-6 border-amber-200 bg-amber-50">
          <div className="flex items-start space-x-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Mail className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Important Notice</h3>
              <p className="text-amber-700 text-sm">
                For urgent medical questions or emergencies, please contact your healthcare provider directly 
                or call emergency services. This contact form is for general inquiries and support only.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}