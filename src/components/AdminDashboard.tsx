
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, Car, TrendingUp, BarChart3, Settings, Shield, Database, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import VehicleMap from "./VehicleMap";
import ScheduledRides from "./ScheduledRides";
import PendingRides from "./PendingRides";
import NotificationsPanel from "./NotificationsPanel";
import DataAnalyticsDashboard from "./DataAnalyticsDashboard";
import DriverDashboard from "./DriverDashboard";
import DispatcherDashboard from "./DispatcherDashboard";

const AdminDashboard = () => {
  const [systemStatus, setSystemStatus] = useState("healthy");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const adminStats = [
    { label: "Monthly Revenue", value: "$45,280", change: "+12.5%", icon: DollarSign, color: "text-green-600" },
    { label: "Total Drivers", value: "42", change: "+3 this month", icon: Users, color: "text-blue-600" },
    { label: "Fleet Size", value: "35", change: "5 electric", icon: Car, color: "text-purple-600" },
    { label: "System Health", value: "99.2%", change: "All systems up", icon: TrendingUp, color: "text-emerald-600" }
  ];

  const fleetOverview = [
    { type: "Sedan", count: 15, active: 12, efficiency: "87%", maintenance: 2 },
    { type: "SUV", count: 10, active: 8, efficiency: "92%", maintenance: 1 },
    { type: "Van", count: 8, active: 6, efficiency: "81%", maintenance: 0 },
    { type: "Electric", count: 2, active: 2, efficiency: "95%", maintenance: 0 }
  ];

  const systemMetrics = [
    { label: "Database Status", value: "Healthy", status: "good" },
    { label: "API Response Time", value: "125ms", status: "good" },
    { label: "Active Connections", value: "1,247", status: "good" },
    { label: "Error Rate", value: "0.02%", status: "good" }
  ];

  const driverPerformance = [
    { name: "John Smith", rides: 45, rating: 4.9, earnings: "$1,250", status: "excellent" },
    { name: "Sarah Davis", rides: 42, rating: 4.8, earnings: "$1,180", status: "excellent" },
    { name: "Mike Wilson", rides: 38, rating: 4.6, earnings: "$980", status: "good" },
    { name: "Emily Chen", rides: 35, rating: 4.5, earnings: "$875", status: "average" }
  ];

  const handleSystemAction = (action: string) => {
    switch (action) {
      case "backup":
        toast.success("System backup initiated successfully!");
        break;
      case "maintenance":
        setMaintenanceMode(!maintenanceMode);
        toast.info(`Maintenance mode ${!maintenanceMode ? 'enabled' : 'disabled'}`);
        break;
      case "refresh":
        toast.success("System metrics refreshed!");
        break;
      case "export":
        toast.success("Analytics data exported successfully!");
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "average": return "text-yellow-600";
      case "poor": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* System Status Banner */}
      <Card className={`border-2 ${maintenanceMode ? 'border-yellow-500 bg-yellow-50' : 'border-green-500 bg-green-50'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className={`h-5 w-5 ${maintenanceMode ? 'text-yellow-600' : 'text-green-600'}`} />
              <span className="font-semibold">
                System Status: {maintenanceMode ? 'Maintenance Mode' : 'Operational'}
              </span>
              <Badge variant={maintenanceMode ? "destructive" : "default"}>
                {systemStatus}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleSystemAction("backup")} variant="outline" size="sm">
                <Database className="h-4 w-4 mr-2" />
                Backup
              </Button>
              <Button onClick={() => handleSystemAction("maintenance")} variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                {maintenanceMode ? 'Exit' : 'Enter'} Maintenance
              </Button>
              <Button onClick={() => handleSystemAction("refresh")} variant="outline" size="sm">
                Refresh Metrics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="fleet">Fleet</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="h-[400px]">
                <CardHeader>
                  <CardTitle>Fleet Overview Map</CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-80px)]">
                  <VehicleMap />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <NotificationsPanel />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScheduledRides />
            <PendingRides />
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
              <Button onClick={() => handleSystemAction("export")} variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
            <DataAnalyticsDashboard />
          </div>
        </TabsContent>

        <TabsContent value="fleet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-blue-600" />
                Fleet Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {fleetOverview.map((fleet, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-3">{fleet.type}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Total</span>
                          <span className="font-medium">{fleet.count}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Active</span>
                          <span className="text-green-600 font-medium">{fleet.active}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Efficiency</span>
                          <span className="text-blue-600 font-medium">{fleet.efficiency}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Maintenance</span>
                          <span className={`font-medium ${fleet.maintenance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {fleet.maintenance}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Driver Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {driverPerformance.map((driver, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{driver.name}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span>{driver.rides} rides</span>
                          <span>{driver.rating}★</span>
                          <span>{driver.earnings}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(driver.status)}>
                      {driver.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations">
          <DispatcherDashboard />
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                System Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">{metric.label}</span>
                      <div className={`w-3 h-3 rounded-full ${
                        metric.status === 'good' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    <p className="text-xl font-bold">{metric.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                System Administration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Database className="h-6 w-6" />
                  <span>Database Management</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span>User Management</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  <span>Alert Configuration</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
