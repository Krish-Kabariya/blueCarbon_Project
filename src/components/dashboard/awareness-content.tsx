
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
import { ChevronRight, Home, MoreVertical, BarChart4, ShieldCheck, Users, Hammer } from 'lucide-react';
import { cn } from '@/lib/utils';

const newsItems = [
  {
    title: "Coastal Cleanup Drive in Veraval",
    source: "IMD Predicts Active Monson",
    date: "201, 20:021",
    image: "https://picsum.photos/400/225?random=1",
    dataAiHint: "coastal cleanup",
  },
  {
    title: "Mangrove Plantation Event",
    source: "The Times of Coast",
    date: "Aug 19, 2024",
    image: "https://picsum.photos/400/225?random=2",
    dataAiHint: "mangrove planting",
  },
  {
    title: "New Warning System Deployed",
    source: "Coastal Guardian News",
    date: "Aug 18, 2024",
    image: "https://picsum.photos/400/225?random=3",
    dataAiHint: "weather station",
  },
    {
    title: "Understanding Rip Currents",
    source: "Ocean Safety Institute",
    date: "Aug 17, 2024",
    image: "https://picsum.photos/400/225?random=4",
    dataAiHint: "ocean waves",
  },
];

const safetyTips = [
    {
        title: "Know Your Evacuation Zone",
        icon: BarChart4,
    },
    {
        title: "Prepare a Disaster Kit",
        icon: Home,
    },
    {
        title: "Have an Evacuation Plan",
        icon: BarChart4,
    },
     {
        title: "Stay Informed",
        icon: Home,
    },
    {
        title: "Check Insurance Coverage",
        icon: ShieldCheck,
    },
    {
        title: "Strengthen Your Home",
        icon: Hammer,
    },
    {
        title: "Help Your Neighbors",
        icon: Users,
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
                <p className="text-xs text-muted-foreground/80 mt-1">{newsİtems[current].date}</p>
            </div>
        )}
      </section>
      
      {/* Safety Tips */}
      <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Safety Tips</h2>
           <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {safetyTips.map((tip, index) => (
                  <CarouselItem key={index} className="basis-full">
                    <Card>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                           <div className="bg-muted p-2 rounded-full">
                             <tip.icon className="h-6 w-6 text-foreground" />
                           </div>
                           <span className="font-semibold text-foreground">{tip.title}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
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
