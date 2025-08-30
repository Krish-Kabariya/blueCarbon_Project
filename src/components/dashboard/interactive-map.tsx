
"use client";

import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Fix for default icon issue with Leaflet in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Sample data - in a real app, this would come from an API
const threatData = [
  { id: 1, lat: 23.23, lng: 68.35, type: 'Cyclone & Storm Surge', severity: 'Warning', name: 'Major Cyclone Event', details: 'A severe post-monsoon cyclone making landfall, causing a dangerous storm surge and extreme winds, prompting widespread evacuations.', date: '2024-11-15T00:00:00Z' },
  { id: 2, lat: 19.0760, lng: 72.8777, type: 'Coastal Flood', severity: 'Warning', name: 'Monsoon Coastal Flooding', details: 'A combination of monsoon torrential rains and high tides leading to severe waterlogging and flooding in low-lying coastal areas of the city.', date: '2025-07-28T00:00:00Z' },
  { id: 3, lat: 21.6417, lng: 69.6293, type: 'Cyclone', severity: 'Watch', name: 'Pre-Monsoon Cyclone Watch', details: 'A cyclonic storm is developing in the Arabian Sea. While its exact path is uncertain, it has the potential to impact the coast within 48-72 hours.', date: '2025-05-22T00:00:00Z' },
  { id: 4, lat: 20.9122, lng: 70.9844, type: 'High Tides & Rip Currents', severity: 'Advisory', name: 'High Tide / Rip Current Advisory', details: 'Unusually strong currents and higher-than-normal tides are predicted during a full moon, posing a risk to tourists and fishermen.', date: '2023-02-18T00:00:00Z' },
  { id: 5, lat: 21.1702, lng: 72.8311, type: 'Tsunami', severity: 'Warning', name: 'Historical Tsunami Alert', details: 'Historical data point representing the Tsunami Warning issued following the major earthquake in the Indian Ocean.', date: '2004-12-26T00:00:00Z' },
];

const severityColors: Record<string, string> = {
  'Warning': 'hsl(var(--destructive))',
  'Watch': 'hsl(var(--chart-5))',
  'Advisory': 'hsl(var(--chart-4))',
};

const ColorLegend = () => (
  <Card className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] w-auto">
    <CardHeader className="p-2">
      <CardTitle className="text-sm">Color Legend</CardTitle>
    </CardHeader>
    <CardContent className="flex gap-4 p-2 pt-0">
      {Object.entries(severityColors).map(([severity, color]) => (
        <div key={severity} className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }}></div>
          <span className="text-xs">{severity}</span>
        </div>
      ))}
    </CardContent>
  </Card>
);


const InteractiveMap = () => {
  const [date, setDate] = useState<Date>();
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const position: [number, number] = [20.5937, 78.9629]; // Center of India
  
  const filteredThreats = useMemo(() => {
    return threatData.filter(threat => {
      const severityMatch = selectedSeverity === 'all' || threat.severity.toLowerCase() === selectedSeverity;
      
      const dateMatch = !date || format(new Date(threat.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');

      return severityMatch && dateMatch;
    });
  }, [selectedSeverity, date]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
      {/* Control Panel */}
      <Card className="md:col-span-1 h-full flex flex-col">
        <CardHeader>
          <CardTitle>Data Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto space-y-4">
          <Accordion type="multiple" defaultValue={['threat-type', 'severity', 'time-range']} className="w-full">
            <AccordionItem value="threat-type">
              <AccordionTrigger>Threat Type</AccordionTrigger>
              <AccordionContent>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Threats" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Threats</SelectItem>
                    <SelectItem value="hurricane">Hurricane</SelectItem>
                    <SelectItem value="tsunami">Tsunami</SelectItem>
                    <SelectItem value="storm-surge">Storm Surge</SelectItem>
                    <SelectItem value="water-quality">Water Quality</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="severity">
              <AccordionTrigger>Severity</AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="all" value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="r-all" />
                    <Label htmlFor="r-all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="warning" id="r-warning" />
                    <Label htmlFor="r-warning">Warning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="watch" id="r-watch" />
                    <Label htmlFor="r-watch">Watch</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advisory" id="r-advisory" />
                    <Label htmlFor="r-advisory">Advisory</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="time-range">
              <AccordionTrigger>Time Range</AccordionTrigger>
              <AccordionContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Map Area */}
      <div className="md:col-span-3 h-full min-h-[400px] md:min-h-0 rounded-lg overflow-hidden relative">
        <MapContainer
          center={position}
          zoom={5}
          style={{ height: '100%', width: '100%', backgroundColor: '#1a1a1a' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredThreats.map((threat) => (
            <CircleMarker
              key={threat.id}
              center={[threat.lat, threat.lng]}
              pathOptions={{
                color: severityColors[threat.severity] || 'grey',
                fillColor: severityColors[threat.severity] || 'grey',
                fillOpacity: 0.7,
              }}
              radius={8}
            >
              <Popup>
                <div className="w-48">
                    <h3 className="font-bold text-base mb-1">{threat.name}</h3>
                    <p className="text-sm m-0"><strong>Type:</strong> {threat.type}</p>
                    <p className="text-sm m-0"><strong>Severity:</strong> <span style={{color: severityColors[threat.severity]}}>{threat.severity}</span></p>
                    <p className="text-xs mt-2">{threat.details}</p>
                    <p className="text-xs m-0 mt-1"><strong>Date:</strong> {format(new Date(threat.date), "PPP")}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
        <ColorLegend />
      </div>
    </div>
  );
};

export default InteractiveMap;
