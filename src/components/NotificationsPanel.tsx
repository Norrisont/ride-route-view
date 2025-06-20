
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, AlertTriangle, Info, CheckCircle, X } from "lucide-react";

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "alert",
      title: "Vehicle Maintenance Due",
      message: "Vehicle #247 is due for routine maintenance",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "info",
      title: "New Ride Request",
      message: "High priority pickup from Downtown Medical Center",
      time: "12 min ago",
      unread: true,
    },
    {
      id: 3,
      type: "success",
      title: "Route Optimized",
      message: "New route saved 15 minutes for driver John D.",
      time: "25 min ago",
      unread: false,
    },
    {
      id: 4,
      type: "alert",
      title: "Low Battery Warning",
      message: "Vehicle #156 battery below 20%",
      time: "45 min ago",
      unread: false,
    },
    {
      id: 5,
      type: "info",
      title: "Driver Available",
      message: "Sarah M. is now available for new assignments",
      time: "1 hr ago",
      unread: false,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case "alert": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "info": return <Info className="h-4 w-4 text-blue-500" />;
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    ));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-orange-600" />
            Notifications
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="space-y-1 p-4 pt-0">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                  notification.unread 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-0.5">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-slate-900 truncate">
                          {notification.title}
                        </h4>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">{notification.time}</span>
                        <div className="flex gap-1">
                          {notification.unread && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark read
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => dismissNotification(notification.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-slate-200">
          <Button variant="outline" size="sm" className="w-full">
            View All Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;
