// components/Sidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Sidebar({ menuItems }: { menuItems: { name: string; href: string; icon }[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-primary text-white h-screen p-4 flex flex-col justify-between">
      <div>

      </div>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => {
            const isActive = pathname.includes(item.href);  
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-2xl font-medium transition-all duration-300 
                  ${isActive ? "bg-white text-primary shadow-md" : "hover:bg-opacity-20 hover:bg-white"}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>  
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <footer className="text-xs text-center text-white opacity-50">
        © {new Date().getFullYear()} Hecho por Brayann Benavides
      </footer>
    </aside>
  );
}

