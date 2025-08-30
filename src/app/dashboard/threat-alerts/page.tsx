
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

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
  {
    id: "ALERT-004",
    severity: "High",
    type: "Illegal Trawling",
    location: "South Andaman",
    timestamp: "2024-07-30 08:00 UTC",
  },
  {
    id: "ALERT-005",
    severity: "Medium",
    type: "Coral Bleaching",
    location: "Lakshadweep Sea",
    timestamp: "2024-07-30 10:45 UTC",
  },
];

export default function ThreatAlertsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Bell />
        Threat Alerts
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>All Active Alerts</CardTitle>
          <CardDescription>
            A comprehensive list of all current and recent coastal threats.
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
                      Acknowledge
                    </Button>
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
