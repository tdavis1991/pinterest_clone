"use client"

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
        <PinCard 
          key={pin._id}
          image={pin.imageUrl}
          description={pin.description}
          id={pin._id}
        />
      ))}
    </main>
  )
}
