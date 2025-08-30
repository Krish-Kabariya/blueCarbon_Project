
"use client";

import React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, MoreVertical, ShieldAlert, Waves, Biohazard, Mountain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const newsItems = [
  {
    title: "How Blue Carbon Ecosystems Are Our Best Bet Against Climate Change",
    source: "Coastal Conservation Foundation",
    date: "Aug 23, 2024",
    image: "https://picsum.photos/400/225?random=1",
    dataAiHint: "mangrove forest",
  },
  {
    title: "Community Action Leads to Major Coastal Cleanup Initiative",
    source: "Local Community Channel",
    date: "Aug 22, 2024",
    image: "https://picsum.photos/400/225?random=2",
    dataAiHint: "community meeting",
  },
  {
    title: "Scientists Discover New Carbon-Absorbing Seagrass Meadow",
    source: "Marine Biology Institute",
    date: "Aug 21, 2024",
    image: "https://picsum.photos/400/225?random=3",
    dataAiHint: "coastal research",
  },
  {
    title: "The Hidden Cost of Coastal Pollution on Carbon Sequestration",
    source: "Environmental Science Weekly",
    date: "Aug 20, 2024",
    image: "https://picsum.photos/400/225?random=4",
    dataAiHint: "coastal pollution",
  },
  {
    title: "Illegal Sand Mining Erodes Coastlines and Carbon Sinks",
    source: "Global Environmental Report",
    date: "Aug 19, 2024",
    image: "https://picsum.photos/400/225?random=5",
    dataAiHint: "sand mining",
  },
    {
    title: "Storm Surges Threaten Vital Carbon-Storing Salt Marshes",
    source: "Climate Action Today",
    date: "Aug 18, 2024",
    image: "https://picsum.photos/400/225?random=6",
    dataAiHint: "stormy coast",
  },
];

const safetyTips = [
    {
        title: "Storm Surge",
        icon: Waves,
        tips: [
            "Evacuate Immediately: If authorities issue a warning for your area, leave.",
            "Seek High Ground: Move inland and to the highest point possible.",
            "Never Drive Through Floods: Your vehicle can be swept away in seconds.",
        ]
    },
    {
        title: "Coastal Erosion",
        icon: Mountain,
        tips: [
            "Keep a Safe Distance: Stay at least 10 feet away from cliff edges.",
            "Watch for Warning Signs: Look for cracks in the ground or leaning trees.",
            "Report Major Changes: Inform authorities if you see a recent landslide.",
        ]
    },
    {
        title: "Pollution",
        icon: Biohazard,
        tips: [
            "Do Not Touch: Never handle or touch potential pollutants like oil or chemicals.",
            "Leave the Area: If you smell strange fumes, move away immediately.",
            "Report It: Your most important job is to report the pollution to the authorities.",
        ]
    },
];

const communityEvents = [
  {
    date: "Aug 20",
    title: "Disaster Drill - Mandvi",
  },
  {
    date: "Aug 28",
    title: "First-Aid Workshop",
  },
  {
    date: "Sep 5",
    title: "Coastal Ecosystem Workshop",
  },
    {
    date: "Sep 12",
    title: "Community Cleanup Day",
  },
];

export function AwarenessContent() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCurrent(api.selectedScrollSnap())
 
    const handleSelect = (api: CarouselApi) => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", handleSelect)
 
    return () => {
      api.off("select", handleSelect)
    }
  }, [api])


  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Awareness</h1>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </header>

      {/* Latest News */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Latest News</h2>
          <Button variant="ghost" size="sm">
            Topics <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {newsItems.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-2/3">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={225}
                      className="aspect-[16/9] w-full object-cover"
                      data-ai-hint={item.dataAiHint}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
        {newsItems[current] && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-foreground truncate">{newsItems[current].title}</h3>
                <p className="text-sm text-muted-foreground">{newsItems[current].source}</p>
                <p className="text-xs text-muted-foreground/80 mt-1">{newsItems[current].date}</p>
            </div>
        )}
      </section>
      
      {/* Safety Tips */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Safety Tips</h2>
        <Accordion type="single" collapsible className="w-full">
          {safetyTips.map((category, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <category.icon className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{category.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      
      {/* Community Spotlight */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">Community Spotlight</h2>
        <Card>
          <CardContent className="p-4 space-y-2">
            {communityEvents.map((event, index) => (
              <div key={index} className={cn("flex items-center justify-between p-2 rounded-md hover:bg-muted/50", index !== communityEvents.length -1 && "border-b border-border")}>
                <div className="flex items-center gap-4">
                   <div className="text-center text-sm w-12">
                     <div className="font-bold">{event.date.split(' ')[0]}</div>
                     <div className="text-muted-foreground">{event.date.split(' ')[1]}</div>
                   </div>
                   <p className="font-medium text-foreground">{event.title}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
