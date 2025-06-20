
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar, Map, Users, Car, TrendingUp, Clock, AlertTriangle, Download } from "lucide-react";
import RideCalendar from "./RideCalendar";
import VehicleMap from "./VehicleMap";
import NotificationsPanel from "./NotificationsPanel";
import RoleBasedStats from "./RoleBasedStats";
import DataAnalyticsDashboard from "./DataAnalyticsDashboard";
import ScheduledRides from "./ScheduledRides";
import PendingRides from "./PendingRides";
import { toast } from "sonner";

const Dashboard = () => {
  const [activeRole, setActiveRole] = useState<"driver" | "admin" | "dispatcher">("driver");

  const downloadDashboardScreenshot = async () => {
    try {
      // Create a basic canvas screenshot
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1920;
      canvas.height = 1080;

      // Fill with gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#f8fafc');
      gradient.addColorStop(1, '#eff6ff');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add header
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, 80);
      
      // Add title
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 32px Arial';
      ctx.fillText('Citigen Dashboard', 50, 50);

      // Add role badge
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(300, 25, 60, 30);
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.fillText('Live', 315, 45);

      // Add mock content sections
      const sections = [
        { title: 'Vehicle Tracking', x: 50, y: 120, width: 800, height: 400 },
        { title: 'Notifications', x: 900, y: 120, width: 300, height: 400 },
        { title: 'Analytics', x: 50, y: 560, width: 600, height: 300 },
        { title: 'Recent Activity', x: 700, y: 560, width: 500, height: 300 }
      ];

      sections.forEach(section => {
        // Section background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(section.x, section.y, section.width, section.height);
        
        // Section border
        ctx.strokeStyle = '#e2e8f0';
        ctx.strokeRect(section.x, section.y, section.width, section.height);
        
        // Section title
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(section.title, section.x + 20, section.y + 35);
      });

      // Create download link
      const link = document.createElement('a');
      link.download = 'citigen-dashboard-business-model.png';
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

      toast("Dashboard screenshot downloaded for your business model!");
    } catch (error) {
      toast("Failed to download screenshot");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">Citigen</h1>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-200">
              Live
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Role Selector */}
            <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="driver">Driver</TabsTrigger>
                <TabsTrigger value="dispatcher">Dispatcher</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadDashboardScreenshot}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Screenshot
            </Button>
            
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Quick Stats */}
        <RoleBasedStats role={activeRole} />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Calendar Section */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Ride Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RideCalendar />
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-green-600" />
                  Vehicle Tracking
                  <Badge variant="secondary" className="ml-auto">
                    {/* Dynamic count */}
                    7 Vehicles
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-80px)]">
                <VehicleMap />
              </CardContent>
            </Card>
          </div>

          {/* Notifications Panel */}
          <div className="lg:col-span-1">
            <NotificationsPanel />
          </div>
        </div>

        {/* Scheduled Rides and Pending Rides */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ScheduledRides />
          <PendingRides />
        </div>

        {/* Data Analytics Dashboard */}
        <div className="mt-6">
          <DataAnalyticsDashboard />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          {/* Recent Activity */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "2 min ago", event: "Vehicle #247 completed pickup", type: "success" },
                    { time: "5 min ago", event: "New ride request from Downtown", type: "info" },
                    { time: "12 min ago", event: "Driver John D. started shift", type: "info" },
                    { time: "18 min ago", event: "Vehicle #156 maintenance reminder", type: "warning" },
                    { time: "25 min ago", event: "Route optimization completed", type: "success" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-500' :
                          activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                        <span className="text-sm text-slate-700">{activity.event}</span>
                      </div>
                      <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="xl:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  Today's Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Completed Rides</span>
                    <span className="font-semibold text-emerald-600">148</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Average Rating</span>
                    <span className="font-semibold text-yellow-600">4.8★</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Fleet Utilization</span>
                    <span className="font-semibold text-blue-600">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Revenue</span>
                    <span className="font-semibold text-green-600">$3,247</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
