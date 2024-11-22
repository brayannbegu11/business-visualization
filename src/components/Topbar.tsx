// components/Topbar.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { logout } from "@/services/auth.service";

export default function Topbar() {
  return (
    <header className="bg-gradient-to-b from-primary flex items-center justify-between px-6 py-4">
      <h1 className="text-2xl font-bold text-gray-800">Mis Negocios</h1>
      <div className="flex items-center space-x-4">
        {/* Avatar con trigger de Popover */}
        <Popover >
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/path/to/user-image.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </PopoverTrigger>

          {/* Contenido del Popover (Menú desplegable) */}
          <PopoverContent className="w-48 p-4 space-y-4 rounded-lg shadow-lg bg-white">
            <button onClick={() => alert("Cambiar contraseña")} className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded">
              Cambiar Contraseña
            </button>
            <button onClick={() => alert("Editar datos")} className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded">
              Editar Datos
            </button>
            <button onClick={logout} className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded">
              Logout
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}