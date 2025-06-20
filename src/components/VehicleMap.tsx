
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Zap, Car } from "lucide-react";

const VehicleMap = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Mock vehicle data with more realistic positioning
  const vehicles = [
    { id: "V001", driver: "John Smith", status: "active", battery: 87, location: { x: 25, y: 35 }, type: "sedan", speed: "45 mph" },
    { id: "V002", driver: "Sarah Davis", status: "active", battery: 92, location: { x: 60, y: 20 }, type: "suv", speed: "38 mph" },
    { id: "V003", driver: "Mike Wilson", status: "idle", battery: 76, location: { x: 40, y: 55 }, type: "sedan", speed: "0 mph" },
    { id: "V004", driver: "Emily Chen", status: "maintenance", battery: 45, location: { x: 80, y: 70 }, type: "van", speed: "0 mph" },
    { id: "V005", driver: "Tom Brown", status: "active", battery: 89, location: { x: 15, y: 75 }, type: "sedan", speed: "52 mph" },
    { id: "V006", driver: "Lisa Garcia", status: "active", battery: 94, location: { x: 70, y: 40 }, type: "suv", speed: "41 mph" },
    { id: "V007", driver: "David Miller", status: "idle", battery: 68, location: { x: 30, y: 80 }, type: "sedan", speed: "0 mph" },
  ];

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "idle": return "bg-yellow-500";
      case "maintenance": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600";
      case "idle": return "text-yellow-600";
      case "maintenance": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 70) return "text-green-600";
    if (battery > 30) return "text-yellow-600";
    return "text-red-600";
  };

  if (!mapLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 rounded-lg">
        <div className="text-center">
          <Car className="h-8 w-8 text-blue-600 mx-auto mb-2 animate-pulse" />
          <p className="text-slate-600">Loading vehicle map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Map Background with Streets */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#94a3b8" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Street Layout */}
        <div className="absolute inset-0">
          {/* Horizontal Streets */}
          <div className="absolute top-1/4 left-0 right-0 h-2 bg-gray-300 opacity-70 rounded"></div>
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 opacity-70 rounded"></div>
          <div className="absolute top-3/4 left-0 right-0 h-2 bg-gray-300 opacity-70 rounded"></div>
          
          {/* Vertical Streets */}
          <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gray-300 opacity-70 rounded"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-300 opacity-70 rounded"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-gray-300 opacity-70 rounded"></div>
        </div>

        {/* Landmarks */}
        <div className="absolute top-10 left-10 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow">
          Hospital
        </div>
        <div className="absolute bottom-20 right-20 bg-green-600 text-white text-xs px-2 py-1 rounded shadow">
          Clinic
        </div>
        <div className="absolute top-20 right-30 bg-purple-600 text-white text-xs px-2 py-1 rounded shadow">
          Pharmacy
        </div>
      </div>

      {/* Vehicle Markers */}
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20 ${
            selectedVehicle === vehicle.id ? 'scale-125' : 'hover:scale-110'
          }`}
          style={{
            left: `${vehicle.location.x}%`,
            top: `${vehicle.location.y}%`,
          }}
          onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? null : vehicle.id)}
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
      ))}

      {/* Vehicle Info Popup */}
      {selectedVehicle && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 border border-gray-200 min-w-64 z-30 animate-in fade-in duration-200">
          {(() => {
            const vehicle = vehicles.find(v => v.id === selectedVehicle);
            if (!vehicle) return null;
            
            return (
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
            );
          })()}
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-20">
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur border-gray-300 shadow-sm">
          <Navigation className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur border-gray-300 shadow-sm">
          <MapPin className="h-4 w-4" />
        </Button>
      </div>

      {/* Status Legend */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur rounded-lg p-3 text-xs shadow-lg border border-gray-200 z-20">
        <h4 className="font-semibold text-slate-700 mb-2">Vehicle Status</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Active ({vehicles.filter(v => v.status === 'active').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Idle ({vehicles.filter(v => v.status === 'idle').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Maintenance ({vehicles.filter(v => v.status === 'maintenance').length})</span>
          </div>
        </div>
      </div>

      {/* Live Update Indicator */}
      <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-sm z-20 flex items-center gap-1">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        Live Tracking
      </div>
    </div>
  );
};

export default VehicleMap;
