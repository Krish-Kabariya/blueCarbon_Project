
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
import { Home, Bell, Map, BookOpen, BarChart, Menu } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function DashboardLayout({
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
              <SidebarGroupLabel className="flex items-center justify-between">
                <span>CoastalWatch</span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === '/dashboard'}>
                            <div className="flex items-center gap-2">
                              <Home />
                              <span>Dashboard</span>
                            </div>
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 ml-2" align="start" side="right">
                        <DropdownMenuItem asChild>
                           <Link href="/dashboard">
                              <Home className="mr-2 h-4 w-4" />
                              <span>Dashboard</span>
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/threat-alerts">
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Threat Alerts</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/map">
                            <Map className="mr-2 h-4 w-4" />
                            <span>Interactive Map</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                  <SidebarMenuItem>
                    <ThemeToggle />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>

        {/* Main content */}
        <main className="flex-1 flex flex-col">
            <DashboardHeader />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
