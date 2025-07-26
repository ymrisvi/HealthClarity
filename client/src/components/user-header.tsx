import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, History, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface UserHeaderProps {
  onShowHistory: () => void;
}

export default function UserHeader({ onShowHistory }: UserHeaderProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-3 animate-pulse">
        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
        <div className="w-20 h-4 bg-slate-200 rounded"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button 
        onClick={() => window.location.href = '/api/login'}
        className="bg-medical-blue hover:bg-blue-700 text-white"
      >
        Sign In
      </Button>
    );
  }

  const initials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.profileImageUrl || undefined} />
            <AvatarFallback className="bg-medical-blue text-white text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block text-sm font-medium">
            {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.email}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onShowHistory} className="flex items-center">
          <History className="w-4 h-4 mr-2" />
          View History
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => window.location.href = '/api/logout'} className="flex items-center text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}