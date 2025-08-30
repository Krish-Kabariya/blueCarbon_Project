import { useState, useEffect } from 'react';
import { MonitoringData } from '@/lib/types';

export function useMonitoring(projectId: string, filters?: {
  startDate?: string;
  endDate?: string;
  limit?: number;
}) {
  const [data, setData] = useState<MonitoringData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      fetchMonitoringData();
    }
  }, [projectId, filters]);

  const fetchMonitoringData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);
      if (filters?.limit) params.append('limit', filters.limit.toString());

      const response = await fetch(`/api/monitoring/${projectId}?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to fetch monitoring data');
    } finally {
      setLoading(false);
    }
  };

  const addMonitoringData = async (monitoringData: Omit<MonitoringData, 'id'>) => {
    try {
      const response = await fetch('/api/monitoring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(monitoringData),
      });

      const result = await response.json();

      if (result.success) {
        setData(prev => [result.data, ...prev]);
        return result.data;
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add monitoring data');
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchMonitoringData,
    addMonitoringData,
  };
}
