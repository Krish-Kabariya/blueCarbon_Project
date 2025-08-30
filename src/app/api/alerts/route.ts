import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

export interface Alert {
  id?: string;
  projectId: string;
  type: 'environmental' | 'security' | 'maintenance' | 'data';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  status: 'active' | 'acknowledged' | 'resolved';
  createdAt: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  assignedTo?: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');
    const severity = searchParams.get('severity');

    let alertsQuery = query(
      collection(db, 'alerts'),
      orderBy('createdAt', 'desc')
    );

    if (projectId) {
      alertsQuery = query(alertsQuery, where('projectId', '==', projectId));
    }
    if (status) {
      alertsQuery = query(alertsQuery, where('status', '==', status));
    }
    if (severity) {
      alertsQuery = query(alertsQuery, where('severity', '==', severity));
    }

    const querySnapshot = await getDocs(alertsQuery);
    const alerts: Alert[] = [];

    querySnapshot.forEach((doc) => {
      alerts.push({ id: doc.id, ...doc.data() } as Alert);
    });

    return NextResponse.json({
      success: true,
      data: alerts,
      count: alerts.length,
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const alertData = await request.json();

    const alert: Omit<Alert, 'id'> = {
      ...alertData,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'alerts'), alert);

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...alert },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating alert:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create alert' },
      { status: 500 }
    );
  }
}
