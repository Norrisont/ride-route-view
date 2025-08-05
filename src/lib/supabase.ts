import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Database types
export interface Vehicle {
  id: string
  driver_name: string
  status: 'active' | 'idle' | 'maintenance'
  battery: number
  location_lat: number
  location_lng: number
  vehicle_type: string
  speed: string
  updated_at: string
}

export interface RideRequest {
  id: string
  passenger_name: string
  pickup_location: string
  destination: string
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
  scheduled_time: string
  driver_id: string | null
  vehicle_id: string | null
  created_at: string
  updated_at: string
}