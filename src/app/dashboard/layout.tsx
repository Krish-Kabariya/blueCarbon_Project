import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, Bell, BookOpen, Megaphone, LifeBuoy, BarChart, LogOut, ShieldHalf } from "lucide-react";
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-3 p-2">
              <ShieldHalf className="h-8 w-8 text-sidebar-primary" />
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-sidebar-foreground">Coastal Guardian</h1>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard" isActive>
                  <Link href="/dashboard">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Alerts">
                  <Link href="#">
                    <Bell />
                    <span>Threat Alerts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Education">
                  <Link href="#">
                    <BookOpen />
                    <span>Education</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Reporting">
                   <Link href="#">
                    <Megaphone />
                    <span>Community Reporting</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Tips">
                   <Link href="#">
                    <LifeBuoy />
                    <span>Resilience Tips</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Data">
                   <Link href="#">
                    <BarChart />
                    <span>Data Visualization</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-3 p-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://picsum.photos/100/100" data-ai-hint="profile picture" />
                <AvatarFallback>CG</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate font-semibold">Community Member</span>
                <span className="truncate text-xs text-muted-foreground">member@coastal.org</span>
              </div>
              <Link href="/login" className="ml-auto">
                <Button variant="ghost" size="icon" aria-label="Log Out">
                  <LogOut />
                </Button>
              </Link>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b bg-card/80 px-4 backdrop-blur-sm md:px-6">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1>
          </header>
          <main className="flex-1 overflow-auto bg-background/50 p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
