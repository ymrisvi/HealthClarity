import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOHead from "@/components/seo-head";
import { 
  Users, 
  Activity, 
  BarChart3, 
  Calendar, 
  FileText, 
  Search,
  TrendingUp,
  Shield,
  Clock,
  UserCheck
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface AdminStats {
  totalUsers: number;
  activeUsersToday: number;
  totalReports: number;
  totalMedicineSearches: number;
  reportsToday: number;
  searchesToday: number;
  averageUsagePerUser: number;
}

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  usageCount: number;
  totalVisits: number;
  lastVisit: string;
  createdAt: string;
  isAdmin: boolean;
}

interface ActivityData {
  id: string;
  userId: string;
  activityType: string;
  details: any;
  timestamp: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [location, navigate] = useLocation();
  const { toast } = useToast();



  // Check if user is admin
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to home');
      navigate('/');
      return;
    }
    
    if (user && !user.isAdmin) {
      console.log('User is not admin, redirecting');
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges to access this page.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [user, isAuthenticated, navigate, toast]);

  const { data: adminStats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ['/api/admin/stats'],
    enabled: !!user?.isAdmin,
  });

  const { data: users, isLoading: usersLoading } = useQuery<UserData[]>({
    queryKey: ['/api/admin/users'],
    enabled: !!user?.isAdmin,
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery<ActivityData[]>({
    queryKey: ['/api/admin/activities'],
    enabled: !!user?.isAdmin,
  });

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen medical-pattern medical-gradient">
      {/* Admin Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
                <p className="text-sm text-slate-600">Medical Report Assistant Analytics</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="border-slate-300 hover:border-medical-blue"
            >
              Back to App
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card p-6 glass-effect">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-slate-900">
                  {statsLoading ? "..." : adminStats?.totalUsers || 0}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl">
                <Users className="w-6 h-6 text-medical-blue" />
              </div>
            </div>
          </Card>

          <Card className="medical-card p-6 glass-effect">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Active Today</p>
                <p className="text-3xl font-bold text-slate-900">
                  {statsLoading ? "..." : adminStats?.activeUsersToday || 0}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl">
                <UserCheck className="w-6 h-6 text-mint-green" />
              </div>
            </div>
          </Card>

          <Card className="medical-card p-6 glass-effect">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Reports Analyzed</p>
                <p className="text-3xl font-bold text-slate-900">
                  {statsLoading ? "..." : adminStats?.totalReports || 0}
                </p>
              </div>
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-healthcare-teal" />
              </div>
            </div>
          </Card>

          <Card className="medical-card p-6 glass-effect">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Medicine Searches</p>
                <p className="text-3xl font-bold text-slate-900">
                  {statsLoading ? "..." : adminStats?.totalMedicineSearches || 0}
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-xl">
                <Search className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs for detailed views */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-effect">
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="medical-card glass-effect">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">User Management</h3>
                <p className="text-slate-600">View and track user activity and usage patterns</p>
              </div>
              <div className="p-6">
                {usersLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-medical-blue border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading users...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 font-semibold text-slate-900">User</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-900">Usage Count</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-900">Total Visits</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-900">Last Visit</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-900">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.map((user: UserData) => (
                          <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-slate-900">
                                  {user.firstName} {user.lastName}
                                </p>
                                <p className="text-sm text-slate-600">{user.email}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant={user.usageCount > 5 ? "default" : "secondary"}>
                                {user.usageCount} actions
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-slate-900">{user.totalVisits}</td>
                            <td className="py-3 px-4 text-slate-600">
                              {user.lastVisit ? new Date(user.lastVisit).toLocaleDateString() : 'Never'}
                            </td>
                            <td className="py-3 px-4">
                              {user.isAdmin ? (
                                <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
                              ) : (
                                <Badge variant="outline">User</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="medical-card glass-effect">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
                <p className="text-slate-600">Real-time user activity and system usage</p>
              </div>
              <div className="p-6">
                {activitiesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-medical-blue border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading activities...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activities?.map((activity: ActivityData) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
                        <div className="bg-gradient-to-br from-medical-blue to-healthcare-teal p-2 rounded-lg">
                          {activity.activityType === 'report_upload' ? (
                            <FileText className="w-5 h-5 text-white" />
                          ) : activity.activityType === 'medicine_search' ? (
                            <Search className="w-5 h-5 text-white" />
                          ) : (
                            <Activity className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">
                            {activity.user.firstName} {activity.user.lastName}
                          </p>
                          <p className="text-sm text-slate-600">
                            {activity.activityType === 'report_upload' && 'Uploaded a medical report'}
                            {activity.activityType === 'medicine_search' && 'Searched for medicine information'}
                            {activity.activityType === 'login' && 'Logged into the application'}
                          </p>
                        </div>
                        <div className="text-sm text-slate-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card className="medical-card glass-effect">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900">Today's Statistics</h3>
                  <p className="text-slate-600">Real-time usage metrics for today</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-8 h-8 text-medical-blue" />
                      </div>
                      <p className="text-2xl font-bold text-slate-900">
                        {adminStats?.reportsToday || 0}
                      </p>
                      <p className="text-sm text-slate-600">Reports Today</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <Search className="w-8 h-8 text-healthcare-teal" />
                      </div>
                      <p className="text-2xl font-bold text-slate-900">
                        {adminStats?.searchesToday || 0}
                      </p>
                      <p className="text-sm text-slate-600">Searches Today</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-8 h-8 text-mint-green" />
                      </div>
                      <p className="text-2xl font-bold text-slate-900">
                        {adminStats?.averageUsagePerUser?.toFixed(1) || 0}
                      </p>
                      <p className="text-sm text-slate-600">Avg Usage/User</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}