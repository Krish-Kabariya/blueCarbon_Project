import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { BlueCarbonProject, MonitoringData } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const organizationId = searchParams.get('organizationId');

    // Fetch projects
    let projectsQuery = collection(db, 'projects');
    if (organizationId) {
      projectsQuery = query(projectsQuery, where('organizationId', '==', organizationId));
    }

    const projectsSnapshot = await getDocs(projectsQuery);
    const projects: BlueCarbonProject[] = [];
    projectsSnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() } as BlueCarbonProject);
    });

    // Fetch recent monitoring data
    const monitoringQuery = query(
      collection(db, 'monitoring'),
      orderBy('timestamp', 'desc')
    );
    const monitoringSnapshot = await getDocs(monitoringQuery);
    const monitoringData: MonitoringData[] = [];
    monitoringSnapshot.forEach((doc) => {
      monitoringData.push({ id: doc.id, ...doc.data() } as MonitoringData);
    });

    // Calculate dashboard metrics
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const totalArea = projects.reduce((sum, p) => sum + p.area, 0);
    const totalCarbonStock = projects.reduce((sum, p) => sum + p.carbonStock, 0);
    const totalSequestration = projects.reduce((sum, p) => sum + p.sequestrationRate, 0);

    // Ecosystem distribution
    const ecosystemDistribution = projects.reduce((acc, project) => {
      acc[project.ecosystemType] = (acc[project.ecosystemType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Status distribution
    const statusDistribution = projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentMonitoring = monitoringData.filter(
      m => new Date(m.timestamp) > thirtyDaysAgo
    );

    // Carbon trends (monthly aggregation)
    const monthlyCarbon = monitoringData.reduce((acc, data) => {
      const month = data.timestamp.slice(0, 7); // YYYY-MM
      if (!acc[month]) {
        acc[month] = { total: 0, count: 0 };
      }
      acc[month].total += data.measurements.carbonStock;
      acc[month].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    const carbonTrends = Object.entries(monthlyCarbon)
      .map(([month, data]) => ({
        month,
        averageCarbon: data.total / data.count,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalProjects,
          activeProjects,
          totalArea,
          totalCarbonStock,
          totalSequestration,
          recentMeasurements: recentMonitoring.length,
        },
        distributions: {
          ecosystem: ecosystemDistribution,
          status: statusDistribution,
        },
        trends: {
          carbon: carbonTrends.slice(-12), // Last 12 months
        },
        recentActivity: recentMonitoring.slice(0, 10),
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
