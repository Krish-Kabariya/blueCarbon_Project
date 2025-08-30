
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, BarChart, XAxis, YAxis, Tooltip, Area, Bar, ResponsiveContainer, Legend, CartesianGrid, Label } from 'recharts';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const damageByCategoryData = [
  { name: '0', Infrastructure: 80, Residential: 150 },
  { name: '1', Infrastructure: 70, Residential: 100 },
  { name: '2', Infrastructure: 60, Residential: 80 },
  { name: '3', Infrastructure: 50, Commercial: 200 },
  { name: '4', Infrastructure: 40, Manufacturing: 280 },
  { name: '5', Infrastructure: 30, Residential: 220 },
  { name: '6', Infrastructure: 80, Agriculture: 1300 },
];

const windSpeedData = [
    { time: 0, speed: 10 }, { time: 25, speed: 20 },
    { time: 50, speed: 15 }, { time: 75, speed: 30 },
    { time: 100, speed: 80 }, { time: 125, speed: 120 },
    { time: 150, speed: 180 }, { time: 175, speed: 220 },
    { time: 200, speed: 140 }, { time: 225, speed: 80 },
    { time: 250, speed: 40 }, { time: 275, speed: 20 },
];

export default function HurricaneImpactPage() {

  return (
    <div className="p-4 md:p-8 space-y-6 bg-background text-foreground">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Hurricane Impact Analysis</h1>
                </div>
            </div>
            {/* Header part from image can be added here */}
        </div>
        
        <Card>
            <CardContent className="p-0">
                <Image 
                    src="https://picsum.photos/1200/400"
                    alt="Hurricane Map"
                    width={1200}
                    height={400}
                    className="w-full h-auto rounded-t-lg"
                    data-ai-hint="hurricane satellite view"
                />
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Damage by Category</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={damageByCategoryData} stackOffset="sign">
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip 
                                contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                                cursor={{fill: 'hsl(var(--muted) / 0.3)'}}
                            />
                            <Legend />
                            <Bar dataKey="Infrastructure" fill="hsl(var(--chart-2))" stackId="stack" />
                            <Bar dataKey="Residential" fill="hsl(var(--chart-1))" stackId="stack" />
                            <Bar dataKey="Commercial Properties" fill="hsl(var(--chart-3))" stackId="stack" />
                            <Bar dataKey="Manufacturing" fill="hsl(var(--chart-4))" stackId="stack" />
                            <Bar dataKey="Agriculture" fill="hsl(var(--chart-5))" stackId="stack" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Wind Speed Over Time</CardTitle>
                </CardHeader>
                 <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={windSpeedData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                            <defs>
                                <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorWind2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="time">
                                <Label value="Wind Speed Over Time" offset={0} position="insideBottom" />
                            </XAxis>
                            <YAxis />
                            <Tooltip 
                                contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                                cursor={{fill: 'hsl(var(--muted) / 0.3)'}}
                            />
                            <Area type="monotone" dataKey="speed" stroke="hsl(var(--chart-1))" fill="url(#colorWind)" />
                             <Area type="monotone" dataKey={(d) => d.speed * 0.6} stroke="hsl(var(--primary))" fill="url(#colorWind2)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 items-center text-center">
                <div>
                    <p className="text-sm text-muted-foreground">Total Estimated Damage</p>
                    <p className="text-3xl font-bold">$15.2 Billion</p>
                </div>
                <Separator orientation="vertical" className="h-16 mx-auto hidden md:block" />
                <Separator className="my-4 md:hidden"/>
                <div>
                    <p className="text-sm text-muted-foreground">Affected Population</p>
                    <p className="text-3xl font-bold">2.3 Million</p>
                </div>
                 <Separator orientation="vertical" className="h-16 mx-auto hidden md:block" />
                 <Separator className="my-4 md:hidden"/>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground">Estimated Recovery Time</p>
                     <div className="flex items-center gap-4 mt-2">
                        <Shield className="w-10 h-10 text-primary" />
                        <p className="text-3xl font-bold">6 - 8 Months</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
