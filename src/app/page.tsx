import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpen, ShieldCheck, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-lg md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">CoastalWatch</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="#features" className="transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#about" className="transition-colors hover:text-primary">
              About
            </Link>
          </nav>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex h-[60vh] min-h-[400px] w-full flex-col items-center justify-center text-center">
          <div className="absolute inset-0 -z-10">
            <Image
              src="https://picsum.photos/1920/1080?random=10"
              alt="Coastal Landscape"
              fill
              style={{ objectFit: 'cover' }}
              className="opacity-20"
              data-ai-hint="coastal landscape"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </div>
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Protecting Our Blue Carbon Ecosystems
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              CoastalWatch provides real-time threat alerts, data visualization, and community awareness to safeguard our vital coastal environments.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Shield for Coastal Ecosystems</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a suite of tools designed to provide comprehensive protection and awareness for coastal regions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader className="items-center">
                   <div className="mb-4 rounded-full bg-primary/10 p-4">
                     <ShieldCheck className="h-8 w-8 text-primary" />
                   </div>
                  <CardTitle>Real-Time Threat Alerts</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  Receive immediate notifications for hurricanes, tsunamis, and other coastal hazards with detailed, actionable information.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Advanced Data Visualization</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  Interact with maps showing water quality, storm surge predictions, and ecosystem health data to understand risks and trends.
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="items-center">
                   <div className="mb-4 rounded-full bg-primary/10 p-4">
                     <BookOpen className="h-8 w-8 text-primary" />
                   </div>
                  <CardTitle>Community Awareness</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  Stay informed with news, safety tips, and community spotlights to foster a resilient and proactive coastal community.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our Mission: A Resilient Coast for a Thriving Planet
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Coastal ecosystems, like mangroves and seagrass beds, are critical "blue carbon" sinks, storing vast amounts of carbon. CoastalWatch is dedicated to protecting these environments by empowering communities with the data and tools they need to respond to threats effectively.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://picsum.photos/600/400"
                alt="Mangrove Forest"
                width={600}
                height={400}
                className="overflow-hidden rounded-xl object-cover"
                data-ai-hint="mangrove forest"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex w-full shrink-0 flex-col items-center justify-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">&copy; 2024 CoastalWatch. All rights reserved.</p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link href="#" className="text-xs hover:underline">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
