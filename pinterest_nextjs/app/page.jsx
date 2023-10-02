"use client"

import { CldUploadButton, CldUploadWidget } from 'next-cloudinary';
import { useState, useEffect } from 'react';
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
      {/* {allPins?.map((pin) => (
        <PinCard 
          // image={pin.imageUrl}
          title={title}
        />
      ))} */}
 
      {/* <CldUploadButton 
        uploadPreset="gxoon7ry"
        onUpload={(result) => {
          console.log(result, 'RESULT')
        }} 
      /> */}
 
      <CldUploadWidget 
        uploadPreset="gxoon7ry"
        // onUpload={(result) => {
        //   console.log(result)
        // }}
        onUploadAdded={(result) => {
          console.log(result, 'UPLOAD')
        }}
      >
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <div onClick={handleOnClick}>
              <div
                className='border-dashed rounded-md border-gray-400 gray_bg border-2 p-[20px] text-center hover:cursor-pointer h-96'
              >
                Click to Select an Image
              </div>
              <button className="bg-red-600">
                Upload an Image
              </button>
            </div>
          );
        }}
      </CldUploadWidget>
    </main>
  )
}
