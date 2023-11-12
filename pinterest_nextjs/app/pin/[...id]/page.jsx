"use client"

import { useState, useEffect } from "react";
import { CldImage } from 'next-cloudinary';
import { useSession } from "next-auth/react";
import Image from "next/image";

const page = ({ params }) => {
  const [pin, setPin] = useState({});
  const [user, setUser] = useState({});
  const { data: session } = useSession();

  const pinId = params.id

  console.log(session)


  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${session?.user?.id}`);
      const data = await res.json();
      console.log(data, 'USER')
      setUser(data) 
    }

    if(session?.user) fetchUser();
  }, [])


  useEffect(() => {
    const fetchPin = async () => {
      const res = await fetch(`/api/pin/${pinId}`);
      const data = await res.json();
      setPin(data)
    }

    if(pinId) fetchPin();
  }, [])

  

  return (
    <div className="w-11/12 h-screen flex flex-col justify-center items-center">
      <div className="rounded-xl shadow-xl flex w-2/3 border-gray-200 border">
        <div>
          <CldImage 
            width={700}
            height={700}
            src={pin.imageUrl}
            alt={pin.description}
          />
        </div>
        <div className="flex flex-col flex-1 items-center">
          <div className="flex m-3">
            {session?.user &&
                <select className=' px-1 py-2'>
                  <option>Create Board</option>
                  {user?.boards?.map((board, i) => (
                    <select key={i} value={board?.name?.toLowerCase()}></select>
                  ))}
                </select>
              }
              <button className="cta_btn rounded-full px-5 py-2 text-white">Save</button>
          </div>
          <h1>{pin?.title}</h1>
          <div className="flex my-3 gap-5">
            <Image 
              src={session?.user.image}
              alt="Profile picture"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h2>{session?.user.name}</h2>
            
          </div>
        </div>

      </div>
    </div>
  )
}

export default page