import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

export interface CarbonCredit {
  id?: string;
  projectId: string;
  organizationId: string;
  amount: number; // tonnes CO2
  price: number;
  currency: string;
  status: 'available' | 'reserved' | 'sold' | 'retired';
  vintage: string; // year
  methodology: string;
  verificationStandard: 'VCS' | 'CDM' | 'GS' | 'ACR' | 'CAR';
  serialNumber: string;
  issuanceDate: string;
  expiryDate?: string;
  createdAt: string;
  updatedAt: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');
    const organizationId = searchParams.get('organizationId');

    let creditsQuery = query(
      collection(db, 'carbon-credits'),
      orderBy('createdAt', 'desc')
    );

    if (projectId) {
      creditsQuery = query(creditsQuery, where('projectId', '==', projectId));
    }
    if (status) {
      creditsQuery = query(creditsQuery, where('status', '==', status));
    }
    if (organizationId) {
      creditsQuery = query(creditsQuery, where('organizationId', '==', organizationId));
    }

    const querySnapshot = await getDocs(creditsQuery);
    const credits: CarbonCredit[] = [];

    querySnapshot.forEach((doc) => {
      credits.push({ id: doc.id, ...doc.data() } as CarbonCredit);
    });

    return NextResponse.json({
      success: true,
      data: credits,
      count: credits.length,
    });
  } catch (error) {
    console.error('Error fetching carbon credits:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch carbon credits' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const creditData = await request.json();

    // Generate serial number
    const serialNumber = `BC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const credit: Omit<CarbonCredit, 'id'> = {
      ...creditData,
      serialNumber,
      status: 'available',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'carbon-credits'), credit);

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...credit },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating carbon credit:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create carbon credit' },
      { status: 500 }
    );
  }
}
