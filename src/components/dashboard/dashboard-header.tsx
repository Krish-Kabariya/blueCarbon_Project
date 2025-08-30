
"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, LogOut, Loader2, File, AlertCircle, Menu, MapPin } from "lucide-react";
import { searchAction, suggestSearchAction } from '@/app/actions';
import { FormEvent, useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SearchOutput } from '@/ai/flows/search';
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from '@/components/ui/popover';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { ThemeToggle } from '../ui/theme-toggle';
import { useDebounce } from 'use-debounce';


export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isSearching, setIsSearching] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchOutput | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);


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

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      setSuggestions([]);
      setIsPopoverOpen(false);
      return;
    }
    
    setIsSearching(true);
    setIsPopoverOpen(true);
    setSearchResults(null);
    setSuggestions([]);

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

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchQuery);
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
    setIsPopoverOpen(false);
  }

  const handleFetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsPopoverOpen(false);
      return;
    }

    setIsSuggesting(true);
    setSearchResults(null);
    setIsPopoverOpen(true);
    
    const formData = new FormData();
    formData.append('query', query);

    try {
      const response = await suggestSearchAction(formData);
      if (response.suggestions) {
        setSuggestions(response.suggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      setSuggestions([]);
    } finally {
      setIsSuggesting(false);
    }
  };
  
  useEffect(() => {
    if (debouncedSearchQuery) {
      handleFetchSuggestions(debouncedSearchQuery);
    } else {
      setSuggestions([]);
      setSearchResults(null);
      setIsPopoverOpen(false);
    }
  }, [debouncedSearchQuery]);


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
  
  const showPopover = isPopoverOpen && (isSearching || isSuggesting || (searchResults && searchResults.results.length > 0) || suggestions.length > 0);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
        <div className="flex items-center gap-4 md:hidden">
            <SidebarTrigger>
              <Menu />
            </SidebarTrigger>
        </div>

        <div className="flex-1 flex justify-center">
            <Popover open={showPopover} onOpenChange={setIsPopoverOpen}>
              <PopoverAnchor asChild>
                <form onSubmit={handleFormSubmit} className="relative w-full max-w-lg" ref={searchInputRef}>
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      name="query" 
                      placeholder="Search for pages or cities..." 
                      className="w-full pl-10" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => {
                        if (searchQuery) {
                           setIsPopoverOpen(true)
                        }
                      }}
                      autoComplete="off"
                    />
                </form>
              </PopoverAnchor>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                {(isSearching || isSuggesting) && (
                  <div className="p-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching...
                  </div>
                )}
                {!isSearching && !isSuggesting && searchResults && (
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
                      (!suggestions || suggestions.length === 0) &&
                      <div className="p-4 flex items-center gap-2 text-sm text-muted-foreground">
                         <AlertCircle className="h-4 w-4" />
                        No results found.
                      </div>
                    )}
                  </div>
                )}
                {!isSearching && !isSuggesting && suggestions.length > 0 && (
                  <div className="flex flex-col">
                     {suggestions.map((suggestion, index) => (
                        <button 
                          key={index}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-muted text-left w-full"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="bg-muted p-1.5 rounded-md">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{suggestion}</p>
                            <p className="text-xs text-muted-foreground">City</p>
                          </div>
                        </button>
                      ))}
                  </div>
                )}

              </PopoverContent>
            </Popover>
        </div>

        <div className="flex items-center gap-2">
            <ThemeToggle />
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
