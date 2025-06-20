
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Car, MapPin, DollarSign, Clock, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface RoleBasedStatsProps {
  role: "driver" | "admin" | "dispatcher";
}

const RoleBasedStats = ({ role }: RoleBasedStatsProps) => {
  const getStatsForRole = () => {
    switch (role) {
      case "driver":
        return [
          {
            title: "Today's Rides",
            value: "12",
            change: "+2 from yesterday",
            icon: Car,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
          },
          {
            title: "Earnings",
            value: "$247",
            change: "+15% from last week",
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-100",
          },
          {
            title: "Hours Online",
            value: "6.5h",
            change: "Remaining: 1.5h",
            icon: Clock,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
          },
          {
            title: "Rating",
            value: "4.8★",
            change: "Based on 156 rides",
            icon: TrendingUp,
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
          },
        ];
      
      case "dispatcher":
        return [
          {
            title: "Active Vehicles",
            value: "28/35",
            change: "80% utilization",
            icon: Car,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
          },
          {
            title: "Pending Requests",
            value: "7",
            change: "Avg wait: 3.2 min",
            icon: Clock,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
          },
          {
            title: "Routes Optimized",
            value: "45",
            change: "Saved 2.5 hrs total",
            icon: MapPin,
            color: "text-green-600",
            bgColor: "bg-green-100",
          },
          {
            title: "Alerts",
            value: "3",
            change: "2 maintenance, 1 battery",
            icon: AlertTriangle,
            color: "text-red-600",
            bgColor: "bg-red-100",
          },
        ];
      
      case "admin":
        return [
          {
            title: "Total Revenue",
            value: "$12,450",
            change: "+8.5% vs last month",
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-100",
          },
          {
            title: "Fleet Size",
            value: "35",
            change: "5 electric vehicles",
            icon: Car,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
          },
          {
            title: "Active Drivers",
            value: "42",
            change: "3 new this month",
            icon: Users,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
          },
          {
            title: "System Health",
            value: "99.2%",
            change: "All systems operational",
            icon: CheckCircle,
            color: "text-emerald-600",
            bgColor: "bg-emerald-100",
          },
        ];
      
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RoleBasedStats;
