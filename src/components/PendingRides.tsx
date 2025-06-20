
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, AlertTriangle, CheckCircle, X } from "lucide-react";

const PendingRides = () => {
  const pendingRides = [
    {
      id: "P001",
      requestTime: "08:45 AM",
      patient: "James Wilson",
      pickup: "567 Cedar St",
      destination: "Downtown Clinic",
      priority: "high",
      waitTime: "15 min",
      estimatedDuration: "25 min"
    },
    {
      id: "P002",
      requestTime: "09:15 AM",
      patient: "Maria Rodriguez",
      pickup: "890 Birch Ln",
      destination: "Physical Therapy",
      priority: "medium",
      waitTime: "8 min",
      estimatedDuration: "30 min"
    },
    {
      id: "P003",
      requestTime: "09:30 AM",
      patient: "Thomas Anderson",
      pickup: "234 Spruce Ave",
      destination: "Emergency Room",
      priority: "urgent",
      waitTime: "3 min",
      estimatedDuration: "15 min"
    },
    {
      id: "P004",
      requestTime: "09:45 AM",
      patient: "Jennifer Lee",
      pickup: "678 Willow St",
      destination: "Specialist Office",
      priority: "low",
      waitTime: "5 min",
      estimatedDuration: "20 min"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-700 border-red-200";
      case "high": return "bg-orange-100 text-orange-700 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
      case "high":
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          Pending Rides
          <Badge variant="destructive" className="ml-auto">
            {pendingRides.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {pendingRides.map((ride) => (
            <div key={ride.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getPriorityColor(ride.priority)}>
                    {getPriorityIcon(ride.priority)}
                    {ride.priority}
                  </Badge>
                  <span className="text-sm text-slate-600">Wait: {ride.waitTime}</span>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-green-600 hover:bg-green-50">
                    <CheckCircle className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-red-600 hover:bg-red-50">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="font-medium text-slate-900 mb-1">{ride.patient}</p>
                <p className="text-sm text-slate-600">Requested: {ride.requestTime}</p>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-3 w-3 text-green-600" />
                  <span className="text-slate-600">From:</span>
                  <span className="text-slate-900">{ride.pickup}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-3 w-3 text-red-600" />
                  <span className="text-slate-600">To:</span>
                  <span className="text-slate-900">{ride.destination}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Est. Duration: {ride.estimatedDuration}</span>
                <span>ID: {ride.id}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingRides;
