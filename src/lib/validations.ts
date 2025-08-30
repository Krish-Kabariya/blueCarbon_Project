import { BlueCarbonProject, MonitoringData } from './types';

export function validateProject(project: Partial<BlueCarbonProject>): string[] {
  const errors: string[] = [];

  if (!project.name || project.name.trim().length === 0) {
    errors.push('Project name is required');
  }

  if (!project.location) {
    errors.push('Project location is required');
  } else {
    if (!project.location.latitude || !project.location.longitude) {
      errors.push('Valid coordinates are required');
    }
    if (!project.location.address) {
      errors.push('Address is required');
    }
    if (!project.location.country) {
      errors.push('Country is required');
    }
  }

  if (!project.ecosystemType) {
    errors.push('Ecosystem type is required');
  }

  if (!project.area || project.area <= 0) {
    errors.push('Project area must be greater than 0');
  }

  if (!project.organizationId) {
    errors.push('Organization ID is required');
  }

  return errors;
}

export function validateMonitoringData(data: Partial<MonitoringData>): string[] {
  const errors: string[] = [];

  if (!data.projectId) {
    errors.push('Project ID is required');
  }

  if (!data.timestamp) {
    errors.push('Timestamp is required');
  }

  if (!data.collectedBy) {
    errors.push('Collector information is required');
  }

  if (!data.coordinates) {
    errors.push('Coordinates are required');
  } else {
    if (!data.coordinates.latitude || !data.coordinates.longitude) {
      errors.push('Valid coordinates are required');
    }
  }

  if (!data.measurements) {
    errors.push('Measurements are required');
  } else {
    if (data.measurements.carbonStock < 0) {
      errors.push('Carbon stock cannot be negative');
    }
    if (data.measurements.waterQuality) {
      const wq = data.measurements.waterQuality;
      if (wq.ph < 0 || wq.ph > 14) {
        errors.push('pH must be between 0 and 14');
      }
      if (wq.temperature < -10 || wq.temperature > 50) {
        errors.push('Temperature must be realistic (-10°C to 50°C)');
      }
    }
  }

  return errors;
}
