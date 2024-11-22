import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
  
  export default function UserMenu() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
          <AvatarImage src="https://github.com/shadcn.png"  className="w-10 h-10 rounded-full" />  
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>Cambiar contraseña</DropdownMenuItem>
          <DropdownMenuItem>Editar datos</DropdownMenuItem>
          <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }