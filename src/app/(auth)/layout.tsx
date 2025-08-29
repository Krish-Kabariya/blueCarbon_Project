import Image from 'next/image';
import Link from 'next/link';
import { ShieldHalf } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="Coastal background"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-20"
          data-ai-hint="ocean coast"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-lg"></div>
      </div>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
            <Link href="/" className="flex items-center justify-center gap-3">
                <ShieldHalf className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold text-primary">Coastal Guardian</h1>
            </Link>
            <p className="mt-2 text-muted-foreground">Your shield for coastal ecosystems.</p>
        </div>
        {children}
      </div>
    </div>
  );
}
