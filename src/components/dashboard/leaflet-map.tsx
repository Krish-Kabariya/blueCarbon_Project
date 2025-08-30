
"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";
import type { FeatureCollection } from 'geojson';

// Define the type for our GeoJSON features properties
interface MangroveProperties {
  Name: string;
  Description: string;
}

const LeafletMap = () => {
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection | null>(null);
  const position: [number, number] = [21.5, 71.5]; // Centered on Gujarat

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

  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties && feature.properties.Name) {
      const popupContent = `
        <div style="background-color: #2d3748; color: #e2e8f0; padding: 10px; border-radius: 8px;">
          <h3 style="margin: 0 0 5px 0; font-size: 16px; border-bottom: 1px solid #4a5568; padding-bottom: 5px;">${feature.properties.Name}</h3>
          <p style="margin: 0; font-size: 14px;">${feature.properties.Description}</p>
        </div>
      `;
      layer.bindPopup(popupContent);
    }
  };

  const pointToLayer = (feature: any, latlng: [number, number]) => {
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: "#48bb78", // A nice green color
      color: "#f0fff4",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    });
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={position}
        zoom={7}
        style={{ height: '100%', width: '100%', backgroundColor: '#1a1a1a' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
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
