
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Zap, Car } from "lucide-react";

interface Vehicle {
  id: string;
  driver: string;
  status: "active" | "idle" | "maintenance";
  battery: number;
  location: { x: number; y: number };
  type: string;
  speed: string;
}

interface VehicleInfoPopupProps {
  vehicle: Vehicle;
}

const VehicleInfoPopup = ({ vehicle }: VehicleInfoPopupProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "idle": return "bg-yellow-500";
      case "maintenance": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 70) return "text-green-600";
    if (battery > 30) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 border border-gray-200 min-w-64 z-30 animate-in fade-in duration-200">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 text-lg">{vehicle.id}</h3>
          <Badge variant="secondary" className={`${getStatusColor(vehicle.status)} text-white border-0`}>
            {vehicle.status}
          </Badge>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span className="text-slate-600">Driver:</span>
            <span className="font-medium text-slate-900">{vehicle.driver}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-orange-500" />
            <span className="text-slate-600">Battery:</span>
            <span className={`font-medium ${getBatteryColor(vehicle.battery)}`}>
              {vehicle.battery}%
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-purple-500" />
            <span className="text-slate-600">Type:</span>
            <span className="font-medium text-slate-900 capitalize">{vehicle.type}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-green-500" />
            <span className="text-slate-600">Speed:</span>
            <span className={`font-medium ${vehicle.speed === "0 mph" ? "text-slate-500" : "text-green-600"}`}>
              {vehicle.speed}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            Track Route
          </Button>
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoPopup;
