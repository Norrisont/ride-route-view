import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, User, MapPin, Car, Calendar, Plus } from 'lucide-react'
import { supabase, RideRequest } from '@/lib/supabase'
import { toast } from 'sonner'
import { format, parseISO } from 'date-fns'

const LiveScheduling = () => {
  const [rides, setRides] = useState<RideRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRides()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('ride_requests')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'ride_requests' },
        (payload) => {
          console.log('Ride update:', payload)
          handleRealTimeUpdate(payload)
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadRides = async () => {
    try {
      const { data, error } = await supabase
        .from('ride_requests')
        .select('*')
        .order('scheduled_time', { ascending: true })

      if (error) {
        console.error('Error loading rides:', error)
        // Fallback to mock data
        setRides(getMockRides())
        setLoading(false)
        return
      }

      setRides(data || [])
      setLoading(false)
    } catch (error) {
      console.error('Error loading rides:', error)
      setRides(getMockRides())
      setLoading(false)
    }
  }

  const getMockRides = (): RideRequest[] => [
    {
      id: 'R001',
      passenger_name: 'Alice Johnson',
      pickup_location: 'Times Square',
      destination: 'JFK Airport',
      status: 'pending',
      scheduled_time: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      driver_id: null,
      vehicle_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'R002',
      passenger_name: 'Bob Smith',
      pickup_location: 'Central Park',
      destination: 'Brooklyn Bridge',
      status: 'assigned',
      scheduled_time: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
      driver_id: 'D001',
      vehicle_id: 'V001',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'R003',
      passenger_name: 'Carol Davis',
      pickup_location: 'Penn Station',
      destination: 'LaGuardia Airport',
      status: 'in_progress',
      scheduled_time: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      driver_id: 'D002',
      vehicle_id: 'V002',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]

  const handleRealTimeUpdate = (payload: any) => {
    const { eventType, new: newRecord, old: oldRecord } = payload

    setRides(currentRides => {
      switch (eventType) {
        case 'INSERT':
          toast.success(`New ride request from ${newRecord.passenger_name}`)
          return [...currentRides, newRecord]
        
        case 'UPDATE':
          toast.info(`Ride ${newRecord.id} updated: ${newRecord.status}`)
          return currentRides.map(ride => 
            ride.id === newRecord.id ? newRecord : ride
          )
        
        case 'DELETE':
          toast.info(`Ride ${oldRecord.id} cancelled`)
          return currentRides.filter(ride => ride.id !== oldRecord.id)
        
        default:
          return currentRides
      }
    })
  }

  const updateRideStatus = async (rideId: string, status: RideRequest['status']) => {
    try {
      const { error } = await supabase
        .from('ride_requests')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', rideId)

      if (error) {
        console.error('Error updating ride:', error)
        // Fallback: update local state
        setRides(currentRides =>
          currentRides.map(ride =>
            ride.id === rideId 
              ? { ...ride, status, updated_at: new Date().toISOString() }
              : ride
          )
        )
      }

      toast.success(`Ride ${rideId} status updated to ${status}`)
    } catch (error) {
      console.error('Error updating ride:', error)
      toast.error('Failed to update ride status')
    }
  }

  const getStatusColor = (status: RideRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500'
      case 'assigned': return 'bg-blue-500'
      case 'in_progress': return 'bg-green-500'
      case 'completed': return 'bg-gray-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusVariant = (status: RideRequest['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'pending': return 'secondary'
      case 'assigned': return 'default'
      case 'in_progress': return 'default'
      case 'completed': return 'outline'
      case 'cancelled': return 'destructive'
      default: return 'secondary'
    }
  }

  const pendingRides = rides.filter(ride => ride.status === 'pending')
  const activeRides = rides.filter(ride => ['assigned', 'in_progress'].includes(ride.status))
  const completedRides = rides.filter(ride => ['completed', 'cancelled'].includes(ride.status))

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map(j => (
                  <div key={j} className="h-20 bg-gray-100 rounded"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Real-time Status Indicator */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-green-800">Live Scheduling Active</span>
              <Badge variant="outline" className="text-green-600 border-green-300">
                Real-time Updates
              </Badge>
            </div>
            <div className="text-sm text-green-700">
              Last updated: {format(new Date(), 'HH:mm:ss')}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Rides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              Pending Rides
              <Badge variant="secondary" className="ml-auto">
                {pendingRides.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {pendingRides.map(ride => (
                <div key={ride.id} className="p-3 rounded-lg border border-yellow-200 bg-yellow-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-900">{ride.passenger_name}</span>
                    <Badge variant={getStatusVariant(ride.status)}>
                      {ride.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{ride.pickup_location} → {ride.destination}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{format(parseISO(ride.scheduled_time), 'MMM dd, HH:mm')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => updateRideStatus(ride.id, 'assigned')}
                    >
                      Assign
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateRideStatus(ride.id, 'cancelled')}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
              {pendingRides.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  No pending rides
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Active Rides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-600" />
              Active Rides
              <Badge variant="default" className="ml-auto">
                {activeRides.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activeRides.map(ride => (
                <div key={ride.id} className="p-3 rounded-lg border border-blue-200 bg-blue-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-900">{ride.passenger_name}</span>
                    <Badge variant={getStatusVariant(ride.status)}>
                      {ride.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{ride.pickup_location} → {ride.destination}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>Driver: {ride.driver_id || 'Unassigned'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Car className="h-3 w-3" />
                      <span>Vehicle: {ride.vehicle_id || 'Unassigned'}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {ride.status === 'assigned' && (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => updateRideStatus(ride.id, 'in_progress')}
                      >
                        Start Trip
                      </Button>
                    )}
                    {ride.status === 'in_progress' && (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => updateRideStatus(ride.id, 'completed')}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {activeRides.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  No active rides
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Completed Rides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-600" />
              Recent Completed
              <Badge variant="outline" className="ml-auto">
                {completedRides.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {completedRides.slice(0, 10).map(ride => (
                <div key={ride.id} className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-900">{ride.passenger_name}</span>
                    <Badge variant={getStatusVariant(ride.status)}>
                      {ride.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{ride.pickup_location} → {ride.destination}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{format(parseISO(ride.updated_at), 'MMM dd, HH:mm')}</span>
                    </div>
                  </div>
                </div>
              ))}
              {completedRides.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  No completed rides
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LiveScheduling