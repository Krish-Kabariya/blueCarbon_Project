
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import dynamic from 'next/dynamic';
import { useMemo } from "react";

const threatFrequencyData = [
  { month: 'Jan', alerts: 45 },
  { month: 'Feb', alerts: 55 },
  { month: 'Mar', alerts: 50 },
  { month: 'Apr', alerts: 80 },
  { month: 'May', alerts: 60 },
  { month: 'Jun', alerts: 40 },
  { month: 'Jul', alerts: 95 },
  { month: 'Aug', alerts: 52 },
  { month: 'Sep', alerts: 20 },
  { month: 'Oct', alerts: 15 },
  { month: 'Nov', alerts: 10 },
  { month: 'Dec', alerts: 18 },
];

const threatTypeData = [
  { name: 'Illegal Fishing', value: 400 },
  { name: 'Pollution', value: 300 },
  { name: 'Smuggling', value: 300 },
  { name: 'High Alerts', value: 200 },
  { name: 'Nuisance', value: 100 },
  { name: 'Poaching', value: 150 },
];
const COLORS = ['#22c55e', '#f97316', '#8b5cf6', '#3b82f6', '#facc15', '#ef4444'];

const districts = [
    { id: 'kutch', name: 'Kutch', color: 'bg-blue-500' },
    { id: 'jamnagar', name: 'Jamnagar', color: 'bg-purple-500' },
    { id: 'porbandar', name: 'Porbandar', color: 'bg-yellow-500' },
    { id: 'dwarka', name: 'Devbhoomi Dwarka', color: 'bg-orange-500' },
    { id: 'junagadh', name: 'Junagadh', color: 'bg-red-500' },
    { id: 'somnath', name: 'Gir Somnath', color: 'bg-green-500' },
    { id: 'amreli', name: 'Amreli', color: 'bg-teal-500' },
    { id: 'sand-mining', name: 'Illegal Sand Mining', color: 'bg-cyan-500' },
    { id: 'navsari', name: 'Navsari', color: 'bg-indigo-500' },
    { id: 'valsad', name: 'Valsad', color: 'bg-gray-500' },
];

const threatsByDistrictData = [
  { name: 'Kutch', "Illegal Fishing": 40, "Pollution": 30, "Smuggling": 20, "High Alerts": 10, "Nuisance": 5, "Poaching": 15 },
  { name: 'Jamnagar', "Illegal Fishing": 35, "Pollution": 25, "Smuggling": 15, "High Alerts": 20, "Nuisance": 10, "Poaching": 5 },
  { name: 'Porbandar', "Illegal Fishing": 50, "Pollution": 40, "Smuggling": 25, "High Alerts": 15, "Nuisance": 12, "Poaching": 8 },
  { name: 'Dwarka', "Illegal Fishing": 20, "Pollution": 15, "Smuggling": 30, "High Alerts": 25, "Nuisance": 18, "Poaching": 22 },
  { name: 'Junagadh', "Illegal Fishing": 60, "Pollution": 50, "Smuggling": 40, "High Alerts": 30, "Nuisance": 20, "Poaching": 25 },
  { name: 'Somnath', "Illegal Fishing": 30, "Pollution": 20, "Smuggling": 10, "High Alerts": 5, "Nuisance": 2, "Poaching": 3 },
];

export function DataVisualization() {
    
    const LeafletMap = useMemo(() => dynamic(() => import('@/components/dashboard/leaflet-map'), {
        ssr: false,
        loading: () => <div className="flex h-full w-full items-center justify-center bg-muted"><p>Loading Map...</p></div>
    }), []);

  return (
    <div className="p-4 md:p-6 space-y-6">
        <h1 className="text-3xl font-bold">Data Visualization</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <aside className="lg:col-span-1 flex flex-col gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Date Range</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                        <Button variant="secondary" className="flex-1">Last 30 days</Button>
                        <Button variant="ghost" className="flex-1">Last 6 months</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>District</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {districts.map(district => (
                             <div key={district.id} className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-sm ${district.color}`}></div>
                                <Label htmlFor={district.id} className="flex-1 font-normal">{district.name}</Label>
                                <Checkbox id={district.id} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Threat Type Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={threatTypeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {threatTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                                />
                                <Legend iconType="circle" formatter={(value, entry) => <span className="text-foreground">{value}</span>} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </aside>
            
            {/* Main Content */}
            <main className="lg:col-span-3 flex flex-col gap-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Threat Frequency by Month</CardTitle>
                        </CardHeader>
                        <CardContent className="h-80">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={threatFrequencyData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                                    <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip
                                        contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                                        cursor={{fill: 'hsl(var(--muted) / 0.3)'}}
                                    />
                                    <Legend iconType="square" iconSize={10} />
                                    <Bar dataKey="alerts" fill="hsl(var(--primary))" name="Alerts" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Threats by Selected District</CardTitle>
                        </CardHeader>
                        <CardContent className="h-80">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={threatsByDistrictData} layout="vertical" stackOffset="expand">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border) / 0.5)" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                                        cursor={{fill: 'hsl(var(--muted) / 0.3)'}}
                                    />
                                    <Legend iconType="circle" iconSize={10} />
                                    <Bar dataKey="Illegal Fishing" stackId="a" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="Pollution" stackId="a" fill={COLORS[1]} />
                                    <Bar dataKey="Smuggling" stackId="a" fill={COLORS[2]} />
                                    <Bar dataKey="High Alerts" stackId="a" fill={COLORS[3]} />
                                    <Bar dataKey="Nuisance" stackId="a" fill={COLORS[4]} />
                                    <Bar dataKey="Poaching" stackId="a" fill={COLORS[5]} radius={[0, 0, 4, 4]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Historical Alert Hotspots</CardTitle>
                    </CardHeader>
                    <CardContent className="aspect-video p-0 rounded-b-lg overflow-hidden">
                        <LeafletMap />
                    </CardContent>
                </Card>
            </main>
        </div>
    </div>
  );
}

    