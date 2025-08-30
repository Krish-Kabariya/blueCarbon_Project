import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateCarbonCredits(area: number, sequestrationRate: number): number {
  return area * sequestrationRate;
}

export function validateCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

export function getEcosystemColor(type: string): string {
  const colors = {
    mangrove: '#2E8B57',
    seagrass: '#20B2AA',
    saltmarsh: '#9ACD32',
    kelp: '#006400',
  };
  return colors[type as keyof typeof colors] || '#4A90E2';
}
