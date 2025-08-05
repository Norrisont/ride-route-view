
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Car, MapPin, Clock, AlertTriangle, CheckCircle, UserCheck, Route } from "lucide-react";
import { toast } from "sonner";
import GoogleMap from "./GoogleMap";
import LiveScheduling from "./LiveScheduling";
import NotificationsPanel from "./NotificationsPanel";

const DispatcherDashboard = () => {
  const [autoAssign, setAutoAssign] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const dispatcherStats = [
    { label: "Active Vehicles", value: "28/35", subtext: "80% utilization", icon: Car, color: "text-blue-600" },
    { label: "Pending Requests", value: "7", subtext: "Avg wait: 3.2 min", icon: Clock, color: "text-orange-600" },
    { label: "Routes Optimized", value: "45", subtext: "Saved 2.5 hrs", icon: MapPin, color: "text-green-600" },
    { label: "Active Alerts", value: "3", subtext: "2 maintenance", icon: AlertTriangle, color: "text-red-600" }
  ];

  const availableDrivers = [
    { id: "D001", name: "John Smith", vehicle: "V001", location: "Downtown", status: "available", rating: 4.8 },
    { id: "D002", name: "Sarah Davis", vehicle: "V002", location: "Midtown", status: "available", rating: 4.9 },
    { id: "D003", name: "Mike Wilson", vehicle: "V003", location: "Uptown", status: "busy", rating: 4.7 },
    { id: "D004", name: "Emily Chen", vehicle: "V004", location: "East Side", status: "available", rating: 4.6 }
  ];

  const recentActivity = [
    { time: "2 min ago", event: "Vehicle #247 completed pickup", type: "success" },
    { time: "5 min ago", event: "New ride request from Downtown", type: "info" },
    { time: "12 min ago", event: "Driver John D. started shift", type: "info" },
    { time: "18 min ago", event: "Vehicle #156 maintenance reminder", type: "warning" }
  ];

  const handleAssignRide = (driverId: string, rideId: string) => {
    const driver = availableDrivers.find(d => d.id === driverId);
    if (driver) {
      toast.success(`Ride assigned to ${driver.name}`);
    }
  };

  const handleOptimizeRoutes = () => {
    toast.success("Routes optimized! Estimated time savings: 45 minutes");
  };

  const toggleAutoAssign = () => {
    setAutoAssign(!autoAssign);
    toast.info(`Auto-assignment ${!autoAssign ? 'enabled' : 'disabled'}`);
  };

  const handleEmergencyDispatch = () => {
    toast.warning("Emergency dispatch activated - Prioritizing urgent requests");
  };

  return (
    <div className="space-y-6">
      {/* Dispatch Controls */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${autoAssign ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="font-medium">Auto-Assignment</span>
                <Badge variant={autoAssign ? "default" : "secondary"}>
                  {autoAssign ? 'ON' : 'OFF'}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={toggleAutoAssign} variant="outline" size="sm">
                {autoAssign ? 'Disable Auto' : 'Enable Auto'}
              </Button>
              <Button onClick={handleOptimizeRoutes} variant="outline" size="sm">
                <Route className="h-4 w-4 mr-2" />
                Optimize Routes
              </Button>
              <Button onClick={handleEmergencyDispatch} variant="destructive" size="sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Mode
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
        <div className="lg:col-span-2">
          <Card className="h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Live Vehicle Tracking
                <Badge variant="secondary" className="ml-auto">7 Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-80px)]">
              <GoogleMap />
            </CardContent>
          </Card>
        </div>

        {/* Available Drivers */}
        <div className="lg:col-span-1">
          <Card className="h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-blue-600" />
                Available Drivers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {availableDrivers.map((driver) => (
                  <div key={driver.id} className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{driver.name}</span>
                      <Badge variant={driver.status === 'available' ? 'default' : 'secondary'}>
                        {driver.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p>Vehicle: {driver.vehicle}</p>
                      <p>Location: {driver.location}</p>
                      <p>Rating: {driver.rating}★</p>
                    </div>
                    {driver.status === 'available' && (
                      <Button 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={() => handleAssignRide(driver.id, "next-ride")}
                      >
                        Assign Next Ride
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <div className="lg:col-span-1">
          <NotificationsPanel />
        </div>
      </div>

      {/* Live Scheduling */}
      <LiveScheduling />

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            Recent Activity
            <Button size="sm" variant="outline" className="ml-auto">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
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
  );
};

export default DispatcherDashboard;
