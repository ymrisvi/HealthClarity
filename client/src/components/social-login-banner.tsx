import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogIn, Github, Mail } from "lucide-react";
import { FaGoogle, FaApple, FaXTwitter } from "react-icons/fa6";

interface SocialLoginBannerProps {
  title?: string;
  description?: string;
  showCompact?: boolean;
}

export default function SocialLoginBanner({ 
  title = "Sign in to unlock unlimited access", 
  description = "Continue with your preferred social account",
  showCompact = false 
}: SocialLoginBannerProps) {

  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  if (showCompact) {
    return (
      <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mb-6">
        <LogIn className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <div>
            <div className="font-medium text-slate-900">{title}</div>
            <div className="text-sm text-slate-600">{description}</div>
          </div>
          <Button 
            onClick={handleLogin}
            className="bg-medical-blue hover:bg-blue-700 text-white ml-4"
          >
            Sign In
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 shadow-lg mb-8">
      <div className="p-8 text-center">
        <div className="bg-medical-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-8 h-8 text-medical-blue" />
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 mb-6">{description}</p>
        
        {/* Social Login Options Display */}
        <div className="mb-6">
          <p className="text-sm text-slate-500 mb-4">Available login methods:</p>
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
              <FaGoogle className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-slate-700">Google</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
              <Github className="w-5 h-5 text-slate-700" />
              <span className="text-sm font-medium text-slate-700">GitHub</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
              <FaXTwitter className="w-5 h-5 text-slate-700" />
              <span className="text-sm font-medium text-slate-700">X</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
              <FaApple className="w-5 h-5 text-slate-700" />
              <span className="text-sm font-medium text-slate-700">Apple</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
              <Mail className="w-5 h-5 text-slate-700" />
              <span className="text-sm font-medium text-slate-700">Email</span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleLogin}
          size="lg"
          className="bg-medical-blue hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Choose Your Login Method
        </Button>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>No Setup Required</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Instant Access</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}