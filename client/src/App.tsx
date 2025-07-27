import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Landing from "@/pages/landing";
import NotFound from "@/pages/not-found";
import AdminDashboard from "@/pages/admin";
import Knowledge from "@/pages/knowledge";
import Article from "@/pages/article";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Contact from "@/pages/contact";
import { useAuth } from "@/hooks/useAuth";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="bg-medical-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-medical-blue rounded-full"></div>
          </div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }



  return (
    <Switch>
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/knowledge" component={Knowledge} />
      <Route path="/knowledge/:slug" component={Article} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/" component={isAuthenticated ? Home : Landing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
