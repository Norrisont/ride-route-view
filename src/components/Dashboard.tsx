
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar, Map, Users, Car, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import RideCalendar from "./RideCalendar";
import VehicleMap from "./VehicleMap";
import NotificationsPanel from "./NotificationsPanel";
import RoleBasedStats from "./RoleBasedStats";

const Dashboard = () => {
  const [activeRole, setActiveRole] = useState<"driver" | "admin" | "dispatcher">("driver");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">FleetDash</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
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
                    12 Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <VehicleMap />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
          {/* Notifications Panel */}
          <div className="xl:col-span-1">
            <NotificationsPanel />
          </div>

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
