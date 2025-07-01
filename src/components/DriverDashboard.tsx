import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Car,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Navigation,
  TrendingUp,
  DollarSign,
  Star,
  Coffee,
  UserCheck
} from "lucide-react";
import { toast } from "sonner";

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [currentRide, setCurrentRide] = useState<{
    pickup: string;
    destination: string;
    passenger: string;
    fare: string;
    status: 'pickup' | 'in-progress' | 'completed';
    pickupTime: string;
    eta: string;
    startTime: string;
    distance: string;
  } | null>(null);

  const driverStats = [
    { label: "Total Earnings", value: "$12,450", subtext: "+12% this month", icon: DollarSign, color: "text-green-600" },
    { label: "Rides Completed", value: "452", subtext: "+8% this month", icon: Users, color: "text-blue-600" },
    { label: "Average Rating", value: "4.8", subtext: "out of 5", icon: Star, color: "text-yellow-600" },
    { label: "Hours Online", value: "247", subtext: "this month", icon: Clock, color: "text-orange-600" }
  ];

  const recentRides = [
    { passenger: "Alice Johnson", route: "Downtown to Airport", time: "9:15 AM", fare: "$22.50", rating: "5.0", status: "completed" },
    { passenger: "Bob Williams", route: "Uptown to Midtown", time: "8:42 AM", fare: "$18.00", rating: "4.7", status: "completed" },
    { passenger: "Charlie Brown", route: "West Side to Mall", time: "7:58 AM", fare: "$15.75", rating: "4.9", status: "completed" },
    { passenger: "Diana Davis", route: "East Side to Station", time: "7:12 AM", fare: "$25.00", rating: "4.6", status: "completed" }
  ];

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    toast.info(`You are now ${!isOnline ? 'online' : 'offline'}`);
  };

  const handleBreak = () => {
    toast.info("Taking a break - new ride requests paused");
  };

  const handleEmergency = () => {
    toast.warning("Emergency mode activated - notifying support");
  };

  const handlePickup = () => {
    setCurrentRide({ ...currentRide!, status: 'in-progress' });
    toast.success("Ride started - navigating to destination");
  };

  const handleNavigation = () => {
    toast.info("Navigating to destination");
  };

  const handleComplete = () => {
    setCurrentRide(null);
    toast.success("Ride completed - payment processed");
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Driver Status & Controls - Mobile friendly */}
      <Card className={`border-2 ${isOnline ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="font-medium text-sm md:text-base">Driver Status</span>
              <Badge variant={isOnline ? "default" : "secondary"} className="text-xs">
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={toggleOnlineStatus} variant="outline" size="sm" className="text-xs md:text-sm">
                {isOnline ? 'Go Offline' : 'Go Online'}
              </Button>
              <Button onClick={handleBreak} variant="outline" size="sm" disabled={!isOnline} className="text-xs md:text-sm">
                <Coffee className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Break
              </Button>
              <Button onClick={handleEmergency} variant="destructive" size="sm" className="text-xs md:text-sm">
                <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Emergency
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Driver Stats - Responsive grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {driverStats.map((stat, index) => (
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

      {/* Current Ride & Performance - Responsive layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Current Ride */}
        <div className="xl:col-span-2">
          <Card className="h-auto">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Navigation className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                {currentRide ? 'Current Ride' : 'No Active Ride'}
                {currentRide && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {currentRide.distance}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              {currentRide ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-sm">Pickup</span>
                      </div>
                      <p className="text-sm text-slate-700">{currentRide.pickup}</p>
                      <p className="text-xs text-slate-500 mt-1">{currentRide.pickupTime}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-sm">Destination</span>
                      </div>
                      <p className="text-sm text-slate-700">{currentRide.destination}</p>
                      <p className="text-xs text-slate-500 mt-1">ETA: {currentRide.eta}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Passenger: {currentRide.passenger}</span>
                      <span className="text-sm text-slate-600">Fare: {currentRide.fare}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      <span>Started {currentRide.startTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    {currentRide.status === 'pickup' && (
                      <Button onClick={handlePickup} className="flex-1 text-sm">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Confirm Pickup
                      </Button>
                    )}
                    {currentRide.status === 'in-progress' && (
                      <>
                        <Button onClick={handleNavigation} variant="outline" className="flex-1 text-sm">
                          <Navigation className="h-4 w-4 mr-2" />
                          Navigation
                        </Button>
                        <Button onClick={handleComplete} className="flex-1 text-sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete Ride
                        </Button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Car className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 mb-4">No active rides</p>
                  <p className="text-sm text-slate-500">
                    {isOnline ? 'Waiting for ride requests...' : 'Go online to receive ride requests'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Performance */}
        <div className="xl:col-span-1">
          <Card className="h-auto">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                Today's Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Earnings</span>
                  </div>
                  <span className="font-bold text-green-600">$247.50</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Rides</span>
                  </div>
                  <span className="font-bold text-blue-600">12</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Rating</span>
                  </div>
                  <span className="font-bold text-purple-600">4.9★</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium">Online</span>
                  </div>
                  <span className="font-bold text-orange-600">7.5h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Rides - Mobile optimized */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
            Recent Rides
            <Button size="sm" variant="outline" className="ml-auto text-xs">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRides.map((ride, index) => (
              <div key={index} className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{ride.passenger}</span>
                      <Badge variant={ride.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                        {ride.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1">
                      <p>{ride.route}</p>
                      <p className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {ride.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="text-sm font-medium text-green-600">{ride.fare}</span>
                    <span className="text-xs text-slate-500">{ride.rating}★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverDashboard;
