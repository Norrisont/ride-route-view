import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
/// <reference types="google.maps" />
import { Car, Navigation, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { supabase, Vehicle } from '@/lib/supabase'
import { toast } from 'sonner'

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map())
  const [mapLoaded, setMapLoaded] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  // Initialize Google Maps
  useEffect(() => {
    if (!apiKey || !mapRef.current) return

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['maps', 'marker']
    })

    loader.load().then(() => {
      if (!mapRef.current) return

      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates
        zoom: 12,
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      })

      setMapLoaded(true)
      toast.success('Google Maps loaded successfully!')
    }).catch((error) => {
      console.error('Google Maps loading error:', error)
      toast.error('Failed to load Google Maps. Please check your API key.')
    })
  }, [apiKey])

  // Load vehicles and set up real-time updates
  useEffect(() => {
    if (!mapLoaded) return

    // Load initial vehicles
    loadVehicles()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('vehicles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'vehicles' },
        (payload) => {
          console.log('Vehicle update:', payload)
          loadVehicles()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [mapLoaded])

  const loadVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) {
        console.error('Error loading vehicles:', error)
        // Fallback to mock data if database is not set up
        setVehicles(getMockVehicles())
        return
      }

      setVehicles(data || [])
      updateMapMarkers(data || [])
    } catch (error) {
      console.error('Error loading vehicles:', error)
      // Fallback to mock data
      setVehicles(getMockVehicles())
      updateMapMarkers(getMockVehicles())
    }
  }

  const getMockVehicles = (): Vehicle[] => [
    {
      id: 'V001',
      driver_name: 'John Smith',
      status: 'active',
      battery: 87,
      location_lat: 40.7589,
      location_lng: -73.9851,
      vehicle_type: 'sedan',
      speed: '45 mph',
      updated_at: new Date().toISOString()
    },
    {
      id: 'V002',
      driver_name: 'Sarah Davis',
      status: 'active',
      battery: 92,
      location_lat: 40.7505,
      location_lng: -73.9934,
      vehicle_type: 'suv',
      speed: '38 mph',
      updated_at: new Date().toISOString()
    },
    {
      id: 'V003',
      driver_name: 'Mike Wilson',
      status: 'idle',
      battery: 76,
      location_lat: 40.7282,
      location_lng: -73.9942,
      vehicle_type: 'sedan',
      speed: '0 mph',
      updated_at: new Date().toISOString()
    }
  ]

  const updateMapMarkers = (vehicleData: Vehicle[]) => {
    if (!mapInstanceRef.current) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current.clear()

    // Add new markers
    vehicleData.forEach(vehicle => {
      const position = { lat: vehicle.location_lat, lng: vehicle.location_lng }
      
      const marker = new google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: `${vehicle.id} - ${vehicle.driver_name}`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: getStatusColor(vehicle.status),
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff'
        }
      })

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold;">${vehicle.id}</h3>
            <p style="margin: 4px 0;"><strong>Driver:</strong> ${vehicle.driver_name}</p>
            <p style="margin: 4px 0;"><strong>Status:</strong> ${vehicle.status}</p>
            <p style="margin: 4px 0;"><strong>Battery:</strong> ${vehicle.battery}%</p>
            <p style="margin: 4px 0;"><strong>Speed:</strong> ${vehicle.speed}</p>
          </div>
        `
      })

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker)
        setSelectedVehicle(vehicle.id)
      })

      markersRef.current.set(vehicle.id, marker)
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981'
      case 'idle': return '#f59e0b'
      case 'maintenance': return '#ef4444'
      default: return '#6b7280'
    }
  }

  if (!apiKey) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center space-y-4 p-6">
          <MapPin className="h-12 w-12 text-blue-600 mx-auto" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Google Maps Setup</h3>
            <p className="text-sm text-slate-600 mb-4">
              Enter your Google Maps API key to enable real-time vehicle tracking
            </p>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Google Maps API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="max-w-md"
              />
              <p className="text-xs text-slate-500">
                Get your API key from{' '}
                <a 
                  href="https://console.cloud.google.com/google/maps-apis" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Google Cloud Console
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!mapLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 rounded-lg">
        <div className="text-center">
          <Car className="h-8 w-8 text-blue-600 mx-auto mb-2 animate-pulse" />
          <p className="text-slate-600">Loading Google Maps...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full relative">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      
      {/* Map Controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-10">
        <Button 
          size="sm" 
          variant="outline" 
          className="bg-white/90 backdrop-blur border-gray-300 shadow-sm"
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setCenter({ lat: 40.7128, lng: -74.0060 })
              mapInstanceRef.current.setZoom(12)
            }
          }}
        >
          <Navigation className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="bg-white/90 backdrop-blur border-gray-300 shadow-sm"
          onClick={() => loadVehicles()}
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>

      {/* Status Legend */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur rounded-lg p-3 text-xs shadow-lg border border-gray-200 z-10">
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
      <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-sm z-10 flex items-center gap-1">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        Live Tracking
      </div>
    </div>
  )
}

export default GoogleMap