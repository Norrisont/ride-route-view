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
    <div className="space-y-4 md:space-y-6">
      {/* System Controls - Mobile responsive */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500"></div>
              <span className="font-medium text-sm md:text-base">System Status</span>
              <Badge variant="default" className="text-xs">ALL SYSTEMS OPERATIONAL</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleSystemMaintenance} variant="outline" size="sm" className="text-xs">
                <Settings className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Maintenance
              </Button>
              <Button onClick={handleBackupSystem} variant="outline" size="sm" className="text-xs">
                <Shield className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Backup
              </Button>
              <Button onClick={handleGenerateReport} variant="outline" size="sm" className="text-xs">
                <FileText className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Stats - Responsive grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {adminStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-slate-600">{stat.label}</p>
                  <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.subtext}</p>
                </div>
                <stat.icon className={`h-6 w-6 md:h-8 md:w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Admin Grid - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Fleet Management */}
        <div className="lg:col-span-2">
          <Card className="h-auto">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                Fleet Management
                <Badge variant="secondary" className="ml-auto text-xs">35 Vehicles</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-700">Active Vehicles</span>
                    <span className="text-lg font-bold text-green-600">28</span>
                  </div>
                  <div className="text-xs text-green-600">80% utilization rate</div>
                </div>
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-yellow-700">Maintenance Due</span>
                    <span className="text-lg font-bold text-yellow-600">5</span>
                  </div>
                  <div className="text-xs text-yellow-600">Schedule required</div>
                </div>
              </div>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {fleetVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{vehicle.id}</span>
                          <Badge variant={vehicle.status === 'active' ? 'default' : vehicle.status === 'maintenance' ? 'destructive' : 'secondary'} className="text-xs">
                            {vehicle.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-600">
                          <p>Driver: {vehicle.driver} | Type: {vehicle.type}</p>
                          <p>Location: {vehicle.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <span className="text-xs">Battery: {vehicle.battery}%</span>
                        <Button size="sm" variant="outline" className="text-xs">
                          Manage
                        </Button>
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
          <Card className="h-auto">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((system, index) => (
                  <div key={index} className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{system.name}</span>
                      <Badge variant={system.status === 'healthy' ? 'default' : system.status === 'warning' ? 'secondary' : 'destructive'} className="text-xs">
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

      {/* Driver Performance & Analytics - Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Driver Performance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
              Driver Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {driverPerformance.map((driver, index) => (
                <div key={index} className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{driver.name}</span>
                        <Badge variant={driver.performance === 'excellent' ? 'default' : driver.performance === 'good' ? 'secondary' : 'outline'} className="text-xs">
                          {driver.performance}
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-600 grid grid-cols-2 gap-2">
                        <p>Rides: {driver.rides}</p>
                        <p>Rating: {driver.rating}★</p>
                        <p>Revenue: {driver.revenue}</p>
                        <p>Hours: {driver.hours}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 self-start sm:self-center">
                      <Button size="sm" variant="outline" className="text-xs">
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Analytics */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
              System Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-700">Total Rides Today</span>
                  <span className="text-lg font-bold text-blue-600">1,247</span>
                </div>
                <div className="text-xs text-blue-600">↑ 15% from yesterday</div>
              </div>
              
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-700">Revenue Today</span>
                  <span className="text-lg font-bold text-green-600">$18,450</span>
                </div>
                <div className="text-xs text-green-600">↑ 8% from yesterday</div>
              </div>
              
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-700">Avg Response Time</span>
                  <span className="text-lg font-bold text-purple-600">2.8 min</span>
                </div>
                <div className="text-xs text-purple-600">↓ 12% improvement</div>
              </div>
              
              <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-700">Customer Satisfaction</span>
                  <span className="text-lg font-bold text-orange-600">4.8★</span>
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
