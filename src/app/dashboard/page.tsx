
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Map, Bell, FileText, Menu, Download, Eye } from "lucide-react";
import dynamic from 'next/dynamic';
import { useMemo } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";


export default function DashboardPage() {
  const alerts = [
    {
      id: "ALERT-001",
      severity: "High",
      type: "Storm Surge",
      location: "East Coast",
      timestamp: "2024-07-29 14:30 UTC",
    },
    {
      id: "ALERT-002",
      severity: "Medium",
      type: "High Tides",
      location: "West Coast",
      timestamp: "2024-07-29 11:00 UTC",
    },
    {
      id: "ALERT-003",
      severity: "Low",
      type: "Pollution",
      location: "Gulf Coast",
      timestamp: "2024-07-28 09:15 UTC",
    },
  ];

  const reports = [
    {
      id: "REP-001",
      name: "Weekly Threat Summary",
      date: "2024-07-28",
      type: "Summary",
      status: "Complete",
    },
    {
      id: "REP-002",
      name: "Hurricane Zeta Impact Analysis",
      date: "2024-07-25",
      type: "Impact Analysis",
      status: "Complete",
    },
    {
      id: "REP-003",
      name: "Q3 Water Quality Report",
      date: "2024-07-20",
      type: "Water Quality",
      status: "Complete",
    },
    {
        id: "REP-004",
        name: "Monthly Alert Log",
        date: "2024-07-31",
        type: "Log Export",
        status: "Generating",
    }
  ];

  const LeafletMap = useMemo(() => dynamic(() => import('@/components/dashboard/leaflet-map'), {
    ssr: false,
    loading: () => <div className="flex h-full w-full items-center justify-center bg-gray-200"><p>Loading Map...</p></div>
  }), []);

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden">
          <Menu />
        </SidebarTrigger>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map"><Map className="mr-2" /> Map View</TabsTrigger>
          <TabsTrigger value="alerts"><Bell className="mr-2" /> Alerts & Notifications</TabsTrigger>
          <TabsTrigger value="reports"><FileText className="mr-2" /> Reports & Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="map" forceMount>
          <Card className="mt-4">
            <CardContent className="p-0">
               <div className="relative rounded-lg overflow-hidden aspect-video">
                  <LeafletMap />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>
                Live updates on coastal threats.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Severity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <Badge variant={
                            alert.severity === "High" ? "destructive" :
                            alert.severity === "Medium" ? "secondary" : "default"
                        }>
                            {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>{alert.type}</TableCell>
                      <TableCell>{alert.location}</TableCell>
                      <TableCell>{alert.timestamp}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Reports & Logs</CardTitle>
                <CardDescription>View, generate, and download historical reports.</CardDescription>
              </CardHeader>
              <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Report Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell className="font-medium">{report.name}</TableCell>
                                <TableCell>{report.date}</TableCell>
                                <TableCell>{report.type}</TableCell>
                                <TableCell>
                                    <Badge variant={report.status === "Complete" ? "default" : "secondary"}>
                                        {report.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="icon" aria-label="View Report">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" aria-label="Download Report" disabled={report.status !== 'Complete'}>
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
