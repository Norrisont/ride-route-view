
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Users, Settings, Navigation } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const portals = [
    {
      title: "Driver Portal",
      description: "Manage rides, track earnings, and handle navigation",
      icon: Car,
      path: "/driver",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      title: "Dispatcher Portal", 
      description: "Monitor fleet, assign rides, and optimize routes",
      icon: Navigation,
      path: "/dispatcher",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      title: "Admin Portal",
      description: "System management, analytics, and fleet oversight",
      icon: Settings,
      path: "/admin",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    }
  ];

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
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Welcome to Citigen
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Select your portal to access role-specific features and manage your transportation operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portals.map((portal) => (
              <Link key={portal.path} to={portal.path}>
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 ${portal.color} ${portal.hoverColor} rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300`}>
                      <portal.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {portal.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {portal.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Stats Overview */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">28</div>
                <div className="text-slate-600">Active Vehicles</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">142</div>
                <div className="text-slate-600">Completed Rides Today</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">7</div>
                <div className="text-slate-600">Pending Requests</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
