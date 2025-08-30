
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';

export interface DashboardAlert {
    id: string;
    severity: "High" | "Medium" | "Low";
    type: string;
    location: string;
    timestamp: string;
}

export interface DashboardReport {
    id: string;
    name: string;
    date: string;
    type: string;
    status: "Complete" | "Pending";
    href: string;
}

const initialAlerts: DashboardAlert[] = [
    {
      id: "ALERT-001",
      severity: "High",
      type: "Storm Surge",
      location: "East Coast",
      timestamp: "2024-07-29T14:30:00Z",
    },
    {
      id: "ALERT-002",
      severity: "Medium",
      type: "High Tides",
      location: "West Coast",
      timestamp: "2024-07-29T11:00:00Z",
    },
    {
      id: "ALERT-003",
      severity: "Low",
      type: "Pollution",
      location: "Gulf Coast",
      timestamp: "2024-07-28T09:15:00Z",
    },
];

const initialReports: DashboardReport[] = [
    {
      id: "REP-001",
      name: "Weekly Threat Summary",
      date: "2024-07-28",
      type: "Summary",
      status: "Complete",
      href: "/dashboard/reports/REP-001"
    },
    {
      id: "REP-002",
      name: "Hurricane Zeta Impact Analysis",
      date: "2024-07-25",
      type: "Impact Analysis",
      status: "Complete",
      href: "/dashboard/reports/impact-analysis"
    },
    {
      id: "REP-003",
      name: "Q3 Water Quality Report",
      date: "2024-07-20",
      type: "Water Quality",
      status: "Complete",
      href: "/dashboard/reports/water-quality"
    },
    {
        id: "REP-004",
        name: "Monthly Alert Log",
        date: "2024-07-31",
        type: "Log Export",
        status: "Complete",
        href: "/dashboard/reports/monthly-log"
    }
];

// This is a simple flag to prevent re-seeding data on every hot reload in development.
let dataSeeded = false;

export async function seedInitialData() {
    if (dataSeeded) return;

    try {
        const alertsSnapshot = await getDocs(collection(db, 'dashboard-alerts'));
        if (alertsSnapshot.empty) {
            console.log("Seeding initial dashboard data...");
            const batch = writeBatch(db);

            initialAlerts.forEach(alert => {
                const docRef = doc(db, 'dashboard-alerts', alert.id);
                batch.set(docRef, alert);
            });

            initialReports.forEach(report => {
                const docRef = doc(db, 'dashboard-reports', report.id);
                batch.set(docRef, report);
            });
            
            await batch.commit();
            console.log("Dashboard data seeded successfully.");
        }
        dataSeeded = true; // Mark as seeded for this session
    } catch (error) {
        console.error("Error seeding data:", error);
    }
}

export async function getDashboardAlerts(): Promise<DashboardAlert[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "dashboard-alerts"));
        const alerts: DashboardAlert[] = [];
        querySnapshot.forEach((doc) => {
            alerts.push({ id: doc.id, ...doc.data() } as DashboardAlert);
        });
        return alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (error) {
        console.error("Error fetching alerts: ", error);
        return [];
    }
}

export async function getDashboardReports(): Promise<DashboardReport[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "dashboard-reports"));
        const reports: DashboardReport[] = [];
        querySnapshot.forEach((doc) => {
            reports.push({ id: doc.id, ...doc.data() } as DashboardReport);
        });
        return reports.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error("Error fetching reports: ", error);
        return [];
    }
}
