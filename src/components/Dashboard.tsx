
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Car, Download } from "lucide-react";
import { toast } from "sonner";
import DriverDashboard from "./DriverDashboard";
import DispatcherDashboard from "./DispatcherDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const [activeRole, setActiveRole] = useState<"driver" | "admin" | "dispatcher">("dispatcher");

  const downloadDashboardScreenshot = async () => {
    try {
      const { default: html2canvas } = await import('html2canvas');
      
      const dashboardElement = document.querySelector('main') || document.body;
      
      const canvas = await html2canvas(dashboardElement, {
        height: window.innerHeight,
        width: window.innerWidth,
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f8fafc',
        ignoreElements: (element) => {
          return element.tagName === 'SCRIPT' || 
                 (element instanceof HTMLElement && element.style.display === 'none') ||
                 element.classList.contains('sr-only');
        }
      });

      const link = document.createElement('a');
      link.download = `citigen-dashboard-${activeRole}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

      toast.success("Dashboard screenshot downloaded successfully!");
    } catch (error) {
      console.error('Screenshot error:', error);
      toast.error("Failed to download screenshot");
    }
  };

  const renderDashboardContent = () => {
    switch (activeRole) {
      case "driver":
        return <DriverDashboard />;
      case "dispatcher":
        return <DispatcherDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <DispatcherDashboard />;
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
            <Badge variant="secondary" className="capitalize">
              {activeRole} Dashboard
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
        {renderDashboardContent()}
      </div>
    </main>
  );
};

export default Dashboard;
