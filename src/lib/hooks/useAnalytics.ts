import { useState, useEffect } from 'react';

interface DashboardData {
  summary: {
    totalProjects: number;
    activeProjects: number;
    totalArea: number;
    totalCarbonStock: number;
    totalSequestration: number;
    recentMeasurements: number;
  };
  distributions: {
    ecosystem: Record<string, number>;
    status: Record<string, number>;
  };
  trends: {
    carbon: { month: string; averageCarbon: number; }[];
  };
  recentActivity: any[];
}

export function useAnalytics(organizationId?: string) {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [carbonData, setCarbonData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [organizationId]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard data
      const params = new URLSearchParams();
      if (organizationId) params.append('organizationId', organizationId);
      
      const dashboardResponse = await fetch(`/api/analytics/dashboard?${params.toString()}`);
      const dashboardResult = await dashboardResponse.json();

      if (dashboardResult.success) {
        setDashboardData(dashboardResult.data);
      }

      // Fetch carbon sequestration data
      const carbonResponse = await fetch(`/api/analytics/carbon-sequestration?timeRange=1y`);
      const carbonResult = await carbonResponse.json();

      if (carbonResult.success) {
        setCarbonData(carbonResult.data.trends);
      }

    } catch (err) {
      setError('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  return {
    dashboardData,
    carbonData,
    loading,
    error,
    refetch: fetchAnalytics,
  };
}
