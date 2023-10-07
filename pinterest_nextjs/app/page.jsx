"use client"

import { CldImage } from 'next-cloudinary';
import { useState, useEffect } from 'react';
import PinCard from '@/components/PinCard';

export default function Home() {
  const [allPins, setAllPins] = useState([]);


  const fetchPins = async () => {
    const response = await fetch("/api/pin");
    const data = await response.json();

    setAllPins(data);
  };

  console.log(allPins)

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <main className="flex min-h-screen gap-3 flex-wrap items-center justify-center p-24 max-w-full">
      {allPins.map((pin) => (
        <CldImage 
          width={250}
          height={800}
          src={pin.imageUrl}
          alt={pin.description}
        />
      ))}
    </main>
  )
}
