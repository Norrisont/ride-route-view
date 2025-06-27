
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, Car, TrendingUp, BarChart3, Settings } from "lucide-react";
import VehicleMap from "./VehicleMap";
import ScheduledRides from "./ScheduledRides";
import PendingRides from "./PendingRides";
import NotificationsPanel from "./NotificationsPanel";
import DataAnalyticsDashboard from "./DataAnalyticsDashboard";
import DriverDashboard from "./DriverDashboard";
import DispatcherDashboard from "./DispatcherDashboard";

const AdminDashboard = () => {
  const adminStats = [
    { label: "Monthly Revenue", value: "$45,280", change: "+12.5%", icon: DollarSign, color: "text-green-600" },
    { label: "Total Drivers", value: "42", change: "+3 this month", icon: Users, color: "text-blue-600" },
    { label: "Fleet Size", value: "35", change: "5 electric", icon: Car, color: "text-purple-600" },
    { label: "System Health", value: "99.2%", change: "All systems up", icon: TrendingUp, color: "text-emerald-600" }
  ];

  const fleetOverview = [
    { type: "Sedan", count: 15, active: 12, efficiency: "87%" },
    { type: "SUV", count: 10, active: 8, efficiency: "92%" },
    { type: "Van", count: 8, active: 6, efficiency: "81%" },
    { type: "Electric", count: 2, active: 2, efficiency: "95%" }
  ];

  return (
    <div className="space-y-6">
      {/* Admin Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, index) => (
          <Card key={index}>
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="fleet">Fleet</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
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
          <DataAnalyticsDashboard />
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
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900">{fleet.type}</h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Total</span>
                          <span>{fleet.count}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Active</span>
                          <span className="text-green-600">{fleet.active}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Efficiency</span>
                          <span className="text-blue-600">{fleet.efficiency}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers">
          <DriverDashboard />
        </TabsContent>

        <TabsContent value="operations">
          <DispatcherDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
