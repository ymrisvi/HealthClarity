import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LogIn, Info } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import SocialLoginBanner from "./social-login-banner";

interface AuthBannerProps {
  remainingUses?: number;
  showLoginPrompt?: boolean;
}

export default function AuthBanner({ remainingUses = 1, showLoginPrompt = false }: AuthBannerProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading || isAuthenticated) return null;

  if (showLoginPrompt) {
    return (
      <SocialLoginBanner 
        title="Usage limit reached"
        description="Sign in with your preferred social account to continue using our service"
        showCompact={false}
      />
    );
  }

  return (
    <SocialLoginBanner 
      title="Get unlimited access"
      description={`You have ${remainingUses} free analysis remaining. Sign in to unlock unlimited usage and personal history tracking.`}
      showCompact={true}
    />
  );
}