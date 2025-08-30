
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
  { id: 1, lat: 21.2, lng: 72.8, type: 'Hurricane', severity: 'Warning', name: 'Hurricane Tauktae', details: 'Category 3 hurricane making landfall soon.', date: '2023-05-17T00:00:00Z' },
  { id: 2, lat: 12.9, lng: 80.2, type: 'Tsunami', severity: 'Watch', name: 'Tsunami Watch', details: 'Earthquake detected in the Indian Ocean.', date: '2023-12-26T00:00:00Z' },
  { id: 3, lat: 19.0, lng: 72.8, type: 'Storm Surge', severity: 'Advisory', name: 'High Tide Advisory', details: 'High tides expected, minor coastal flooding possible.', date: '2024-07-29T00:00:00Z' },
  { id: 4, lat: 22.5, lng: 88.3, type: 'Water Quality', severity: 'Advisory', name: 'Algal Bloom', details: 'Harmful algal bloom detected.', date: '2024-08-01T00:00:00Z' },
  { id: 5, lat: 8.5, lng: 76.9, type: 'High Rip Current', severity: 'Warning', name: 'Strong Rip Currents', details: 'Dangerous rip currents, swimming not advised.', date: '2024-08-02T00:00:00Z' },
  { id: 6, lat: 20.4, lng: 85.8, type: 'Cyclone', severity: 'Warning', name: 'Cyclone Fani', details: 'Severe cyclonic storm approaching the coast.', date: '2023-05-03T00:00:00Z' },
  { id: 7, lat: 15.4, lng: 73.8, type: 'Water Quality', severity: 'Advisory', name: 'Industrial Runoff', details: 'Industrial runoff detected, avoid contact with water.', date: '2024-07-15T00:00:00Z' },
  { id: 8, lat: 11.3, lng: 92.7, type: 'Tsunami', severity: 'Watch', name: 'Tsunami Watch', details: 'Undersea earthquake reported.', date: '2024-01-11T00:00:00Z' },
  { id: 9, lat: 28.5, lng: 77.2, type: 'Coastal Erosion', severity: 'Warning', name: 'Major Erosion Event', details: 'Significant coastline loss reported after storm.', date: '2024-08-02T00:00:00Z'},
  { id: 10, lat: 10.8, lng: 79.8, type: 'Illegal Fishing', severity: 'Advisory', name: 'Illegal Trawling', details: 'Reports of illegal fishing trawlers in restricted zone.', date: '2023-09-10T00:00:00Z'},
  { id: 11, lat: 16.5, lng: 80.6, type: 'Storm Surge', severity: 'Warning', name: 'Severe Storm Surge', details: 'Life-threatening storm surge expected.', date: '2024-10-25T00:00:00Z'},
  { id: 12, lat: 22.3, lng: 70.7, type: 'Oil Spill', severity: 'Warning', name: 'Oil Spill', details: 'Oil slick reported near industrial port.', date: '2024-06-05T00:00:00Z'},
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

    