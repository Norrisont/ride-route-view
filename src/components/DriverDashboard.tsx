
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Clock, DollarSign, Star, Navigation, Phone, CheckCircle, AlertCircle, MapPin } from "lucide-react";
import { toast } from "sonner";
import RideCalendar from "./RideCalendar";

const DriverDashboard = () => {
  const [currentRideStatus, setCurrentRideStatus] = useState<"waiting" | "pickup" | "enroute" | "completed">("pickup");
  const [isOnline, setIsOnline] = useState(true);

  const todaysRides = [
    {
      id: "R001",
      time: "10:30 AM",
      patient: "Mary Johnson",
      pickup: "123 Oak St",
      destination: "City Hospital",
      status: "current",
      estimatedDuration: "25 min",
      phone: "+1234567890"
    },
    {
      id: "R002",
      time: "02:15 PM",
      patient: "Robert Brown",
      pickup: "456 Pine Ave",
      destination: "Medical Center",
      status: "upcoming",
      estimatedDuration: "30 min",
      phone: "+1234567891"
    },
    {
      id: "R003",
      time: "04:45 PM",
      patient: "Lisa Garcia",
      pickup: "789 Elm St",
      destination: "Therapy Clinic",
      status: "upcoming",
      estimatedDuration: "20 min",
      phone: "+1234567892"
    }
  ];

  const driverStats = [
    { label: "Today's Rides", value: "12", icon: Car, color: "text-blue-600" },
    { label: "Hours Online", value: "6.5h", icon: Clock, color: "text-green-600" },
    { label: "Today's Earnings", value: "$247", icon: DollarSign, color: "text-emerald-600" },
    { label: "Rating", value: "4.8★", icon: Star, color: "text-yellow-600" }
  ];

  const handleRideAction = (action: string, rideId: string) => {
    switch (action) {
      case "start_navigation":
        toast.success("Navigation started!");
        break;
      case "call_patient":
        toast.info("Calling patient...");
        break;
      case "arrived_pickup":
        setCurrentRideStatus("enroute");
        toast.success("Marked as arrived at pickup location");
        break;
      case "complete_ride":
        setCurrentRideStatus("completed");
        toast.success("Ride completed successfully!");
        break;
      default:
        break;
    }
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    toast.success(`You are now ${!isOnline ? 'online' : 'offline'}`);
  };

  return (
    <div className="space-y-6">
      {/* Online Status Toggle */}
      <Card className={`border-2 ${isOnline ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="font-semibold">{isOnline ? 'Online' : 'Offline'}</span>
              <span className="text-sm text-slate-600">
                {isOnline ? 'Available for rides' : 'Not accepting rides'}
              </span>
            </div>
            <Button onClick={toggleOnlineStatus} variant={isOnline ? "destructive" : "default"}>
              {isOnline ? 'Go Offline' : 'Go Online'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Driver Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {driverStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current & Upcoming Rides */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-blue-600" />
                Today's Schedule
                <Badge variant={isOnline ? "default" : "secondary"} className="ml-auto">
                  {isOnline ? 'Active' : 'Offline'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysRides.map((ride) => (
                  <div key={ride.id} className={`p-4 rounded-lg border-2 ${
                    ride.status === 'current' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 bg-white'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={ride.status === 'current' ? 'default' : 'secondary'}>
                          {ride.status === 'current' ? 'Current Ride' : 'Upcoming'}
                        </Badge>
                        <span className="font-medium">{ride.time}</span>
                        {ride.status === 'current' && (
                          <Badge variant="outline" className="text-green-600">
                            {currentRideStatus}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <p className="font-semibold text-slate-900">{ride.patient}</p>
                      <div className="text-sm text-slate-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-green-600" />
                          <span>From: {ride.pickup}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-red-600" />
                          <span>To: {ride.destination}</span>
                        </div>
                        <p>Duration: {ride.estimatedDuration}</p>
                      </div>
                    </div>

                    {ride.status === 'current' && (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleRideAction("start_navigation", ride.id)}
                          >
                            <Navigation className="h-4 w-4 mr-2" />
                            Navigate
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRideAction("call_patient", ride.id)}
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                        {currentRideStatus === "pickup" && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleRideAction("arrived_pickup", ride.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Arrived at Pickup
                          </Button>
                        )}
                        {currentRideStatus === "enroute" && (
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleRideAction("complete_ride", ride.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Complete Ride
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <RideCalendar />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Driver Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">98%</p>
              <p className="text-sm text-slate-600">On-Time Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">4.8</p>
              <p className="text-sm text-slate-600">Avg Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">156</p>
              <p className="text-sm text-slate-600">Total Rides</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">$2,847</p>
              <p className="text-sm text-slate-600">This Month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverDashboard;
