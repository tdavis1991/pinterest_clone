"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PinCard from '@/components/PinCard';

export default function Home() {
  const [allPins, setAllPins] = useState([]);

  const fetchPins = async () => {
    const response = await fetch("/api/pin");
    const data = await response.json();

    setAllPins(data);
  };

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 max-w-full">
      {allPins?.map((pin) => (
        <PinCard 
          image={pin.imageUrl}
        />
      ))}
    </main>
  )
}
