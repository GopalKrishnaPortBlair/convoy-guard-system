
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Car, Plus, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Vehicle {
  id: string;
  plateNumber: string;
  type: string;
  model: string;
  capacity: number;
}

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: '1', plateNumber: 'MH12AB1234', type: 'Car', model: 'Maruti Swift', capacity: 4 },
    { id: '2', plateNumber: 'MH14CD5678', type: 'Bus', model: 'Tata Ultra', capacity: 32 },
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    plateNumber: '',
    type: '',
    model: '',
    capacity: ''
  });
  
  const { toast } = useToast();

  const handleAddVehicle = () => {
    if (!formData.plateNumber || !formData.type || !formData.model || !formData.capacity) {
      toast({
        title: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      plateNumber: formData.plateNumber,
      type: formData.type,
      model: formData.model,
      capacity: parseInt(formData.capacity)
    };

    setVehicles([...vehicles, newVehicle]);
    setFormData({ plateNumber: '', type: '', model: '', capacity: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Vehicle added successfully",
    });
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast({
      title: "Vehicle deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Vehicle Management</h2>
          <p className="text-gray-600">Manage your fleet of vehicles</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>
                Enter the details of your new vehicle
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plateNumber">Plate Number</Label>
                <Input
                  id="plateNumber"
                  value={formData.plateNumber}
                  onChange={(e) => setFormData({...formData, plateNumber: e.target.value})}
                  placeholder="e.g., MH12AB1234"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Vehicle Type</Label>
                <Select onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Car">Car</SelectItem>
                    <SelectItem value="Bus">Bus</SelectItem>
                    <SelectItem value="Truck">Truck</SelectItem>
                    <SelectItem value="Van">Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  placeholder="e.g., Maruti Swift"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Passenger Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  placeholder="e.g., 4"
                />
              </div>
              <Button onClick={handleAddVehicle} className="w-full">
                Add Vehicle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Car className="h-8 w-8 text-blue-600" />
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <CardTitle>{vehicle.plateNumber}</CardTitle>
              <CardDescription>{vehicle.model}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className="text-sm font-medium">{vehicle.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Capacity:</span>
                  <span className="text-sm font-medium">{vehicle.capacity} passengers</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleManagement;
