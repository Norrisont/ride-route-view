
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const RideCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock ride data
  const ridesForSelectedDate = [
    { id: 1, time: "09:00", destination: "Airport", status: "scheduled" },
    { id: 2, time: "11:30", destination: "Downtown", status: "in-progress" },
    { id: 3, time: "14:15", destination: "Mall", status: "completed" },
    { id: 4, time: "16:45", destination: "Hospital", status: "scheduled" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-700";
      case "in-progress": return "bg-yellow-100 text-yellow-700";
      case "completed": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border-0"
        classNames={{
          months: "flex flex-col space-y-4",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-50 rounded-md transition-colors",
          day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
        }}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-slate-700">
            {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            }) : 'Today\'s'} Rides
          </h4>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {ridesForSelectedDate.map((ride) => (
            <div key={ride.id} className="flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">{ride.time}</span>
                <span className="text-xs text-slate-600">{ride.destination}</span>
              </div>
              <Badge variant="secondary" className={getStatusColor(ride.status)}>
                {ride.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RideCalendar;
