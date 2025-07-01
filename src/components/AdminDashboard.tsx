
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Users, Activity, Settings, Shield, FileText, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const [systemMaintenance, setSystemMaintenance] = useState(false);

  const adminStats = [
    { label: "Total Vehicles", value: "35", subtext: "Fleet size", icon: Car, color: "text-blue-600" },
    { label: "Total Drivers", value: "42", subtext: "Active drivers", icon: Users, color: "text-orange-600" },
    { label: "System Uptime", value: "99.9%", subtext: "Service reliability", icon: Activity, color: "text-green-600" },
    { label: "Active Alerts", value: "2", subtext: "Critical issues", icon: Activity, color: "text-red-600" }
  ];

  const fleetVehicles = [
    { id: "V001", driver: "John Smith", type: "Sedan", location: "Downtown", status: "active" as const, battery: 87 },
    { id: "V002", driver: "Sarah Davis", type: "SUV", location: "Midtown", status: "active" as const, battery: 92 },
    { id: "V003", driver: "Mike Wilson", type: "Sedan", location: "Uptown", status: "maintenance" as const, battery: 34 },
    { id: "V004", driver: "Emily Chen", type: "Van", location: "East Side", status: "active" as const, battery: 76 },
    { id: "V005", driver: "Tom Brown", type: "Sedan", location: "West Side", status: "idle" as const, battery: 99 }
  ];

  const systemHealth = [
    { name: "Database", status: "healthy" as const, uptime: "99.99%", load: "0.2" },
    { name: "API Server", status: "healthy" as const, uptime: "99.98%", load: "0.5" },
    { name: "Routing Service", status: "warning" as const, uptime: "99.95%", load: "0.8" },
    { name: "Monitoring System", status: "healthy" as const, uptime: "100%", load: "0.1" }
  ];

  const driverPerformance = [
    { name: "John Smith", rides: 125, rating: 4.8, revenue: "$2,500", hours: 45, performance: "excellent" as const },
    { name: "Sarah Davis", rides: 110, rating: 4.9, revenue: "$2,200", hours: 40, performance: "excellent" as const },
    { name: "Mike Wilson", rides: 95, rating: 4.6, revenue: "$1,900", hours: 35, performance: "good" as const },
    { name: "Emily Chen", rides: 80, rating: 4.7, revenue: "$1,600", hours: 30, performance: "good" as const },
    { name: "Tom Brown", rides: 70, rating: 4.5, revenue: "$1,400", hours: 25, performance: "average" as const }
  ];

  const handleSystemMaintenance = () => {
    setSystemMaintenance(!systemMaintenance);
  };

  const handleBackupSystem = () => {
    alert("System backup initiated!");
  };

  const handleGenerateReport = () => {
    alert("Generating system report...");
  };

  return (
    <div className="space-y-3 md:space-y-4 lg:space-y-6 px-2 sm:px-0">
      {/* System Controls - Mobile responsive */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardContent className="p-2 sm:p-3 md:p-4">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
              <span className="font-medium text-xs sm:text-sm">System Status</span>
              <Badge variant="default" className="text-xs px-1.5 py-0.5">ALL SYSTEMS OPERATIONAL</Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
              <Button onClick={handleSystemMaintenance} variant="outline" size="sm" className="text-xs h-8">
                <Settings className="h-3 w-3 mr-1" />
                Maintenance
              </Button>
              <Button onClick={handleBackupSystem} variant="outline" size="sm" className="text-xs h-8">
                <Shield className="h-3 w-3 mr-1" />
                Backup
              </Button>
              <Button onClick={handleGenerateReport} variant="outline" size="sm" className="text-xs h-8">
                <FileText className="h-3 w-3 mr-1" />
                Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Stats - Mobile optimized grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">
        {adminStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-2 sm:p-3">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-600 truncate">{stat.label}</p>
                  <p className="text-sm sm:text-lg font-bold truncate">{stat.value}</p>
                  <p className="text-xs text-slate-500 truncate">{stat.subtext}</p>
                </div>
                <stat.icon className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.color} flex-shrink-0 ml-1`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Admin Grid - Mobile stacked */}
      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-3 lg:gap-6">
        {/* Fleet Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <Car className="h-4 w-4 text-blue-600" />
                Fleet Management
                <Badge variant="secondary" className="ml-auto text-xs px-1.5 py-0.5">35 Vehicles</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <span className="text-xs sm:text-sm font-medium text-green-700">Active Vehicles</span>
                    <span className="text-sm sm:text-lg font-bold text-green-600">28</span>
                  </div>
                  <div className="text-xs text-green-600">80% utilization rate</div>
                </div>
                <div className="p-2 sm:p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <span className="text-xs sm:text-sm font-medium text-yellow-700">Maintenance Due</span>
                    <span className="text-sm sm:text-lg font-bold text-yellow-600">5</span>
                  </div>
                  <div className="text-xs text-yellow-600">Schedule required</div>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
                {fleetVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="p-2 sm:p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-medium">{vehicle.id}</span>
                          <Badge variant={vehicle.status === 'active' ? 'default' : vehicle.status === 'maintenance' ? 'destructive' : 'secondary'} className="text-xs px-1.5 py-0.5">
                            {vehicle.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs">Battery: {vehicle.battery}%</span>
                          <Button size="sm" variant="outline" className="text-xs h-6 px-2">
                            Manage
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-slate-600">
                        <p>Driver: {vehicle.driver} | Type: {vehicle.type}</p>
                        <p>Location: {vehicle.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <Activity className="h-4 w-4 text-green-600" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="space-y-2 sm:space-y-4">
                {systemHealth.map((system, index) => (
                  <div key={index} className="p-2 sm:p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <span className="text-xs sm:text-sm font-medium truncate">{system.name}</span>
                      <Badge variant={system.status === 'healthy' ? 'default' : system.status === 'warning' ? 'secondary' : 'destructive'} className="text-xs px-1.5 py-0.5 flex-shrink-0">
                        {system.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-600">
                      <p>Uptime: {system.uptime}</p>
                      <p>Load: {system.load}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Driver Performance & Analytics - Mobile stacked */}
      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Driver Performance */}
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Users className="h-4 w-4 text-purple-600" />
              Driver Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="space-y-2 sm:space-y-3 max-h-60 sm:max-h-80 overflow-y-auto">
              {driverPerformance.map((driver, index) => (
                <div key={index} className="p-2 sm:p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-medium truncate">{driver.name}</span>
                        <Badge variant={driver.performance === 'excellent' ? 'default' : driver.performance === 'good' ? 'secondary' : 'outline'} className="text-xs px-1.5 py-0.5">
                          {driver.performance}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-xs h-6 px-2">
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs h-6 px-2">
                          Contact
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 grid grid-cols-2 gap-1 sm:gap-2">
                      <p>Rides: {driver.rides}</p>
                      <p>Rating: {driver.rating}★</p>
                      <p>Revenue: {driver.revenue}</p>
                      <p>Hours: {driver.hours}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Analytics */}
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <BarChart3 className="h-4 w-4 text-indigo-600" />
              System Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="space-y-2 sm:space-y-4">
              <div className="p-2 sm:p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium text-blue-700">Total Rides Today</span>
                  <span className="text-sm sm:text-lg font-bold text-blue-600">1,247</span>
                </div>
                <div className="text-xs text-blue-600">↑ 15% from yesterday</div>
              </div>
              
              <div className="p-2 sm:p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium text-green-700">Revenue Today</span>
                  <span className="text-sm sm:text-lg font-bold text-green-600">$18,450</span>
                </div>
                <div className="text-xs text-green-600">↑ 8% from yesterday</div>
              </div>
              
              <div className="p-2 sm:p-3 rounded-lg bg-purple-50 border border-purple-200">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium text-purple-700">Avg Response Time</span>
                  <span className="text-sm sm:text-lg font-bold text-purple-600">2.8 min</span>
                </div>
                <div className="text-xs text-purple-600">↓ 12% improvement</div>
              </div>
              
              <div className="p-2 sm:p-3 rounded-lg bg-orange-50 border border-orange-200">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium text-orange-700">Customer Satisfaction</span>
                  <span className="text-sm sm:text-lg font-bold text-orange-600">4.8★</span>
                </div>
                <div className="text-xs text-orange-600">Excellent rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
