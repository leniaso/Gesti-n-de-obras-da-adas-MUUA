"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Palette,
  AlertTriangle,
  Wrench,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Obras", href: "/obras", icon: Palette },
  { name: "Reportes de Deterioro", href: "/deterioros", icon: AlertTriangle },
  { name: "Restauraciones", href: "/restauraciones", icon: Wrench },
  { name: "Personal", href: "/personal", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar))]">
      <div className="flex h-16 items-center border-b border-[hsl(var(--sidebar-border))] px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]">
            <Palette className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-[hsl(var(--foreground))]">
            MUUA
          </span>
        </Link>
      </div>

      <nav className="flex flex-col gap-1 p-4">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
          Menu Principal
        </p>
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[hsl(var(--primary))] text-white"
                  : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t border-[hsl(var(--sidebar-border))] p-4">
        <Link
          href="/configuracion"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]"
        >
          <Settings className="h-5 w-5" />
          Configuracion
        </Link>
      </div>
    </aside>
  );
}
