

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
import { Map, Bell, FileText, Download, Eye } from "lucide-react";
import { getDashboardAlerts, getDashboardReports, seedInitialData } from "@/lib/services/dashboard";
import Link from "next/link";
import DynamicMap from "@/components/dashboard/dynamic-map";


// Seed data on first load in a development environment.
// In a real production app, this would be handled by a separate migration script.
if (process.env.NODE_ENV === 'development') {
  seedInitialData();
}

export default async function DashboardPage() {
  
  const alerts = await getDashboardAlerts();
  const reports = await getDashboardReports();

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
               <div className="relative rounded-lg overflow-hidden h-[75vh]">
                  <DynamicMap />
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
                      <TableCell>{new Date(alert.timestamp).toUTCString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/dashboard/threat-alerts">Details</Link>
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
                                    <Button variant="outline" size="icon" aria-label="View Report" asChild disabled={report.status !== 'Complete'}>
                                      <Link href={report.href}>
                                        <Eye className="h-4 w-4" />
                                      </Link>
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
