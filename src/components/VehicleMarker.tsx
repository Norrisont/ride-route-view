
import { Car, Navigation } from "lucide-react";

interface Vehicle {
  id: string;
  driver: string;
  status: "active" | "idle" | "maintenance";
  battery: number;
  location: { x: number; y: number };
  type: string;
  speed: string;
}

interface VehicleMarkerProps {
  vehicle: Vehicle;
  isSelected: boolean;
  onClick: () => void;
}

const VehicleMarker = ({ vehicle, isSelected, onClick }: VehicleMarkerProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "idle": return "bg-yellow-500";
      case "maintenance": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20 ${
        isSelected ? 'scale-125' : 'hover:scale-110'
      }`}
      style={{
        left: `${vehicle.location.x}%`,
        top: `${vehicle.location.y}%`,
      }}
      onClick={onClick}
    >
      <div className="relative">
        {/* Vehicle Icon */}
        <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${getStatusColor(vehicle.status)} flex items-center justify-center`}>
          <Car className="h-3 w-3 text-white" />
        </div>
        
        {/* Status Indicator */}
        {vehicle.status === "active" && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-white"></div>
        )}
        
        {/* Vehicle ID Label */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-xs px-1 py-0.5 rounded shadow border text-slate-700 font-medium whitespace-nowrap">
          {vehicle.id}
        </div>
      </div>
    </div>
  );
};

export default VehicleMarker;
