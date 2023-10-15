"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const pinId = searchParams.get('id');
  const [pin, setPin] = useState({});


  useEffect(() => {
    const fetchPin = async () => {
      const res = await fetch(`/api/pin/${pinId}`);
      const data = await res.json();
      setPin(data)
    }

    if(pinId) fetchPin();
  }, [])

  return (
    <div>Pin details</div>
  )
}

export default page