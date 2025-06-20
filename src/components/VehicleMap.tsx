
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Zap } from "lucide-react";

const VehicleMap = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  
  // Mock vehicle data
  const vehicles = [
    { id: "V001", driver: "John D.", status: "active", battery: 87, location: { x: 25, y: 35 }, type: "sedan" },
    { id: "V002", driver: "Sarah M.", status: "active", battery: 92, location: { x: 60, y: 20 }, type: "suv" },
    { id: "V003", driver: "Mike R.", status: "idle", battery: 76, location: { x: 40, y: 55 }, type: "sedan" },
    { id: "V004", driver: "Lisa K.", status: "maintenance", battery: 45, location: { x: 80, y: 70 }, type: "van" },
    { id: "V005", driver: "Tom B.", status: "active", battery: 89, location: { x: 15, y: 75 }, type: "sedan" },
  ];

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
    <div className="h-full relative">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Mock Roads */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400 opacity-60"></div>
          <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400 opacity-60"></div>
          <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-gray-400 opacity-60"></div>
          <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-gray-400 opacity-60"></div>
        </div>

        {/* Vehicle Markers */}
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
              selectedVehicle === vehicle.id ? 'scale-125 z-10' : 'hover:scale-110'
            }`}
            style={{
              left: `${vehicle.location.x}%`,
              top: `${vehicle.location.y}%`,
            }}
            onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? null : vehicle.id)}
          >
            <div className="relative">
              <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${getStatusColor(vehicle.status)} animate-pulse`}></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border border-gray-300"></div>
            </div>
          </div>
        ))}

        {/* Vehicle Info Popup */}
        {selectedVehicle && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 min-w-64 animate-fade-in">
            {(() => {
              const vehicle = vehicles.find(v => v.id === selectedVehicle);
              if (!vehicle) return null;
              
              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">{vehicle.id}</h3>
                    <Badge variant="secondary" className={getStatusColor(vehicle.status) + " text-white"}>
                      {vehicle.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>Driver: {vehicle.driver}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-gray-500" />
                      <span className={getBatteryColor(vehicle.battery)}>
                        Battery: {vehicle.battery}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-gray-500" />
                      <span>Type: {vehicle.type}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Track
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Contact
                    </Button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2">
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur">
          <Navigation className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur">
          <MapPin className="h-4 w-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Idle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleMap;
