
"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { FeatureCollection } from 'geojson';
import L from 'leaflet';

// Fix for default markers as recommended.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const LeafletMap = () => {
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection | null>(null);
  const position: [number, number] = [22.5, 71.0]; // Centered on Gujarat
  const maptilerApiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/gujarat_mangroves.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGeoJsonData(data);
      } catch (error) {
        console.error("Failed to fetch GeoJSON data:", error);
      }
    };

    fetchData();
  }, []);

  const getStyle = (feature: any) => {
    const density = feature?.properties?.density;
    switch (density) {
      case 'dense':
        return { fillColor: "#2E7D32", color: "#f0fff4", weight: 1, fillOpacity: 0.8 }; // Green
      case 'medium':
        return { fillColor: "#FDD835", color: "#333", weight: 1, fillOpacity: 0.8 }; // Yellow
      case 'sparse':
        return { fillColor: "#EF6C00", color: "#fbe9e7", weight: 1, fillOpacity: 0.8 }; // Orange/Red
      default:
        return { fillColor: "#9E9E9E", color: "#fff", weight: 1, fillOpacity: 0.7 }; // Grey
    }
  };

  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      const popupContent = `
        <div style="background-color: #2d3748; color: #e2e8f0; padding: 10px; border-radius: 8px;">
          <h3 style="margin: 0 0 5px 0; font-size: 16px; border-bottom: 1px solid #4a5568; padding-bottom: 5px;">${feature.properties.Name}</h3>
          <p style="margin: 0; font-size: 14px;">${feature.properties.Description}</p>
        </div>
      `;
      layer.bindPopup(popupContent);
    }
  };

  const pointToLayer = (feature: any, latlng: L.LatLngExpression) => {
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
        zoom={7}
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
