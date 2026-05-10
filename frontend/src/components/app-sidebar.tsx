"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Image as ImageIcon,
  AlertTriangle,
  Wrench,
  Users,
  BookOpen,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Obras",
    url: "/obras",
    icon: ImageIcon,
  },
  {
    title: "Obras Deterioradas",
    url: "/obras-deterioradas",
    icon: AlertTriangle,
  },
  {
    title: "Restauraciones",
    url: "/restauraciones",
    icon: Wrench,
  },
  {
    title: "Personal",
    url: "/personal",
    icon: Users,
  },
  {
    title: "Catalogo",
    url: "/catalogo",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image
            src="/images/logo-udea.jpg"
            alt="Universidad de Antioquia"
            width={48}
            height={48}
            className="rounded-md bg-white p-1"
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg font-semibold text-sidebar-foreground">
              MUUA
            </span>
            <span className="text-xs text-sidebar-foreground/70">
              Gestión de Obras
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo-facultad.png"
            alt="Facultad de Ingeniería"
            width={120}
            height={40}
            className="rounded bg-white p-1"
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
