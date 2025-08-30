
"use client";

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function DynamicMap() {
  // The useMemo hook ensures that the dynamic import is only executed once.
  const Map = useMemo(() => dynamic(
    () => import('@/components/dashboard/leaflet-map'),
    {
      loading: () => <div className="flex h-full w-full items-center justify-center bg-gray-200"><p>Loading Map...</p></div>,
      ssr: false // This is now safe inside a Client Component
    }
  ), []);

  return <Map />;
}
