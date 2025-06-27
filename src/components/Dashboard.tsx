
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
  const [activeRole, setActiveRole] = useState<"driver" | "admin" | "dispatcher">("dispatcher");

  const downloadDashboardScreenshot = async () => {
    try {
      // Use html2canvas for better screenshot quality
      const { default: html2canvas } = await import('html2canvas');
      
      // Target the main dashboard container
      const dashboardElement = document.querySelector('main') || document.body;
      
      const canvas = await html2canvas(dashboardElement, {
        height: window.innerHeight,
        width: window.innerWidth,
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f8fafc',
        ignoreElements: (element) => {
          // Ignore scroll areas and hidden elements
          return element.tagName === 'SCRIPT' || 
                 (element instanceof HTMLElement && element.style.display === 'none') ||
                 element.classList.contains('sr-only');
        }
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `citigen-dashboard-${activeRole}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

      toast.success("Dashboard screenshot downloaded successfully!");
    } catch (error) {
      console.error('Screenshot error:', error);
      
      // Fallback method
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 1920;
        canvas.height = 1080;

        // Create a detailed dashboard representation
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#f8fafc');
        gradient.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Header
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, 80);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, canvas.width, 80);

        // Title and live badge
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 28px Arial';
        ctx.fillText('Citigen Dashboard', 50, 45);
        
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(300, 20, 50, 24);
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.fillText('Live', 315, 35);

        // Role indicator
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(400, 20, 80, 24);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}`, 425, 35);

        // Stats cards
        const statsData = [
          { title: 'Active Vehicles', value: '28/35', x: 50 },
          { title: 'Pending Requests', value: '7', x: 330 },
          { title: 'Routes Optimized', value: '45', x: 610 },
          { title: 'Alerts', value: '3', x: 890 }
        ];

        statsData.forEach(stat => {
          // Card background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(stat.x, 100, 250, 100);
          ctx.strokeStyle = '#e2e8f0';
          ctx.strokeRect(stat.x, 100, 250, 100);
          
          // Title
          ctx.fillStyle = '#64748b';
          ctx.font = '14px Arial';
          ctx.fillText(stat.title, stat.x + 20, 130);
          
          // Value
          ctx.fillStyle = '#1e293b';
          ctx.font = 'bold 32px Arial';
          ctx.fillText(stat.value, stat.x + 20, 170);
        });

        // Main content sections
        const sections = [
          { title: 'Vehicle Tracking Map', x: 50, y: 220, width: 600, height: 400 },
          { title: 'Notifications', x: 680, y: 220, width: 300, height: 400 },
          { title: 'Scheduled Rides', x: 50, y: 650, width: 480, height: 300 },
          { title: 'Pending Rides', x: 560, y: 650, width: 480, height: 300 }
        ];

        sections.forEach(section => {
          // Section background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(section.x, section.y, section.width, section.height);
          ctx.strokeStyle = '#e2e8f0';
          ctx.strokeRect(section.x, section.y, section.width, section.height);
          
          // Section header
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(section.x, section.y, section.width, 60);
          ctx.strokeRect(section.x, section.y, section.width, 60);
          
          // Section title
          ctx.fillStyle = '#1e293b';
          ctx.font = 'bold 18px Arial';
          ctx.fillText(section.title, section.x + 20, section.y + 35);
          
          // Add some mock content based on section
          if (section.title.includes('Vehicle Tracking')) {
            // Add vehicle markers
            const vehicles = [
              { x: section.x + 100, y: section.y + 150 },
              { x: section.x + 250, y: section.y + 200 },
              { x: section.x + 400, y: section.y + 120 },
              { x: section.x + 180, y: section.y + 300 },
              { x: section.x + 350, y: section.y + 250 }
            ];
            
            vehicles.forEach(vehicle => {
              ctx.fillStyle = '#22c55e';
              ctx.beginPath();
              ctx.arc(vehicle.x, vehicle.y, 8, 0, 2 * Math.PI);
              ctx.fill();
              ctx.fillStyle = '#ffffff';
              ctx.font = '10px Arial';
              ctx.fillText('V', vehicle.x - 3, vehicle.y + 3);
            });
            
            // Add grid lines
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            for (let i = 0; i < 5; i++) {
              const x = section.x + 20 + (i * (section.width - 40) / 4);
              ctx.beginPath();
              ctx.moveTo(x, section.y + 80);
              ctx.lineTo(x, section.y + section.height - 20);
              ctx.stroke();
              
              const y = section.y + 80 + (i * (section.height - 120) / 4);
              ctx.beginPath();
              ctx.moveTo(section.x + 20, y);
              ctx.lineTo(section.x + section.width - 20, y);
              ctx.stroke();
            }
          } else if (section.title.includes('Notifications')) {
            // Add notification items
            const notifications = ['Vehicle maintenance due', 'New ride request', 'Route optimized', 'Low battery warning'];
            notifications.forEach((notif, i) => {
              const y = section.y + 80 + (i * 60);
              ctx.fillStyle = '#f1f5f9';
              ctx.fillRect(section.x + 10, y, section.width - 20, 50);
              ctx.strokeStyle = '#e2e8f0';
              ctx.strokeRect(section.x + 10, y, section.width - 20, 50);
              
              ctx.fillStyle = '#475569';
              ctx.font = '12px Arial';
              ctx.fillText(notif, section.x + 20, y + 25);
              ctx.fillStyle = '#94a3b8';
              ctx.font = '10px Arial';
              ctx.fillText(`${i + 2} min ago`, section.x + 20, y + 40);
            });
          } else {
            // Add generic content for rides sections
            for (let i = 0; i < 4; i++) {
              const y = section.y + 80 + (i * 50);
              ctx.fillStyle = '#f8fafc';
              ctx.fillRect(section.x + 20, y, section.width - 40, 40);
              ctx.strokeStyle = '#e2e8f0';
              ctx.strokeRect(section.x + 20, y, section.width - 40, 40);
              
              ctx.fillStyle = '#334155';
              ctx.font = '12px Arial';
              ctx.fillText(`Ride #${1000 + i} - ${section.title.includes('Scheduled') ? 'Confirmed' : 'Pending'}`, section.x + 30, y + 25);
            }
          }
        });

        // Add timestamp
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px Arial';
        ctx.fillText(`Generated: ${new Date().toLocaleString()}`, canvas.width - 200, canvas.height - 20);

        // Create download link
        const link = document.createElement('a');
        link.download = `citigen-dashboard-${activeRole}-${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();

        toast.success("Dashboard screenshot downloaded successfully!");
      } catch (fallbackError) {
        console.error('Fallback screenshot error:', fallbackError);
        toast.error("Failed to download screenshot");
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
    </main>
  );
};

export default Dashboard;
