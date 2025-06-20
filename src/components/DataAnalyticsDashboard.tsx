
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, DollarSign, Clock, Car, Calendar } from "lucide-react";

const DataAnalyticsDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("day");

  // Sample data - would come from API in real app
  const rideData = {
    day: [
      { period: "6 AM", rides: 12, revenue: 280 },
      { period: "9 AM", rides: 45, revenue: 1050 },
      { period: "12 PM", rides: 38, revenue: 890 },
      { period: "3 PM", rides: 52, revenue: 1220 },
      { period: "6 PM", rides: 35, revenue: 820 },
      { period: "9 PM", rides: 18, revenue: 420 }
    ],
    week: [
      { period: "Mon", rides: 145, revenue: 3400 },
      { period: "Tue", rides: 162, revenue: 3800 },
      { period: "Wed", rides: 158, revenue: 3700 },
      { period: "Thu", rides: 171, revenue: 4000 },
      { period: "Fri", rides: 189, revenue: 4400 },
      { period: "Sat", rides: 134, revenue: 3100 },
      { period: "Sun", rides: 98, revenue: 2300 }
    ],
    month: [
      { period: "Week 1", rides: 1056, revenue: 24800 },
      { period: "Week 2", rides: 1187, revenue: 27900 },
      { period: "Week 3", rides: 1145, revenue: 26800 },
      { period: "Week 4", rides: 1289, revenue: 30200 }
    ],
    year: [
      { period: "Q1", rides: 12450, revenue: 292000 },
      { period: "Q2", rides: 13890, revenue: 326000 },
      { period: "Q3", rides: 14200, revenue: 334000 },
      { period: "Q4", rides: 15600, revenue: 367000 }
    ]
  };

  const vehicleTypeData = [
    { name: "Sedan", value: 45, color: "#3B82F6" },
    { name: "SUV", value: 30, color: "#10B981" },
    { name: "Van", value: 20, color: "#F59E0B" },
    { name: "Wheelchair", value: 5, color: "#EF4444" }
  ];

  const driverPerformance = [
    { name: "John S.", rides: 89, rating: 4.9, earnings: 2100 },
    { name: "Sarah D.", rides: 76, rating: 4.8, earnings: 1890 },
    { name: "Mike W.", rides: 82, rating: 4.7, earnings: 1950 },
    { name: "Emily C.", rides: 71, rating: 4.9, earnings: 1680 },
    { name: "David M.", rides: 65, rating: 4.6, earnings: 1520 }
  ];

  const currentData = rideData[timeFilter as keyof typeof rideData];

  const totalRides = currentData.reduce((sum, item) => sum + item.rides, 0);
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0);
  const avgRidesPerPeriod = Math.round(totalRides / currentData.length);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Data Analytics Dashboard
          </CardTitle>
          <div className="flex gap-1">
            {["day", "week", "month", "year"].map((period) => (
              <Button
                key={period}
                size="sm"
                variant={timeFilter === period ? "default" : "outline"}
                onClick={() => setTimeFilter(period)}
                className="h-8 px-3"
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Car className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Total Rides</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{totalRides.toLocaleString()}</p>
            <p className="text-xs text-blue-600">Avg: {avgRidesPerPeriod} per {timeFilter.slice(0, -1)}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">Revenue</span>
            </div>
            <p className="text-2xl font-bold text-green-900">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-green-600">+12% vs last {timeFilter}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Active Drivers</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">42</p>
            <p className="text-xs text-purple-600">85% utilization</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-900">Avg Response</span>
            </div>
            <p className="text-2xl font-bold text-orange-900">3.2 min</p>
            <p className="text-xs text-orange-600">-15s from last {timeFilter}</p>
          </div>
        </div>

        {/* Charts */}
        <Tabs defaultValue="rides" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rides">Rides Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicle Types</TabsTrigger>
            <TabsTrigger value="drivers">Driver Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rides" className="mt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rides" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="revenue" className="mt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="vehicles" className="mt-6">
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {vehicleTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="drivers" className="mt-6">
            <div className="space-y-4">
              {driverPerformance.map((driver, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-blue-900">{driver.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{driver.name}</p>
                      <p className="text-sm text-slate-600">{driver.rides} rides • {driver.rating}★ rating</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">${driver.earnings}</p>
                    <p className="text-sm text-slate-600">This {timeFilter}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataAnalyticsDashboard;
