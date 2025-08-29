import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bell, BookOpen, LifeBuoy, Megaphone, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { DataVisualization } from "./data-visualization";

const features = [
  {
    icon: Bell,
    title: "Real-time Threat Alerts",
    description: "Stay updated with live alerts on storm surges, high tides, and pollution events.",
    color: "text-red-500",
  },
  {
    icon: Megaphone,
    title: "Community Reporting",
    description: "Report environmental issues like pollution and illegal activities to protect your coast.",
    color: "text-amber-500",
  },
];

const infoCards = [
    {
        icon: BookOpen,
        title: "Blue Carbon Education",
        description: "Learn about the vital role of mangroves, seagrasses, and salt marshes in combating climate change.",
        image: "https://picsum.photos/600/400",
        imageHint: "mangrove forest"
    },
    {
        icon: LifeBuoy,
        title: "Coastal Resilience Tips",
        description: "Discover actionable tips to enhance coastal resilience, from erosion control to disaster preparedness.",
        image: "https://picsum.photos/600/400",
        imageHint: "coastal community"
    }
]

export function DashboardClient() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Main Feature Cards */}
      <div className="grid grid-cols-1 gap-6 lg:col-span-1">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <div className={`rounded-lg bg-accent/50 p-3 ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Visualization */}
      <DataVisualization />

      {/* Info Cards */}
      {infoCards.map(card => (
        <Card key={card.title} className="col-span-1 lg:col-span-1 overflow-hidden">
            <div className="relative h-48 w-full">
                <Image 
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    data-ai-hint={card.imageHint}
                />
            </div>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <card.icon className="h-5 w-5 text-primary"/>
                    {card.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{card.description}</CardDescription>
            </CardContent>
        </Card>
      ))}

    </div>
  );
}
