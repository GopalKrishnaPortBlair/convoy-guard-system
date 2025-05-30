
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { Search, Eye, Car, Users, MapPin } from 'lucide-react';

const PoliceDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for trips
  const mockTrips = [
    {
      id: '1',
      vehicleNumber: 'MH-12-AB-1234',
      owner: 'John Doe',
      driver: 'Ram Kumar',
      origin: 'Mumbai',
      destination: 'Pune',
      time: '2024-01-15 10:30 AM',
      passengers: 4,
      status: 'active'
    },
    {
      id: '2',
      vehicleNumber: 'MH-14-CD-5678',
      owner: 'ABC Transport Co.',
      driver: 'Shyam Singh',
      origin: 'Pune',
      destination: 'Nashik',
      time: '2024-01-15 11:15 AM',
      passengers: 2,
      status: 'completed'
    },
    {
      id: '3',
      vehicleNumber: 'MH-11-EF-9012',
      owner: 'Jane Smith',
      driver: 'Ravi Sharma',
      origin: 'Nashik',
      destination: 'Aurangabad',
      time: '2024-01-15 12:00 PM',
      passengers: 3,
      status: 'active'
    }
  ];

  const filteredTrips = mockTrips.filter(trip => 
    trip.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { title: 'Active Trips', value: mockTrips.filter(t => t.status === 'active').length, icon: Car, color: 'text-green-600' },
    { title: 'Completed Today', value: mockTrips.filter(t => t.status === 'completed').length, icon: MapPin, color: 'text-blue-600' },
    { title: 'Total Passengers', value: mockTrips.reduce((sum, trip) => sum + trip.passengers, 0), icon: Users, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Police Dashboard - {user?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor trips and vehicles passing through checkpost
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Trips</CardTitle>
            <CardDescription>Filter trips by vehicle number, owner, or driver</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by vehicle number, owner, or driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Trips List */}
        <Card>
          <CardHeader>
            <CardTitle>Trip Monitoring</CardTitle>
            <CardDescription>Live tracking of trips passing through checkpost</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTrips.map((trip) => (
                <div key={trip.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                      <div>
                        <p className="font-semibold text-lg">{trip.vehicleNumber}</p>
                        <p className="text-sm text-gray-600">Vehicle</p>
                      </div>
                      <div>
                        <p className="font-medium">{trip.owner}</p>
                        <p className="text-sm text-gray-600">Owner</p>
                        <p className="text-sm text-gray-500">Driver: {trip.driver}</p>
                      </div>
                      <div>
                        <p className="font-medium">{trip.origin} → {trip.destination}</p>
                        <p className="text-sm text-gray-600">Route</p>
                        <p className="text-sm text-gray-500">{trip.time}</p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{trip.passengers} passengers</span>
                        </div>
                        <Badge 
                          variant={trip.status === 'active' ? 'default' : 'secondary'}
                          className="mt-1"
                        >
                          {trip.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredTrips.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No trips found matching your search criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PoliceDashboard;
