
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertTriangle,
  ChevronDown,
  Cyclone,
  LocateIcon,
  Plus,
  Search,
  Thermometer,
  Waves,
  Wind,
} from 'lucide-react';

export default function ThreatAlertsPage() {
    const [selectedAlert, setSelectedAlert] = useState('Hurricane Delta Warning');

    const alerts = {
        "Hurricane Warning": [
            { id: "h-1", name: "Hurricane Delta Warning", location: "Coastal Louisiana", duration: "Active until Oct 15, 2024", severity: "Critical" },
            { id: "h-2", name: "Hurricane Orleana", location: "Oregon", duration: "Active for 24 hours", severity: "High" },
            { id: "h-3", name: "Hurricane Gotto", location: "Southern Florida", duration: "Active for 12 hours", severity: "High" },
        ],
        "Tsunami & Storm Surge": [
            { id: "t-1", name: "Tsunami Alert", location: "Pacific Coast", duration: "Active for 6 hours", severity: "Warning" },
            { id: "t-2", name: "Storm Surge", location: "East Coast", duration: "Active for 48 hours", severity: "Watch" },
        ],
        "Severe Weather": [
            { id: "s-1", name: "Rotational Warning", location: "Louisiana", duration: "Active for 2 hours", severity: "Warning" },
            { id: "s-2", name: "Gale Warning", location: "Great Lakes", duration: "Active for 24 hours", severity: "Advisory" },
        ]
    };

    const getSeverityColor = (severity: string) => {
        switch (severity.toLowerCase()) {
          case 'critical': return 'bg-red-700';
          case 'high': return 'bg-red-500';
          case 'warning': return 'bg-orange-500';
          case 'watch': return 'bg-yellow-500';
          case 'advisory': return 'bg-gray-400';
          default: return 'bg-gray-300';
        }
    };
    
    const renderSeverityBar = (level: number, color: string) => (
        <div key={level} className={`h-1.5 flex-1 rounded-full ${color}`} />
    );


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
                    <h2 className="text-lg font-semibold">Active Alert</h2>
                </div>
            </div>

            <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3']} className="w-full px-2">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base font-semibold"><LocateIcon className="mr-2 h-5 w-5" />Location</AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-2">
                         <Button variant="outline" className="w-full justify-between">Pacific Coast <ChevronDown className="h-4 w-4" /></Button>
                         <div className="flex items-center gap-2 text-muted-foreground"><Waves className="h-5 w-5" /> Atlantic Coast</div>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-2">
                    <AccordionTrigger className="text-base font-semibold"><Wind className="mr-2 h-5 w-5" />Threat Type</AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 text-primary"><AlertTriangle className="h-5 w-5" /> Hurricane</div>
                        <div className="flex items-center gap-2 text-muted-foreground"><Waves className="h-5 w-5" /> Tsunami High</div>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-3">
                    <AccordionTrigger className="text-base font-semibold"><Thermometer className="mr-2 h-5 w-5" />Severity</AccordionTrigger>
                    <AccordionContent className="pt-2">
                        <p className="text-muted-foreground">Filter by severity level.</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            
            <div className="flex-1 space-y-4 overflow-y-auto px-2">
                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="flex items-center justify-between text-base">
                            Hurricane Warning <Button variant="ghost" size="icon" className="h-6 w-6"><Plus /></Button>
                        </CardTitle>
                        <div className="flex gap-1 pt-1">
                            {renderSeverityBar(1, 'bg-red-500')}
                            {renderSeverityBar(2, 'bg-red-500')}
                            {renderSeverityBar(3, 'bg-orange-500')}
                            {renderSeverityBar(4, 'bg-orange-500')}
                            {renderSeverityBar(5, 'bg-gray-300')}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2 p-4 pt-0">
                       {alerts["Hurricane Warning"].map(alert => (
                           <div key={alert.id} className="text-sm text-muted-foreground">{alert.location}</div>
                       ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="flex items-center justify-between text-base">
                           Hurricane Alert <Button variant="ghost" size="icon" className="h-6 w-6"><Plus /></Button>
                        </CardTitle>
                         <div className="flex gap-1 pt-1">
                             {renderSeverityBar(1, 'bg-yellow-500')}
                             {renderSeverityBar(2, 'bg-yellow-500')}
                             {renderSeverityBar(3, 'bg-gray-300')}
                             {renderSeverityBar(4, 'bg-gray-300')}
                             {renderSeverityBar(5, 'bg-gray-300')}
                        </div>
                    </CardHeader>
                     <CardContent className="space-y-3 p-4 pt-0">
                       <div className="text-sm text-muted-foreground">Tsunami Surge</div>
                       <div className="text-sm text-muted-foreground">Storm Surge</div>
                       <p className="text-xs text-muted-foreground/80">Active for 24 hours</p>
                    </CardContent>
                </Card>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex-col gap-4 pr-4">
            <header className="flex items-center justify-between py-2">
                <h1 className="text-xl font-bold">Active Alert</h1>
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
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/100/100" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            <Card className="w-full">
                <CardContent className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <Card className="overflow-hidden bg-card/50">
                             <CardHeader className="flex flex-row items-start gap-4 space-y-0 bg-red-700/10 p-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-700 text-white">
                                    <Cyclone size={32} />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-lg">Hurricane Delta Warning</CardTitle>
                                    <p className="text-sm text-muted-foreground">Coastal Louisiana</p>
                                    <p className="text-xs text-muted-foreground">Active until Oct 15, 2024, 10:00 AM CDT</p>
                                </div>
                                <div className="text-center">
                                    <div className="rounded-full border-2 border-red-700 px-3 py-1 text-sm font-bold text-red-700">
                                      Critical
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
                                    <Image
                                        src="https://picsum.photos/800/450"
                                        alt="Map of Hurricane Delta"
                                        layout="fill"
                                        objectFit="cover"
                                        data-ai-hint="weather map hurricane"
                                    />
                                </div>
                                <div className="mt-4 space-y-2 text-sm">
                                    <p><strong>Issued by:</strong> National Weather Service</p>
                                    <p><strong>Effective until:</strong> Oct 15, 2024, 10:00 AM CDT</p>
                                </div>

                                <Tabs defaultValue="actions" className="mt-4 w-full">
                                    <TabsList>
                                        <TabsTrigger value="overview">Overview</TabsTrigger>
                                        <TabsTrigger value="actions">Recommended Actions</TabsTrigger>
                                        <TabsTrigger value="impacts">Potential Impacts</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="overview" className="prose prose-sm max-w-none text-muted-foreground pt-2">
                                        <p>A life-threatening storm surge is expected. Widespread flooding, hurricane-force winds, and heavy rainfall are likely. Conditions will deteriorate rapidly.</p>
                                    </TabsContent>
                                    <TabsContent value="actions" className="prose prose-sm max-w-none text-muted-foreground pt-2">
                                       <ul className="list-disc pl-5">
                                            <li>Evacuate if you are in a designated evacuation zone.</li>
                                            <li>Secure all outdoor property or bring it inside.</li>
                                            <li>Have a disaster kit ready with food, water, and medical supplies.</li>
                                            <li>Stay tuned to local media for the latest updates.</li>
                                        </ul>
                                    </TabsContent>
                                     <TabsContent value="impacts" className="prose prose-sm max-w-none text-muted-foreground pt-2">
                                         <ul className="list-disc pl-5">
                                            <li>Catastrophic damage to homes and infrastructure.</li>
                                            <li>Power outages could last for weeks or months.</li>
                                            <li>Major beach erosion and coastal road washouts.</li>
                                        </ul>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                     <div className="space-y-4 lg:col-span-2">
                        <h3 className="font-semibold">Other Alerts</h3>
                        {/* Placeholder for other alerts list */}
                        <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
                          <p className="text-muted-foreground">Other alerts will be listed here.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}

    