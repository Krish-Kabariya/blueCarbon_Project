
"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { FeatureCollection, Feature, Point } from 'geojson';
import L from 'leaflet';

// Fix for default markers as recommended.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MangroveProperties {
  state: string;
  city: string;
  mangrove_cover_sq_km: number;
  density: 'high' | 'medium' | 'low';
}

const LeafletMap = () => {
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection<Point, MangroveProperties> | null>(null);
  const position: [number, number] = [20.5937, 78.9629]; // Centered on India
  const maptilerApiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/india_mangroves.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Convert the raw JSON to GeoJSON FeatureCollection
        const features: Feature<Point, MangroveProperties>[] = data.india_mangroves.map((item: any) => ({
          type: 'Feature',
          properties: {
            state: item.state,
            city: item.city,
            mangrove_cover_sq_km: item.mangrove_cover_sq_km,
            density: item.density,
          },
          geometry: {
            type: 'Point',
            coordinates: [item.longitude, item.latitude],
          },
        }));

        setGeoJsonData({
          type: 'FeatureCollection',
          features: features,
        });

      } catch (error) {
        console.error("Failed to fetch GeoJSON data:", error);
      }
    };

    fetchData();
  }, []);

  const getStyle = (feature: Feature<Point, MangroveProperties>) => {
    const density = feature?.properties?.density;
    switch (density) {
      case 'high':
        return { fillColor: "#4CAF50", color: "#333", weight: 1, fillOpacity: 0.8 }; // Green for high
      case 'medium':
        return { fillColor: "#FDD835", color: "#333", weight: 1, fillOpacity: 0.8 }; // Yellow for medium
      case 'low':
        return { fillColor: "#EF6C00", color: "#fbe9e7", weight: 1, fillOpacity: 0.8 }; // Orange/Red for low
      default:
        return { fillColor: "#9E9E9E", color: "#fff", weight: 1, fillOpacity: 0.7 }; // Grey for default
    }
  };

  const onEachFeature = (feature: Feature<Point, MangroveProperties>, layer: L.Layer) => {
    if (feature.properties) {
      const popupContent = `
        <div style="background-color: #2d3748; color: #e2e8f0; padding: 10px; border-radius: 8px; font-family: sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; border-bottom: 1px solid #4a5568; padding-bottom: 5px;">${feature.properties.city}, ${feature.properties.state}</h3>
          <p style="margin: 0 0 4px 0; font-size: 14px;"><strong>Mangrove Cover:</strong> ${feature.properties.mangrove_cover_sq_km} km²</p>
          <p style="margin: 0; font-size: 14px;"><strong>Density:</strong> <span style="text-transform: capitalize;">${feature.properties.density}</span></p>
        </div>
      `;
      layer.bindPopup(popupContent);
    }
  };

  const pointToLayer = (feature: Feature<Point, MangroveProperties>, latlng: L.LatLngExpression) => {
    return L.circleMarker(latlng, {
      ...getStyle(feature),
      radius: 8,
    });
  };

  const tileUrl = maptilerApiKey 
    ? `https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=${maptilerApiKey}`
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const attribution = maptilerApiKey
    ? '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={position}
        zoom={5}
        style={{ height: '100%', width: '100%', backgroundColor: '#1a1a1a' }}
      >
        <TileLayer
          url={tileUrl}
          attribution={attribution}
        />
        {geoJsonData && (
          <GeoJSON 
            data={geoJsonData} 
            onEachFeature={onEachFeature}
            pointToLayer={pointToLayer}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
