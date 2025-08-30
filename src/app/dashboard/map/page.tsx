"use client";

import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('@/components/dashboard/interactive-map'), {
  ssr: false,
  loading: () => <div className="flex h-full w-full items-center justify-center bg-gray-200"><p>Loading Map...</p></div>
});

export default function MapPage() {
  return (
    <div className="h-full w-full">
      <InteractiveMap />
    </div>
  );
}
