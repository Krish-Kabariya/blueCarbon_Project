
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Menu, Home, Bell, Map, Award, BookOpen, BarChart } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function AwarenessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                <SidebarTrigger>
                  <Menu />
                </SidebarTrigger>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === '/dashboard'}>
                      <Link href="/dashboard">
                        <div className="flex items-center gap-2">
                          <Home />
                          <span>Dashboard</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Data Visualization" isActive={pathname === '/dashboard/data-visualization'}>
                      <Link href="/dashboard/data-visualization">
                        <div className="flex items-center gap-2">
                          <BarChart />
                          <span>Data Visualization</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Alerts" isActive={pathname === '/dashboard/threat-alerts'}>
                      <Link href="/dashboard/threat-alerts">
                        <div className="flex items-center gap-2">
                          <Bell />
                          <span>Threat Alerts</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Map" isActive={pathname === '/dashboard/map'}>
                      <Link href="/dashboard/map">
                        <div className="flex items-center gap-2">
                          <Map />
                          <span>Map</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Awareness" isActive={pathname === '/awareness'}>
                      <Link href="/awareness">
                        <div className="flex items-center gap-2">
                          <BookOpen />
                          <span>Awareness</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
