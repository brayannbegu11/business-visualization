// components/Sidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ChartBarIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  const pathname = usePathname();
  

  const menuItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Dashboard", href: "/dashboard", icon: ChartBarIcon },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-primary text-white h-screen p-4 flex flex-col justify-between">
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 
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
        © {new Date().getFullYear()} MyApp
      </footer>
    </aside>
  );
}

