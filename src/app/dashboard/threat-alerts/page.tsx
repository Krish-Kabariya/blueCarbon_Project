
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  AlertTriangle,
  ChevronDown,
  Tornado,
  LocateIcon,
  Plus,
  Search,
  Thermometer,
  Waves,
  Wind,
  Info,
  ShieldAlert,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Severity = "Critical" | "High" | "Warning" | "Watch" | "Advisory";

interface Alert {
    id: string;
    name: string;
    location: string;
    duration: string;
    severity: Severity;
    Icon: React.ElementType;
    overview: string;
    actions: string[];
    impacts: string[];
    issuedBy: string;
    mapImage: string;
}

const alertsData: Record<string, Alert[]> = {
    "Hurricane Warning": [
        {
            id: "h-1",
            name: "Hurricane Delta Warning",
            location: "Coastal Louisiana",
            duration: "Active until Oct 15, 2024",
            severity: "Critical",
            Icon: Tornado,
            overview: "A life-threatening storm surge is expected. Widespread flooding, hurricane-force winds, and heavy rainfall are likely. Conditions will deteriorate rapidly.",
            actions: [
                "Evacuate if you are in a designated evacuation zone.",
                "Secure all outdoor property or bring it inside.",
                "Have a disaster kit ready with food, water, and medical supplies.",
                "Stay tuned to local media for the latest updates.",
            ],
            impacts: [
                "Catastrophic damage to homes and infrastructure.",
                "Power outages could last for weeks or months.",
                "Major beach erosion and coastal road washouts.",
            ],
            issuedBy: "National Weather Service",
            mapImage: "https://picsum.photos/800/450?random=1",
        },
        {
            id: "h-2",
            name: "Hurricane Orleana",
            location: "Oregon",
            duration: "Active for 24 hours",
            severity: "High",
            Icon: Tornado,
            overview: "Hurricane Orleana is approaching the Oregon coast, bringing dangerous winds and heavy rain.",
            actions: ["Board up windows.", "Stock up on supplies.", "Follow local news for updates."],
            impacts: ["Potential for widespread power outages.", "Risk of flash flooding in low-lying areas."],
            issuedBy: "National Hurricane Center",
            mapImage: "https://picsum.photos/800/450?random=2",
        },
    ],
    "Tsunami & Storm Surge": [
        {
            id: "t-1",
            name: "Tsunami Alert",
            location: "Pacific Coast",
            duration: "Active for 6 hours",
            severity: "Warning",
            Icon: Waves,
            overview: "A tsunami may have been generated. Monitor for official updates.",
            actions: ["Move to higher ground immediately.", "Stay away from beaches and low-lying coastal areas."],
            impacts: ["Dangerous coastal flooding.", "Strong and unusual currents."],
            issuedBy: "Pacific Tsunami Warning Center",
            mapImage: "https://picsum.photos/800/450?random=3",
        },
        {
            id: "t-2",
            name: "Storm Surge Watch",
            location: "East Coast",
            duration: "Active for 48 hours",
            severity: "Watch",
            Icon: Waves,
            overview: "Possibility of life-threatening inundation from rising water moving inland from the shoreline.",
            actions: ["Review your evacuation plan.", "Be ready to take action if a warning is issued."],
            impacts: ["Coastal roads may become impassable.", "Minor to moderate property damage possible."],
            issuedBy: "National Weather Service",
            mapImage: "https://picsum.photos/800/450?random=4",
        },
    ],
    "Severe Weather": [
        {
            id: "s-1",
            name: "Gale Warning",
            location: "Great Lakes",
            duration: "Active for 24 hours",
            severity: "Advisory",
            Icon: Wind,
            overview: "Strong winds expected over the Great Lakes, creating hazardous conditions for small craft.",
            actions: ["Boaters should remain in port.", "Secure any loose objects near the shore."],
            impacts: ["Rough seas and high waves.", "Difficult navigation for vessels."],
            issuedBy: "National Weather Service",
            mapImage: "https://picsum.photos/800/450?random=5",
        },
    ]
};

const allAlerts: Alert[] = Object.values(alertsData).flat();

export default function ThreatAlertsPage() {
    const [selectedAlertId, setSelectedAlertId] = useState<string>("h-1");
    const selectedAlert = allAlerts.find(a => a.id === selectedAlertId) || allAlerts[0];

    const getSeverityStyles = (severity: Severity): {
        barColor: string;
        bgColor: string;
        textColor: string;
        borderColor: string;
        Icon: React.ElementType;
    } => {
        switch (severity) {
          case 'Critical': return { barColor: 'bg-red-700', bgColor: 'bg-red-700/10', textColor: 'text-red-700', borderColor: 'border-red-700', Icon: Tornado };
          case 'High': return { barColor: 'bg-red-500', bgColor: 'bg-red-500/10', textColor: 'text-red-500', borderColor: 'border-red-500', Icon: ShieldAlert };
          case 'Warning': return { barColor: 'bg-orange-500', bgColor: 'bg-orange-500/10', textColor: 'text-orange-500', borderColor: 'border-orange-500', Icon: AlertTriangle };
          case 'Watch': return { barColor: 'bg-yellow-500', bgColor: 'bg-yellow-500/10', textColor: 'text-yellow-500', borderColor: 'border-yellow-500', Icon: Info };
          case 'Advisory': return { barColor: 'bg-blue-500', bgColor: 'bg-blue-500/10', textColor: 'text-blue-500', borderColor: 'border-blue-500', Icon: ShieldAlert };
          default: return { barColor: 'bg-gray-300', bgColor: 'bg-gray-300/10', textColor: 'text-gray-500', borderColor: 'border-gray-300', Icon: Info };
        }
    };
    
    const severityStyles = getSeverityStyles(selectedAlert.severity);

  return (
    <div className="flex h-[calc(100vh-2rem)] w-full gap-6">
        {/* Left Sidebar */}
        <aside className="hidden md:flex w-full max-w-xs flex-col gap-4">
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/100/100" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg font-semibold">Active Alerts</h2>
                </div>
            </div>

            <Accordion type="multiple" defaultValue={['hurricane-warning', 'tsunami-storm-surge', 'severe-weather']} className="w-full px-2">
                {Object.entries(alertsData).map(([groupName, alerts]) => (
                     <AccordionItem key={groupName} value={groupName.toLowerCase().replace(/ & /g, '-')}>
                        <AccordionTrigger className="text-base font-semibold">{groupName}</AccordionTrigger>
                        <AccordionContent className="space-y-1 pt-1">
                            {alerts.map(alert => (
                               <Button 
                                 key={alert.id} 
                                 variant="ghost" 
                                 className={cn(
                                    "w-full justify-start h-auto flex-col items-start p-2",
                                    selectedAlertId === alert.id && "bg-muted"
                                 )}
                                 onClick={() => setSelectedAlertId(alert.id)}
                                >
                                    <div className="font-semibold">{alert.name}</div>
                                    <div className="text-xs text-muted-foreground">{alert.location}</div>
                               </Button>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-4 pr-4">
            <header className="flex items-center justify-between py-2">
                <h1 className="text-xl font-bold">{selectedAlert.name}</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search" className="w-48 pl-10" />
                    </div>
                     <Select defaultValue="high">
                        <SelectTrigger className="w-28">
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
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/profile">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>My Profile</span>
                                </Link>
                            </DropdownMenuItem>
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

            <Card className="w-full flex-1">
                <CardContent className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-5 h-full">
                    <div className="lg:col-span-3">
                        <Card className={cn("overflow-hidden bg-card/50 h-full", severityStyles.bgColor)}>
                             <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
                                <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg text-white", getSeverityStyles(selectedAlert.severity).barColor)}>
                                    <selectedAlert.Icon size={32} />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{selectedAlert.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{selectedAlert.location}</p>
                                    <p className="text-xs text-muted-foreground">{selectedAlert.duration}</p>
                                </div>
                                <div className="text-center">
                                    <div className={cn("rounded-full border-2 px-3 py-1 text-sm font-bold", severityStyles.textColor, severityStyles.borderColor)}>
                                      {selectedAlert.severity}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
                                    <Image
                                        src={selectedAlert.mapImage}
                                        alt={`Map of ${selectedAlert.name}`}
                                        layout="fill"
                                        objectFit="cover"
                                        data-ai-hint="weather map hurricane"
                                    />
                                </div>
                                <div className="mt-4 space-y-2 text-sm">
                                    <p><strong>Issued by:</strong> {selectedAlert.issuedBy}</p>
                                    <p><strong>Effective until:</strong> {selectedAlert.duration}</p>
                                </div>

                                <Tabs defaultValue="actions" className="mt-4 w-full">
                                    <TabsList>
                                        <TabsTrigger value="overview">Overview</TabsTrigger>
                                        <TabsTrigger value="actions">Recommended Actions</TabsTrigger>
                                        <TabsTrigger value="impacts">Potential Impacts</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="overview" className="prose prose-sm max-w-none text-muted-foreground pt-2">
                                        <p>{selectedAlert.overview}</p>
                                    </TabsContent>
                                    <TabsContent value="actions" className="prose prose-sm max-w-none text-muted-foreground pt-2">
                                       <ul className="list-disc pl-5">
                                           {selectedAlert.actions.map((action, i) => <li key={i}>{action}</li>)}
                                        </ul>
                                    </TabsContent>
                                     <TabsContent value="impacts" className="prose prose-sm max-w-none text-muted-foreground pt-2">
                                         <ul className="list-disc pl-5">
                                             {selectedAlert.impacts.map((impact, i) => <li key={i}>{impact}</li>)}
                                        </ul>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                     <div className="space-y-4 lg:col-span-2">
                        <h3 className="font-semibold">Other Alerts</h3>
                         <div className="space-y-2">
                            {allAlerts.filter(a => a.id !== selectedAlertId).map(alert => (
                                <Card key={alert.id} className="hover:bg-muted/50 cursor-pointer" onClick={() => setSelectedAlertId(alert.id)}>
                                    <CardContent className="p-3 flex items-center gap-3">
                                        <div className={cn("w-2 h-12 rounded-full", getSeverityStyles(alert.severity).barColor)}></div>
                                        <div>
                                            <div className="font-semibold text-sm">{alert.name}</div>
                                            <div className="text-xs text-muted-foreground">{alert.location}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
