
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Car, MapPin, Clock, AlertTriangle, CheckCircle, UserCheck, Route } from "lucide-react";
import { toast } from "sonner";
import VehicleMap from "./VehicleMap";
import ScheduledRides from "./ScheduledRides";
import PendingRides from "./PendingRides";
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
    <div className="space-y-3 md:space-y-4 lg:space-y-6 px-2 sm:px-0">
      {/* Dispatch Controls - Mobile responsive */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-2 sm:p-3 md:p-4">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${autoAssign ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="font-medium text-xs sm:text-sm">Auto-Assignment</span>
              <Badge variant={autoAssign ? "default" : "secondary"} className="text-xs px-1.5 py-0.5">
                {autoAssign ? 'ON' : 'OFF'}
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
              <Button onClick={toggleAutoAssign} variant="outline" size="sm" className="text-xs h-8">
                {autoAssign ? 'Disable Auto' : 'Enable Auto'}
              </Button>
              <Button onClick={handleOptimizeRoutes} variant="outline" size="sm" className="text-xs h-8">
                <Route className="h-3 w-3 mr-1" />
                Optimize Routes
              </Button>
              <Button onClick={handleEmergencyDispatch} variant="destructive" size="sm" className="text-xs h-8">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Emergency Mode
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dispatcher Stats - Mobile optimized grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">
        {dispatcherStats.map((stat, index) => (
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

      {/* Main Dashboard Grid - Mobile stacked */}
      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
        {/* Vehicle Map */}
        <div className="lg:col-span-2">
          <Card className="h-[300px] sm:h-[400px] lg:h-[500px]">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <MapPin className="h-4 w-4 text-green-600" />
                Live Vehicle Tracking
                <Badge variant="secondary" className="ml-auto text-xs px-1.5 py-0.5">7 Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-50px)] sm:h-[calc(100%-60px)]">
              <VehicleMap />
            </CardContent>
          </Card>
        </div>

        {/* Available Drivers */}
        <div className="lg:col-span-1">
          <Card className="h-[300px] sm:h-[400px] lg:h-[500px]">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <UserCheck className="h-4 w-4 text-blue-600" />
                Available Drivers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-3">
              <div className="space-y-2 max-h-60 sm:max-h-80 overflow-y-auto">
                {availableDrivers.map((driver) => (
                  <div key={driver.id} className="p-2 sm:p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <span className="font-medium text-xs sm:text-sm truncate">{driver.name}</span>
                      <Badge variant={driver.status === 'available' ? 'default' : 'secondary'} className="text-xs px-1.5 py-0.5 flex-shrink-0">
                        {driver.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-600 space-y-0.5 sm:space-y-1">
                      <p>Vehicle: {driver.vehicle}</p>
                      <p>Location: {driver.location}</p>
                      <p>Rating: {driver.rating}★</p>
                    </div>
                    {driver.status === 'available' && (
                      <Button 
                        size="sm" 
                        className="w-full mt-1 sm:mt-2 text-xs h-7"
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

      {/* Rides Management - Mobile stacked */}
      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-2 lg:gap-6">
        <ScheduledRides />
        <PendingRides />
      </div>

      {/* Recent Activity - Mobile optimized */}
      <Card>
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              Recent Activity
            </div>
            <Button size="sm" variant="outline" className="self-start sm:ml-auto text-xs h-7">
              <CheckCircle className="h-3 w-3 mr-1" />
              Mark All Read
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="space-y-2 sm:space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex flex-col gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-start sm:items-center justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 sm:mt-0 ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <span className="text-xs sm:text-sm text-slate-700">{activity.event}</span>
                  </div>
                  <span className="text-xs text-slate-500 flex-shrink-0">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DispatcherDashboard;
