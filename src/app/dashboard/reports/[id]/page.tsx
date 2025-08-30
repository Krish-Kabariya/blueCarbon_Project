
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, BarChart, XAxis, YAxis, Tooltip, Area, Bar, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMemo } from "react";

const threatsByDayData = [
    { name: 'Mon', threats: 150 },
    { name: 'Tue', threats: 400 },
    { name: 'Wed', threats: 200 },
    { name: 'Thu', threats: 1200 },
    { name: 'Fri', threats: 800 },
    { name: 'Sat', threats: 400 },
    { name: 'Sun', threats: 600 },
];

const threatsBySeverityData = [
  { name: 'Critical', threats: 80 },
  { name: 'High', threats: 120 },
  { name: 'Medium', threats: 70 },
  { name: 'Low', threats: 150 },
];

const summaryData = [
    { label: 'Total Threats', value: '1,245', color: 'hsl(var(--destructive))' },
    { label: 'Blocked Attacks', value: '987', color: 'hsl(var(--primary))' },
    { label: 'Malware Incidents', value: '123', color: 'hsl(var(--chart-4))' },
    { label: 'Phishing Attempts', value: '87', color: 'hsl(var(--chart-1))' },
];

const maliciousIpData = [
  { ip: '192.168.1.14', threats: 15, country: 'USA' },
  { ip: '10.0.0.5', threats: 12, country: 'Canada' },
  { ip: '172.16.0.10', threats: 8, country: 'Mexico' },
  { ip: '203.0.113.7', threats: 5, country: 'Brazil' },
  { ip: '198.51.100.2', threats: 2, country: 'Argentina' },
];


export default function ReportDetailPage({ params }: { params: { id: string } }) {
    
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                    Day
                    </span>
                    <span className="font-bold text-muted-foreground">{label}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                    Threats
                    </span>
                    <span className="font-bold">
                    {payload[0].value}
                    </span>
                </div>
                </div>
            </div>
            )
        }

        return null
    }

  return (
    <div className="p-4 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Weekly Threat Summary</h1>
            <p className="text-muted-foreground">October 23 - October 29, 2023</p>
          </div>
        </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Threats Detected by Day</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] p-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={threatsByDayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="threats" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Threats by Severity</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] p-0">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={threatsBySeverityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: 'hsl(var(--muted) / 0.3)'}} contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}/>
                    <Legend iconType="circle" iconSize={8} />
                    <Bar dataKey="threats" fill="hsl(var(--destructive))" name="Critical" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="threats" fill="hsl(var(--chart-1))" name="High" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="threats" fill="hsl(var(--chart-4))" name="Medium" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="threats" fill="hsl(var(--chart-2))" name="Low" radius={[4, 4, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

         <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                {summaryData.map(item => (
                    <div key={item.label} className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full mr-3" style={{backgroundColor: item.color}} />
                        <span className="text-sm text-muted-foreground">{item.label}:</span>
                        <span className="ml-auto font-medium">{item.value}</span>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Top 5 Malicious IP Addresses</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>IP</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead className="text-right">Threats</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {maliciousIpData.map((row) => (
                    <TableRow key={row.ip}>
                        <TableCell className="font-medium">{row.ip}</TableCell>
                        <TableCell>{row.country}</TableCell>
                        <TableCell className="text-right">{row.threats}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
