// components/CreateBusinessModal.tsx
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addNewBusiness } from '@/services/business.service';

export default function CreateBusinessModal() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  
  const handleCreate = async() => {
    try {
        await addNewBusiness(name, phoneNumber, location)
        alert('Negocio creado!');
    } catch (error) {
        console.log("Error creando negocio", error)
    }
    

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500 text-white">Nuevo Negocio</Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">Crear Nuevo Negocio</DialogTitle>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
          <div>
            <Label htmlFor="name">Nombre del Negocio</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del negocio"
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Teléfono"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ubicación"
              className="mt-2"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <DialogClose asChild>
              <Button variant="outline" className="bg-gray-300 text-black">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-green-500 text-white">Crear Negocio</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
