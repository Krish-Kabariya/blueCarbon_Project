"use client";

import Link from "next/link";
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
import { Menu, Home, Bell, Map, Award, BookOpen } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
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
                    <SidebarMenuButton asChild tooltip="Dashboard" isActive>
                      <Link href="/dashboard">
                        <div className="flex items-center gap-2">
                          <Home />
                          <span>Dashboard</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Alerts">
                      <Link href="#">
                        <div className="flex items-center gap-2">
                          <Bell />
                          <span>Threat Alerts</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Map">
                      <Link href="/map">
                        <div className="flex items-center gap-2">
                          <Map />
                          <span>Map</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Leaderboard">
                      <Link href="/leaderboard">
                        <div className="flex items-center gap-2">
                          <Award />
                          <span>Leaderboard</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Awareness">
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
        <main className="flex-1 p-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}
