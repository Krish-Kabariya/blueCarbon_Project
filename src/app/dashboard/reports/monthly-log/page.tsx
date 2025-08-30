
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { ArrowLeft, Search, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const alertData = Array.from({ length: 50 }, (_, i) => ({
  time: i,
  high: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 70 : null,
  medium: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 40 : null,
  low: Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 10 : null,
}));

const commonThreats = [
    { name: 'Malware', value: 59, color: 'hsl(var(--destructive))' },
    { name: 'Phishing Attempt', value: 68, color: 'hsl(var(--chart-4))' },
    { name: 'Malware', value: 20, color: 'hsl(var(--destructive))' },
    { name: 'Unauthorized Access', value: 7, color: 'hsl(var(--muted-foreground))' },
];

const logData = [
  { timestamp: 'Aldivor', sourceIp: 'Phishing Attorım', destIp: '1051/2000', threatType: '478150', severity: 'high', actionTaken: '100%' },
  { timestamp: 'Aldivor', sourceIp: 'Phishing Attorım', destIp: '2021/2000', threatType: '471350', severity: 'medium', actionTaken: '154%' },
  { timestamp: 'Aldivor', sourceIp: 'Phishing Attornm', destIp: '2021/2000', threatType: '471550', severity: 'high', actionTaken: '160%' },
  { timestamp: 'Aldivor', sourceIp: 'Phishing Attorım', destIp: '2031/2000', threatType: '473450', severity: 'medium', actionTaken: '126%' },
];

const SeverityDot = ({ severity }: { severity: string }) => {
    const color = {
        high: 'bg-red-500',
        medium: 'bg-yellow-500',
        low: 'bg-green-500'
    }[severity] || 'bg-gray-500';
    return <div className={`h-2.5 w-2.5 rounded-full ${color}`} />;
}

export default function MonthlyLogPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Monthly Alert Log</h1>
      </div>

      <Card className="lg:col-span-4">
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-2 h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={alertData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={false} />
                        <YAxis axisLine={false} tickLine={false} tick={false} />
                        <Tooltip
                            contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                            labelStyle={{display: 'none'}}
                            itemStyle={{textTransform: 'capitalize'}}
                        />
                        <Legend iconType="circle" iconSize={8} />
                        <Line type="monotone" dataKey="high" stroke="hsl(var(--destructive))" dot={false} strokeWidth={2} connectNulls />
                        <Line type="monotone" dataKey="medium" stroke="hsl(var(--chart-4))" dot={false} strokeWidth={2} connectNulls />
                        <Line type="monotone" dataKey="low" stroke="hsl(var(--chart-2))" dot={false} strokeWidth={2} connectNulls />
                    </LineChart>
                </ResponsiveContainer>
                <Slider defaultValue={[33]} max={100} step={1} className="mt-4" />
            </div>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <h3 className="font-semibold mb-4">Most Common Threats</h3>
                    <ul className="space-y-3">
                        {commonThreats.map((threat, i) => (
                           <li key={i} className="flex items-center justify-between text-sm">
                               <div className="flex items-center gap-2">
                                   <div className="h-2 w-2 rounded-full" style={{backgroundColor: threat.color}}></div>
                                   <span>{threat.name}</span>
                               </div>
                               <span>{threat.value}%</span>
                           </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
                <div className="relative flex-grow sm:flex-grow-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search Logs..." className="pl-10 w-full sm:w-64" />
                </div>
                <Button variant="outline">Threat Type <ChevronDown className="ml-2 h-4 w-4" /></Button>
                <Button variant="outline">Severity <ChevronDown className="ml-2 h-4 w-4" /></Button>
                <Button variant="outline">Source IP <ChevronDown className="ml-2 h-4 w-4" /></Button>
            </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"><Checkbox /></TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Source IP</TableHead>
                <TableHead>Destination IP</TableHead>
                <TableHead>Threat Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Action Taken</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logData.map((log, index) => (
                <TableRow key={index}>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell className="font-medium">{log.timestamp}</TableCell>
                  <TableCell>{log.sourceIp}</TableCell>
                  <TableCell>{log.destIp}</TableCell>
                  <TableCell>{log.threatType}</TableCell>
                  <TableCell><SeverityDot severity={log.severity} /></TableCell>
                  <TableCell>{log.actionTaken}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
