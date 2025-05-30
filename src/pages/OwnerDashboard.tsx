
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import VehicleManagement from '../components/VehicleManagement';
import DriverManagement from '../components/DriverManagement';
import TripManagement from '../components/TripManagement';
import { Car, Users, Route, Plus } from 'lucide-react';

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Total Vehicles', value: '12', icon: Car, color: 'text-blue-600' },
    { title: 'Active Drivers', value: '8', icon: Users, color: 'text-green-600' },
    { title: 'Ongoing Trips', value: '3', icon: Route, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'individual' ? 'Individual Owner' : 'Company'} Dashboard
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="trips">Trips</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Trips</CardTitle>
                  <CardDescription>Latest trip activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((trip) => (
                      <div key={trip} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Trip #{trip}</p>
                          <p className="text-sm text-gray-600">Mumbai to Pune</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('trips')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Trip
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('vehicles')}>
                    <Car className="mr-2 h-4 w-4" />
                    Add Vehicle
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('drivers')}>
                    <Users className="mr-2 h-4 w-4" />
                    Add Driver
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vehicles">
            <VehicleManagement />
          </TabsContent>

          <TabsContent value="drivers">
            <DriverManagement />
          </TabsContent>

          <TabsContent value="trips">
            <TripManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OwnerDashboard;
