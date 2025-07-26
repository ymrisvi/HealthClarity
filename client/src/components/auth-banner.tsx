import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LogIn, Info } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AuthBannerProps {
  remainingUses?: number;
  showLoginPrompt?: boolean;
}

export default function AuthBanner({ remainingUses = 1, showLoginPrompt = false }: AuthBannerProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading || isAuthenticated) return null;

  if (showLoginPrompt) {
    return (
      <Alert className="bg-amber-50 border-amber-200 mb-6">
        <LogIn className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>
            You've reached the limit for anonymous usage. Sign in to continue analyzing medical reports and searching medicines.
          </span>
          <Button 
            onClick={() => window.location.href = '/api/login'}
            className="bg-medical-blue hover:bg-blue-700 text-white ml-4"
          >
            Sign In
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="bg-blue-50 border-blue-200 mb-6">
      <Info className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          You have {remainingUses} free analysis remaining. Sign in to get unlimited access and save your history.
        </span>
        <Button 
          variant="outline"
          onClick={() => window.location.href = '/api/login'}
          className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white ml-4"
        >
          Sign In
        </Button>
      </AlertDescription>
    </Alert>
  );
}