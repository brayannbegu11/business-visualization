import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { addNewBusiness, addUserToBusiness, linkExistingBusiness } from '@/services/business.service';

export default function CreateBusinessModal() {
  const [activeTab, setActiveTab] = useState<'create' | 'link'>('create'); // Controla la opción activa
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [businessId, setBusinessId] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Lógica para crear un negocio nuevo
  const handleCreate = async () => {
    try {
      await addNewBusiness(name, phoneNumber, location);
    } catch (error) {
      console.error('Error creando negocio:', error);
      alert('No se pudo crear el negocio.');
    }
  };

  // Lógica para vincular un negocio existente
  const handleAddUser = async () => {
    try {
      const response = await addUserToBusiness(businessId)
      if(response  === 'Error ingresando el usuario al negocio') {
        throw new Error('El negocio ya existe en este usuario')
      }
    } catch (error) {
      let messageError = 'Error inesperado'
      if (error instanceof Error){
        messageError = error.message
      }
      setErrorMessage(messageError)
      setIsErrorModalOpen(true)

    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500 text-white">Nuevo Negocio</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
          {activeTab === 'create' ? 'Crear Nuevo Negocio' : 'Vincular Negocio Existente'}
        </DialogTitle>

        {/* Selector de opción */}
        <div className="flex justify-center space-x-4 mb-4">
          <Button
            variant={activeTab === 'create' ? 'default' : 'outline'}
            onClick={() => setActiveTab('create')}
          >
            Crear Negocio
          </Button>
          <Button
            variant={activeTab === 'link' ? 'default' : 'outline'}
            onClick={() => setActiveTab('link')}
          >
            Vincular Existente
          </Button>
        </div>

        {activeTab === 'create' && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
          >
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
                <Button variant="outline" className="bg-gray-300 text-black">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-green-500 text-white">
                Crear Negocio
              </Button>
            </div>
          </form>
        )}

        {activeTab === 'link' && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddUser();
            }}
          >
            <div>
              <Label htmlFor="businessId">ID del Negocio</Label>
              <Input
                id="businessId"
                type="text"
                value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
                placeholder="ID del negocio"
                className="mt-2"
              />
            </div>

            <div className="flex justify-between items-center mt-6">
              <DialogClose asChild>
                <Button variant="outline" className="bg-gray-300 text-black">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-blue-500 text-white">
                Vincular Negocio
              </Button>
            </div>
          </form>
          
        )}
         <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-danger'>Error</DialogTitle>
          <DialogDescription>
            {errorMessage}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className='bg-danger' onClick={() => setIsErrorModalOpen(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </DialogContent>
    </Dialog>
  );
}
