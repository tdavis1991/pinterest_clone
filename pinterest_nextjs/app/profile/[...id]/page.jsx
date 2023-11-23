"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image";
import { CldImage } from "next-cloudinary";

const page = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${session?.user?.id}`);
      const data = await res.json();
      setUser(data) 
      console.log(user, 'PROFILE')
    }

    if(session?.user) fetchUser();
  }, [])

  return (
    <div className='flex min-h-screen w-full flex-col items-center gray_bg px-24 py-10'>
      <Image 
        src={session?.user.image}
        alt='Profile'
        width={100}
        height={100}
        className="rounded-full"
      />
      <h2>{user?.username}</h2>
      <p>{user?.email}</p>
      <div className="flex w-full justify-center">
      {user.boards && user.boards.length > 0 ? (
        user.boards.map((board, i) => (
          <CldImage 
            key={i} // Assuming _id or another unique identifier exists
            width={100}
            height={100}
            src='655e7b2efed860c468df3ad4'
            alt={board.name}
          />
        ))
      ) : (
        <p>No boards found</p>
      )}
      </div>
    </div>
  )
}

export default page