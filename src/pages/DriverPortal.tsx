import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Bell, Home } from "lucide-react";
import { Link } from "react-router-dom";
import DriverDashboard from "@/components/DriverDashboard";

const DriverPortal = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">Citigen</h1>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-200">
              Live
            </Badge>
            <Badge variant="secondary">
              Driver Portal
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <DriverDashboard />
      </div>
    </main>
  );
};

export default DriverPortal;