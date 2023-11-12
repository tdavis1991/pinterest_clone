"use client"

import { useState, useEffect } from "react";
import { CldImage } from 'next-cloudinary';

const page = ({ params }) => {
  const [pin, setPin] = useState({});

  const pinId = params.id

  console.log(pin, 'PIN')


  useEffect(() => {
    const fetchPin = async () => {
      const res = await fetch(`/api/pin/${pinId}`);
      const data = await res.json();
      setPin(data)
    }

    if(pinId) fetchPin();
  }, [])

  

  return (
    <div className="w-11/12 mt-5 gap-5 flex justify-center items-center">
      <div>
        <CldImage 
          width={1000}
          height={1000}
          src={pin.imageUrl}
          alt={pin.description}
        />
      </div>
      <div className="flex flex-col">
        <h1>{pin.title}</h1>
        <div className="flex gap-3">
          <button className="bg-gray-400 rounded-full px-5 py-2 text-white">View</button>
          <button className="cta_btn rounded-full px-5 py-2 text-white">Save</button>
        </div>
      </div>
    </div>
  )
}

export default page