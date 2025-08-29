"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoogleMapComponent } from "@/components/dashboard/google-map";
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
import { Map, Bell, FileText } from "lucide-react";


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


export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map"><Map className="mr-2" /> Map View</TabsTrigger>
          <TabsTrigger value="alerts"><Bell className="mr-2" /> Alerts & Notifications</TabsTrigger>
          <TabsTrigger value="reports"><FileText className="mr-2" /> Reports & Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="map">
          <Card className="mt-4">
            <CardContent className="p-0">
               <div className="relative rounded-lg overflow-hidden aspect-video">
                  <GoogleMapComponent />
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
                <CardDescription>Historical record of past threats and alerts.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed">
                  <p className="text-muted-foreground">Reports & Logs will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
