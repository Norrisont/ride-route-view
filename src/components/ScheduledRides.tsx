
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, MapPin, Phone } from "lucide-react";

const ScheduledRides = () => {
  const [filter, setFilter] = useState("today");

  const scheduledRides = [
    {
      id: "R001",
      time: "09:00 AM",
      driver: "John Smith",
      patient: "Mary Johnson",
      pickup: "123 Oak St",
      destination: "City Hospital",
      status: "confirmed",
      phone: "+1 234-567-8901"
    },
    {
      id: "R002",
      time: "10:30 AM",
      driver: "Sarah Davis",
      patient: "Robert Brown",
      pickup: "456 Pine Ave",
      destination: "Medical Center",
      status: "in-progress",
      phone: "+1 234-567-8902"
    },
    {
      id: "R003",
      time: "02:15 PM",
      driver: "Mike Wilson",
      patient: "Lisa Garcia",
      pickup: "789 Elm St",
      destination: "Therapy Clinic",
      status: "confirmed",
      phone: "+1 234-567-8903"
    },
    {
      id: "R004",
      time: "04:45 PM",
      driver: "Emily Chen",
      patient: "David Miller",
      pickup: "321 Maple Dr",
      destination: "Pharmacy",
      status: "pending",
      phone: "+1 234-567-8904"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-700";
      case "in-progress": return "bg-blue-100 text-blue-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "completed": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Scheduled Rides
          </CardTitle>
          <div className="flex gap-1">
            {["today", "week", "month"].map((period) => (
              <Button
                key={period}
                size="sm"
                variant={filter === period ? "default" : "outline"}
                onClick={() => setFilter(period)}
                className="h-7 px-3 text-xs"
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {scheduledRides.map((ride) => (
            <div key={ride.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-slate-900">{ride.time}</span>
                  <Badge variant="secondary" className={getStatusColor(ride.status)}>
                    {ride.status}
                  </Badge>
                </div>
                <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                  <Phone className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600 mb-1">Driver</p>
                  <p className="font-medium text-slate-900">{ride.driver}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Patient</p>
                  <p className="font-medium text-slate-900">{ride.patient}</p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduledRides;
