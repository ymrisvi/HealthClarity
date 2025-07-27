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
        <LogIn className="h-4 w-4 flex-shrink-0" />
        <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="font-medium text-slate-900 text-sm sm:text-base">{title}</div>
            <div className="text-xs sm:text-sm text-slate-600 break-words">{description}</div>
          </div>
          <Button 
            onClick={handleLogin}
            size="sm"
            className="bg-medical-blue hover:bg-blue-700 text-white flex-shrink-0 w-full sm:w-auto"
          >
            Sign In
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 shadow-lg mb-8">
      <div className="p-4 sm:p-6 lg:p-8 text-center">
        <div className="bg-medical-blue/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <LogIn className="w-6 h-6 sm:w-8 sm:h-8 text-medical-blue" />
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 px-2">{title}</h3>
        <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 px-2">{description}</p>
        
        {/* Social Login Options Display - Mobile Responsive */}
        <div className="mb-6">
          <p className="text-sm text-slate-500 mb-4">Available login methods:</p>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-6 max-w-lg mx-auto">
            <div className="flex items-center space-x-2 bg-white px-2 sm:px-3 py-2 rounded-lg shadow-sm border whitespace-nowrap">
              <FaGoogle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">Google</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-2 sm:px-3 py-2 rounded-lg shadow-sm border whitespace-nowrap">
              <Github className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">GitHub</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-2 sm:px-3 py-2 rounded-lg shadow-sm border whitespace-nowrap">
              <FaXTwitter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">X</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-2 sm:px-3 py-2 rounded-lg shadow-sm border whitespace-nowrap">
              <FaApple className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">Apple</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-2 sm:px-3 py-2 rounded-lg shadow-sm border whitespace-nowrap">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">Email</span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleLogin}
          size="lg"
          className="bg-medical-blue hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
        >
          <span className="hidden sm:inline">Choose Your Login Method</span>
          <span className="sm:hidden">Sign In</span>
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