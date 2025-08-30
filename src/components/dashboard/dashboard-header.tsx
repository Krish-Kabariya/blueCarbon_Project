
"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, LogOut, Loader2, File, AlertCircle, Menu } from "lucide-react";
import { searchAction } from '@/app/actions';
import { FormEvent, useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SearchOutput } from '@/ai/flows/search';
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from '@/components/ui/popover';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';


export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchOutput | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User | null>(auth.currentUser);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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

  const handleSearch = async (event: FormEvent<HTMLFormElement> | string) => {
    if(typeof event !== 'string') {
      event.preventDefault();
    }
    
    const query = typeof event === 'string' ? event : (new FormData(event.currentTarget)).get('query') as string;

    if (!query.trim()) {
        setSearchResults(null);
        setIsPopoverOpen(false);
        return;
    }
    
    setIsSearching(true);
    setIsPopoverOpen(true);
    setSearchResults(null);

    const formData = new FormData();
    formData.append('query', query);
    
    try {
        const response = await searchAction(formData);

        if (response.error) {
            toast({
                variant: 'destructive',
                title: 'Search Failed',
                description: response.error,
            });
            setSearchResults({ results: [] });
        } else if (response.results) {
            setSearchResults(response.results);
            if (response.results.results.length === 1 && response.results.results[0].url) {
                router.push(response.results.results[0].url);
                setIsPopoverOpen(false);
            }
        }
    } catch (error) {
         toast({
            variant: 'destructive',
            title: 'An Error Occurred',
            description: 'Something went wrong during the search.',
        });
        setSearchResults({ results: [] });
    } finally {
        setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (query.trim().length > 2) {
      handleSearch(query);
    } else {
      setIsPopoverOpen(false);
      setSearchResults(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
    } catch (error) {
      console.error('Sign Out Error:', error);
      toast({
        variant: 'destructive',
        title: 'Sign Out Failed',
        description: 'Could not sign out. Please try again.',
      });
    }
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
        <div className="flex items-center gap-4">
            <SidebarTrigger>
              <Menu />
            </SidebarTrigger>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverAnchor asChild>
                <form onSubmit={handleSearch} className="relative" ref={searchInputRef}>
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      name="query" 
                      placeholder="Search..." 
                      className="w-full sm:w-48 md:w-72 pl-10" 
                      onChange={handleInputChange}
                      onFocus={() => {
                        if (searchResults && searchResults.results.length > 0) {
                          setIsPopoverOpen(true);
                        }
                      }}
                      autoComplete="off"
                    />
                </form>
              </PopoverAnchor>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                {isSearching && (
                  <div className="p-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching...
                  </div>
                )}
                {!isSearching && searchResults && (
                  <div className="flex flex-col">
                    {searchResults.results.length > 0 ? (
                      searchResults.results.map((result, index) => (
                        <Link 
                          key={index}
                          href={result.url} 
                          className="flex items-center gap-3 px-4 py-2 hover:bg-muted"
                          onClick={() => setIsPopoverOpen(false)}
                        >
                          <div className="bg-muted p-1.5 rounded-md">
                            <File className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{result.title}</p>
                            <p className="text-xs text-muted-foreground">{result.type}</p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-4 flex items-center gap-2 text-sm text-muted-foreground">
                         <AlertCircle className="h-4 w-4" />
                        No results found.
                      </div>
                    )}
                  </div>
                )}
              </PopoverContent>
            </Popover>
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
                            <AvatarImage src={user?.photoURL ?? "https://picsum.photos/100/100"} alt={user?.displayName ?? ""} />
                            <AvatarFallback>{user?.displayName?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user?.displayName ?? 'User'}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user?.email ?? 'user@example.com'}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
  );
}
