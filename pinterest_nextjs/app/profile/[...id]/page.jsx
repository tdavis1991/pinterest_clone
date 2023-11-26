"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

const page = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${session?.user?.id}`);
      const data = await res.json();
      setUser(data.existingUser);
      setBoards(data.modifiedUser); 
      
    }

    if(session?.user) fetchUser();
  }, [])

  useEffect(() => {
    console.log(user, boards, 'PROFILE')
  }, [user])

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
      <div className="flex w-full justify-center gap-3">
        {boards && boards.length > 0 ? (
          boards.map((board, i) => (
            <Link href={`boards/${board.id}`}>
              <CldImage 
                key={i} // Assuming _id or another unique identifier exists
                width={300}
                height={500}
                src={board.firstPin.imageUrl}
                alt={board.boardName}
              />
              <h1>{board.boardName}</h1>
            </Link>
          ))
        ) : (
          <p>No boards found</p>
        )}
      </div>
    </div>
  )
}

export default page