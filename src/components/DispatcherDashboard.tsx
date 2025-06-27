
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Car, MapPin, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import VehicleMap from "./VehicleMap";
import ScheduledRides from "./ScheduledRides";
import PendingRides from "./PendingRides";
import NotificationsPanel from "./NotificationsPanel";

const DispatcherDashboard = () => {
  const dispatcherStats = [
    { label: "Active Vehicles", value: "28/35", subtext: "80% utilization", icon: Car, color: "text-blue-600" },
    { label: "Pending Requests", value: "7", subtext: "Avg wait: 3.2 min", icon: Clock, color: "text-orange-600" },
    { label: "Routes Optimized", value: "45", subtext: "Saved 2.5 hrs", icon: MapPin, color: "text-green-600" },
    { label: "Active Alerts", value: "3", subtext: "2 maintenance", icon: AlertTriangle, color: "text-red-600" }
  ];

  const recentActivity = [
    { time: "2 min ago", event: "Vehicle #247 completed pickup", type: "success" },
    { time: "5 min ago", event: "New ride request from Downtown", type: "info" },
    { time: "12 min ago", event: "Driver John D. started shift", type: "info" },
    { time: "18 min ago", event: "Vehicle #156 maintenance reminder", type: "warning" }
  ];

  return (
    <div className="space-y-6">
      {/* Dispatcher Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dispatcherStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.subtext}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Vehicle Map */}
        <div className="lg:col-span-3">
          <Card className="h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Live Vehicle Tracking
                <Badge variant="secondary" className="ml-auto">7 Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-80px)]">
              <VehicleMap />
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <div className="lg:col-span-1">
          <NotificationsPanel />
        </div>
      </div>

      {/* Rides Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScheduledRides />
        <PendingRides />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
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
  );
};

export default DispatcherDashboard;
