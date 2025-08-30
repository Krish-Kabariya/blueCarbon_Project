export interface BlueCarbonProject {
  id?: string;
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    country: string;
    region?: string;
  };
  ecosystemType: 'mangrove' | 'seagrass' | 'saltmarsh' | 'kelp';
  area: number;
  carbonStock: number;
  sequestrationRate: number;
  status: 'planning' | 'active' | 'monitoring' | 'completed';
  startDate: string;
  endDate?: string;
  organizationId: string;
  managerId: string;
  teamMembers: string[];
  stakeholders: string[];
  createdAt: string;
  updatedAt: string;
  images?: string[];
  documents?: string[];
  tags?: string[];
}

export interface MonitoringData {
  id?: string;
  projectId: string;
  timestamp: string;
  collectedBy: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  measurements: {
    carbonStock: number;
    biomassAboveGround: number;
    biomassBelowGround: number;
    soilCarbon: number;
    waterQuality: {
      ph: number;
      salinity: number;
      temperature: number;
      dissolvedOxygen: number;
    };
    biodiversity: {
      speciesCount: number;
      dominantSpecies: string[];
      threatenedSpecies: string[];
    };
  };
  weather: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
  };
  notes: string;
  verified: boolean;
  images?: string[];
}

export interface Organization {
  id?: string;
  name: string;
  type: 'government' | 'ngo' | 'research' | 'private' | 'international';
  description: string;
  location: {
    country: string;
    region: string;
    address: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
  certifications: string[];
  projectIds: string[];
  createdAt: string;
  updatedAt: string;
  active: boolean;
}
