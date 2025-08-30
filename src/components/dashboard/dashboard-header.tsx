
"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Settings, LogOut, Loader2 } from "lucide-react";
import { searchAction } from '@/app/actions';
import { FormEvent, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isSearching, setIsSearching] = useState(false);

  const getPageTitle = () => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/dashboard/data-visualization':
        return 'Data Visualization';
      case '/dashboard/threat-alerts':
        return 'Threat Alerts';
      case '/dashboard/map':
        return 'Interactive Map';
      case '/awareness':
        return 'Awareness';
      default:
        if (pathname.startsWith('/dashboard/reports')) {
          return 'Reports';
        }
        return 'CoastalWatch';
    }
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSearching(true);
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;

    if (!query.trim()) {
        setIsSearching(false);
        return;
    }
    
    try {
        const response = await searchAction(formData);

        if (response.error) {
            toast({
                variant: 'destructive',
                title: 'Search Failed',
                description: response.error,
            });
        } else if (response.results?.results && response.results.results.length > 0) {
            // For simplicity, navigate to the first result
            const firstResult = response.results.results[0];
            if(firstResult.url) {
                router.push(firstResult.url);
            } else {
                 toast({
                    title: 'No Results Found',
                    description: 'Your search did not return any results.',
                });
            }
        } else {
             toast({
                title: 'No Results Found',
                description: 'Your search did not return any results.',
            });
        }
    } catch (error) {
         toast({
            variant: 'destructive',
            title: 'An Error Occurred',
            description: 'Something went wrong during the search.',
        });
    } finally {
        setIsSearching(false);
    }
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
        <SidebarTrigger className="md:hidden" />
        <div className="flex-1">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
            <form onSubmit={handleSearch} className="relative hidden sm:block">
                {isSearching ? (
                    <Loader2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin" />
                ) : (
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                )}
                <Input name="query" placeholder="Search..." className="w-full sm:w-48 md:w-72 pl-10" disabled={isSearching} />
            </form>
             <Select defaultValue="high">
                <SelectTrigger className="w-28 hidden md:flex">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                     <SelectItem value="watch">Watch</SelectItem>
                    <SelectItem value="advisory">Advisory</SelectItem>
                </SelectContent>
            </Select>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/100/100" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">User</p>
                            <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Notification Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
  );
}
