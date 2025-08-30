
"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// This is to fix the default icon issue with Leaflet in React
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
  moderately_dense_km2?: number;
  open_km2?: number;
  pct_moderate?: number;
  latitude: number;
  longitude: number;
}

const LeafletMap = () => {
  const [mangroveData, setMangroveData] = useState<MangroveProperties[]>([]);
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
        setMangroveData(data.india_mangroves || []);

      } catch (error) {
        console.error("Failed to fetch mangrove data:", error);
      }
    };

    fetchData();
  }, []);

  const getStyle = (density: string) => {
    switch (density) {
      case 'high':
        return { fillColor: "#4CAF50", color: "#333", weight: 1, fillOpacity: 0.8 }; // Green
      case 'medium':
        return { fillColor: "#FDD835", color: "#333", weight: 1, fillOpacity: 0.8 }; // Yellow
      case 'low':
        return { fillColor: "#EF6C00", color: "#fbe9e7", weight: 1, fillOpacity: 0.8 }; // Orange/Red
      default:
        return { fillColor: "#9E9E9E", color: "#fff", weight: 1, fillOpacity: 0.7 }; // Grey
    }
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
        {mangroveData.map((item, index) => (
          <CircleMarker
            key={index}
            center={[item.latitude, item.longitude]}
            pathOptions={getStyle(item.density)}
            radius={8}
          >
            <Popup>
              <div style={{backgroundColor: '#2d3748', color: '#e2e8f0', padding: '10px', borderRadius: '8px', fontFamily: 'sans-serif', width: '200px'}}>
                <h3 style={{margin: '0 0 8px 0', fontSize: '16px', borderBottom: '1px solid #4a5568', paddingBottom: '5px'}}>
                  {item.city}, {item.state}
                </h3>
                <p style={{margin: '0 0 4px 0', fontSize: '14px'}}><strong>Total Cover:</strong> {item.mangrove_cover_sq_km} km²</p>
                {item.pct_moderate !== undefined && (
                  <p style={{margin: '0 0 4px 0', fontSize: '14px'}}><strong>Moderately Dense:</strong> {item.pct_moderate}%</p>
                )}
                <p style={{margin: '0', fontSize: '14px'}}><strong>Density:</strong> <span style={{textTransform: 'capitalize'}}>{item.density}</span></p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
