"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Book, Crosshair } from "lucide-react";
import { GoogleMapComponent } from "@/components/dashboard/google-map";

export default function DashboardPage() {
  return (
    <div className="flex justify-center items-start">
        <Card className="w-full max-w-lg rounded-xl shadow-lg overflow-hidden">
        <CardContent className="p-4 space-y-4">
            <div className="relative rounded-lg overflow-hidden aspect-video">
                <GoogleMapComponent />
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1 px-3 flex items-center space-x-4 text-white text-xs">
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span>Low</span>
                    </div>
                     <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                        <span>Moderate</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        <span>High</span>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-card rounded-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-sm font-bold uppercase text-red-600">High Alert:</h2>
                        <p className="text-lg font-semibold text-foreground mt-1">
                            Hurricane approaching Eastern Seaboard. Seek shelter immediately.
                        </p>
                    </div>
                    <Button variant="default" className="bg-gray-800 text-white hover:bg-gray-700 ml-4">
                        View Details
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                 <Card className="p-4 flex flex-col items-center justify-center space-y-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Zap className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Latest Updates</span>
                </Card>
                <Card className="p-4 flex flex-col items-center justify-center space-y-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Book className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Preparedness Guide</span>
                </Card>
                <Card className="p-4 flex flex-col items-center justify-center space-y-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Crosshair className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Report a Threat</span>
                </Card>
            </div>
        </CardContent>
    </Card>
    </div>
  );
}
