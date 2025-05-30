
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, Plus, Edit, Trash, Phone, IdCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  phone: string;
  experience: number;
}

const DriverManagement = () => {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: '1', name: 'Rajesh Kumar', licenseNumber: 'MH1420180001234', phone: '+91 9876543210', experience: 5 },
    { id: '2', name: 'Suresh Patil', licenseNumber: 'MH1420190005678', phone: '+91 9876543211', experience: 8 },
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    phone: '',
    experience: ''
  });
  
  const { toast } = useToast();

  const handleAddDriver = () => {
    if (!formData.name || !formData.licenseNumber || !formData.phone || !formData.experience) {
      toast({
        title: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    const newDriver: Driver = {
      id: Date.now().toString(),
      name: formData.name,
      licenseNumber: formData.licenseNumber,
      phone: formData.phone,
      experience: parseInt(formData.experience)
    };

    setDrivers([...drivers, newDriver]);
    setFormData({ name: '', licenseNumber: '', phone: '', experience: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Driver added successfully",
    });
  };

  const handleDeleteDriver = (id: string) => {
    setDrivers(drivers.filter(d => d.id !== id));
    toast({
      title: "Driver deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Driver Management</h2>
          <p className="text-gray-600">Manage your drivers</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Driver</DialogTitle>
              <DialogDescription>
                Enter the details of your new driver
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Rajesh Kumar"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                  placeholder="e.g., MH1420180001234"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="e.g., +91 9876543210"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience (Years)</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  placeholder="e.g., 5"
                />
              </div>
              <Button onClick={handleAddDriver} className="w-full">
                Add Driver
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <Card key={driver.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <User className="h-8 w-8 text-green-600" />
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteDriver(driver.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <CardTitle>{driver.name}</CardTitle>
              <CardDescription>{driver.experience} years experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <IdCard className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{driver.licenseNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{driver.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DriverManagement;
