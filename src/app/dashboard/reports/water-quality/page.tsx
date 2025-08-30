
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, BarChart, XAxis, YAxis, Tooltip, Area, Bar, ResponsiveContainer, Legend, CartesianGrid, LineChart, Line } from 'recharts';
import { Droplet, Thermometer, ListChecks, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const contaminantData = [
    { name: 'Q1', ContaminantA: 80, ContaminantB: 100, ContaminantC: 120, ContaminantD: 60 },
    { name: 'Q2', ContaminantA: 120, ContaminantB: 180, ContaminantC: 220, ContaminantD: 90 },
    { name: 'Q3', ContaminantA: 100, ContaminantB: 250, ContaminantC: 300, ContaminantD: 150 },
    { name: 'Q4', ContaminantA: 280, ContaminantB: 450, ContaminantC: 500, ContaminantD: 80 },
    { name: 'Q1', ContaminantA: 150, ContaminantB: 200, ContaminantC: 180, ContaminantD: 50 },
    { name: 'Q2', ContaminantA: 180, ContaminantB: 220, ContaminantC: 200, ContaminantD: 70 },
    { name: 'Q3', ContaminantA: 350, ContaminantB: 400, ContaminantC: 420, ContaminantD: 250 },
    { name: 'Q4', ContaminantA: 300, ContaminantB: 350, ContaminantC: 380, ContaminantD: 200 },
];

const chemicalLevelsData = [
  { name: 'Riverbend', level: 48 },
  { name: 'Lakeview', level: 32 },
  { name: 'Plant', level: 55 },
  { name: 'City Tap', level: 110 },
];

const sampleLogData = [
  { date: '2024-07-20', location: 'Riverbend Plant', contaminant: 'Nitrates', level: 5, status: 'Safe' },
  { date: '2024-07-20', location: 'Lakeview Res.', contaminant: 'Lead', level: 2, status: 'Safe' },
  { date: '2024-07-20', location: 'City Tap', contaminant: 'Chlorine', level: 1, status: 'Caution' },
  { date: '2024-07-19', location: 'Riverbend Plant', contaminant: 'Nitrates', level: 4, status: 'Safe' },
];

const StatusIndicator = ({ status }: { status: 'Safe' | 'Caution' | 'Danger' }) => {
    const color = {
        'Safe': 'bg-green-500',
        'Caution': 'bg-yellow-500',
        'Danger': 'bg-red-500',
    }[status] || 'bg-gray-500';
    return <div className={`h-2.5 w-2.5 rounded-full ${color}`} />;
}

export default function WaterQualityReportPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 bg-background text-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Droplet className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Q3 Water Quality Report</h1>
        </div>
        <Button>
          <Download className="mr-2" />
          Download Full Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contaminant Concentration Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={contaminantData}>
                <defs>
                    <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                    </linearGradient>
                     <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 1000]} />
                <Tooltip 
                    contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                    cursor={{fill: 'hsl(var(--muted) / 0.3)'}}
                />
                <Legend iconType="line" />
                <Line type="monotone" dataKey="ContaminantA" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} name="Contaminant A"/>
                <Line type="monotone" dataKey="ContaminantB" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} name="Contaminant B"/>
                <Line type="monotone" dataKey="ContaminantC" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} name="Contaminant C"/>
                <Line type="monotone" dataKey="ContaminantD" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={false} name="Contaminant D"/>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Chemical Levels by Site</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chemicalLevelsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                    contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                    cursor={{fill: 'hsl(var(--muted) / 0.3)'}}
                />
                <Bar dataKey="level" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Key Metrics</h3>
        <div className="grid gap-6 md:grid-cols-3">
            <Card>
                <CardContent className="flex items-center gap-4 p-4">
                    <div className="relative h-20 w-20">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path className="text-muted/20" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                            <path className="text-green-500" strokeDasharray="92, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">92%</div>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Overall Purity Score</p>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-muted p-4 rounded-lg">
                        <Thermometer className="h-8 w-8 text-foreground" />
                    </div>
                    <div>
                        <p className="text-muted-foreground">Average pH Level</p>
                        <p className="text-2xl font-bold">7.0 <span className="text-lg font-normal">(Neutral)</span></p>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-muted p-4 rounded-lg">
                        <ListChecks className="h-8 w-8 text-foreground" />
                    </div>
                    <div>
                        <p className="text-muted-foreground">Total Tests Performed</p>
                        <p className="text-2xl font-bold">350</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Detailed Sample Log</CardTitle>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Contaminant Type</TableHead>
                    <TableHead className="text-right">Level (PPM)</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sampleLogData.map((log, index) => (
                    <TableRow key={index}>
                        <TableCell>{log.date}</TableCell>
                        <TableCell className="font-medium">{log.location}</TableCell>
                        <TableCell>{log.contaminant}</TableCell>
                        <TableCell className="text-right">{log.level}</TableCell>
                        <TableCell className="flex justify-center items-center">
                            <StatusIndicator status={log.status as 'Safe' | 'Caution' | 'Danger'} />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}

