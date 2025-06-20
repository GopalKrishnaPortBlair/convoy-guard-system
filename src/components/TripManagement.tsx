
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, MapPin, Calendar, Users, Car, User, X, UserPlus } from 'lucide-react';

interface Passenger {
  id: string;
  name: string;
  idProof: string;
  phone: string;
}

const TripManagement = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTrip, setNewTrip] = useState({
    vehicleId: '',
    driverId: '',
    origin: '',
    destination: '',
    dateTime: '',
    passengers: [] as Passenger[]
  });

  const [newPassenger, setNewPassenger] = useState({
    name: '',
    idProof: '',
    phone: ''
  });

  // Mock data
  const mockVehicles = [
    { id: '1', plateNumber: 'MH-12-AB-1234', type: 'Car' },
    { id: '2', plateNumber: 'MH-14-CD-5678', type: 'Bus' },
    { id: '3', plateNumber: 'MH-11-EF-9012', type: 'Truck' }
  ];

  const mockDrivers = [
    { id: '1', name: 'Ram Kumar', license: 'DL123456789' },
    { id: '2', name: 'Shyam Singh', license: 'DL987654321' },
    { id: '3', name: 'Ravi Sharma', license: 'DL456789123' }
  ];

  const mockTrips = [
    {
      id: '1',
      vehicle: 'MH-12-AB-1234',
      driver: 'Ram Kumar',
      origin: 'Mumbai',
      destination: 'Pune',
      dateTime: '2024-01-15 10:30 AM',
      passengers: ['John Doe', 'Jane Smith'],
      status: 'active'
    },
    {
      id: '2',
      vehicle: 'MH-14-CD-5678',
      driver: 'Shyam Singh',
      origin: 'Pune',
      destination: 'Nashik',
      dateTime: '2024-01-15 11:15 AM',
      passengers: ['Alice Johnson'],
      status: 'completed'
    }
  ];

  const addPassenger = () => {
    if (!newPassenger.name || !newPassenger.idProof || !newPassenger.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all passenger details.",
        variant: "destructive",
      });
      return;
    }

    const passenger: Passenger = {
      id: Date.now().toString(),
      ...newPassenger
    };

    setNewTrip({
      ...newTrip,
      passengers: [...newTrip.passengers, passenger]
    });

    setNewPassenger({ name: '', idProof: '', phone: '' });

    toast({
      title: "Passenger Added",
      description: `${passenger.name} has been added to the trip.`,
    });
  };

  const removePassenger = (passengerId: string) => {
    setNewTrip({
      ...newTrip,
      passengers: newTrip.passengers.filter(p => p.id !== passengerId)
    });
  };

  const handleCreateTrip = () => {
    if (!newTrip.vehicleId || !newTrip.driverId || !newTrip.origin || !newTrip.destination) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Trip Created",
      description: `New trip has been successfully created with ${newTrip.passengers.length} passengers.`,
    });

    setIsDialogOpen(false);
    setNewTrip({
      vehicleId: '',
      driverId: '',
      origin: '',
      destination: '',
      dateTime: '',
      passengers: []
    });
    setNewPassenger({ name: '', idProof: '', phone: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Trip Management</h2>
          <p className="text-gray-600">Create and manage your trips</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Trip
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Trip</DialogTitle>
              <DialogDescription>
                Fill in the trip details and add passengers for the journey.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Vehicle Selection */}
              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle</Label>
                <Select onValueChange={(value) => setNewTrip({...newTrip, vehicleId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockVehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.plateNumber} ({vehicle.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Driver Selection */}
              <div className="space-y-2">
                <Label htmlFor="driver">Driver</Label>
                <Select onValueChange={(value) => setNewTrip({...newTrip, driverId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDrivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Trip Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    value={newTrip.origin}
                    onChange={(e) => setNewTrip({...newTrip, origin: e.target.value})}
                    placeholder="Starting location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={newTrip.destination}
                    onChange={(e) => setNewTrip({...newTrip, destination: e.target.value})}
                    placeholder="End location"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="datetime">Date & Time</Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={newTrip.dateTime}
                  onChange={(e) => setNewTrip({...newTrip, dateTime: e.target.value})}
                />
              </div>

              {/* Passenger Section */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Passengers</Label>
                  <Badge variant="secondary">{newTrip.passengers.length} added</Badge>
                </div>

                {/* Add New Passenger */}
                <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
                  <Label className="text-sm font-medium">Add Passenger</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <Input
                      placeholder="Full Name"
                      value={newPassenger.name}
                      onChange={(e) => setNewPassenger({...newPassenger, name: e.target.value})}
                    />
                    <Input
                      placeholder="ID Proof (Aadhar/Passport)"
                      value={newPassenger.idProof}
                      onChange={(e) => setNewPassenger({...newPassenger, idProof: e.target.value})}
                    />
                    <Input
                      placeholder="Phone Number"
                      value={newPassenger.phone}
                      onChange={(e) => setNewPassenger({...newPassenger, phone: e.target.value})}
                    />
                  </div>
                  <Button onClick={addPassenger} size="sm" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Passenger
                  </Button>
                </div>

                {/* Passenger List */}
                {newTrip.passengers.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Added Passengers:</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {newTrip.passengers.map((passenger) => (
                        <div key={passenger.id} className="flex items-center justify-between p-2 border rounded bg-white">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{passenger.name}</p>
                            <p className="text-xs text-gray-600">{passenger.idProof} • {passenger.phone}</p>
                          </div>
                          <Button
                            onClick={() => removePassenger(passenger.id)}
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateTrip}>Create Trip</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Trips List */}
      <div className="grid gap-4">
        {mockTrips.map((trip) => (
          <Card key={trip.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                  <div className="flex items-center space-x-2">
                    <Car className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">{trip.vehicle}</p>
                      <p className="text-sm text-gray-600">Vehicle</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">{trip.driver}</p>
                      <p className="text-sm text-gray-600">Driver</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">{trip.origin} → {trip.destination}</p>
                      <p className="text-sm text-gray-600">Route</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">{trip.dateTime}</p>
                      <p className="text-sm text-gray-600">Schedule</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{trip.passengers.length}</span>
                  </div>
                  <Badge variant={trip.status === 'active' ? 'default' : 'secondary'}>
                    {trip.status}
                  </Badge>
                </div>
              </div>
              {trip.passengers.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-2">Passengers:</p>
                  <div className="flex flex-wrap gap-2">
                    {trip.passengers.map((passenger, index) => (
                      <Badge key={index} variant="outline">
                        {passenger}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TripManagement;
