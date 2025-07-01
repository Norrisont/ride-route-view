
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Car } from "lucide-react";
import VehicleMarker from "./VehicleMarker";
import VehicleInfoPopup from "./VehicleInfoPopup";
import MapBackground from "./MapBackground";

const VehicleMap = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Mock vehicle data
  const vehicles = [
    { id: "V001", driver: "John Smith", status: "active" as const, battery: 87, location: { x: 25, y: 35 }, type: "sedan", speed: "45 mph" },
    { id: "V002", driver: "Sarah Davis", status: "active" as const, battery: 92, location: { x: 60, y: 20 }, type: "suv", speed: "38 mph" },
    { id: "V003", driver: "Mike Wilson", status: "idle" as const, battery: 76, location: { x: 40, y: 55 }, type: "sedan", speed: "0 mph" },
    { id: "V004", driver: "Emily Chen", status: "maintenance" as const, battery: 45, location: { x: 80, y: 70 }, type: "van", speed: "0 mph" },
    { id: "V005", driver: "Tom Brown", status: "active" as const, battery: 89, location: { x: 15, y: 75 }, type: "sedan", speed: "52 mph" },
    { id: "V006", driver: "Lisa Garcia", status: "active" as const, battery: 94, location: { x: 70, y: 40 }, type: "suv", speed: "41 mph" },
    { id: "V007", driver: "David Miller", status: "idle" as const, battery: 68, location: { x: 30, y: 80 }, type: "sedan", speed: "0 mph" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle);

  return (
    <div className="h-full relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      <MapBackground />

      {/* Vehicle Markers */}
      {vehicles.map((vehicle) => (
        <VehicleMarker
          key={vehicle.id}
          vehicle={vehicle}
          isSelected={selectedVehicle === vehicle.id}
          onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? null : vehicle.id)}
        />
      ))}

      {/* Vehicle Info Popup */}
      {selectedVehicleData && <VehicleInfoPopup vehicle={selectedVehicleData} />}

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
