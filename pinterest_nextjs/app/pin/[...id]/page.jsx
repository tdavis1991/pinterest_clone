"use client"

import { useState, useEffect } from "react";
import { CldImage } from 'next-cloudinary';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

const page = ({ params }) => {
  const router = useRouter();
  const [pin, setPin] = useState({});
  const [user, setUser] = useState({});
  const { data: session } = useSession();

  const pinId = params.id

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${session?.user?.id}`);
      const data = await res.json();
      setUser(data.existingUser) 
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

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this pin?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/pin/${params.id}`, {
          method: "DELETE",
        });

        // const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        // setMyPosts(filteredPosts);
        router.push('/')
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(session?.user, 'PIN DETAILS SESSION')

  

  return (
    <div className="w-11/12 h-screen flex flex-col justify-center items-center">
      <div className="rounded-xl shadow-xl flex w-2/3 border-gray-200 border">
        <div>
          <CldImage 
            width={600}
            height={600}
            src={pin.imageUrl}
            alt={pin.description}
          />
        </div>
        <div className="flex flex-col flex-1 items-center">
          <div className="flex m-3">
            {session?.user && (
                <select className=' px-1 py-2'>
                  <option>Create Board</option>
                  {user?.boards?.map((board, i) => (
                    <option key={i} value={board?.name?.toLowerCase()}>{board?.name}</option>
                  ))}
                </select>
              )}
              <button className="cta_btn rounded-full mx-2 px-5 py-2 text-white">Save</button>
              {user?._id != session?.user.id && <button className="rounded-full px-5 py-2 text-black bg-gray-300" onClick={handleDelete}>Delete</button>}
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
          <h2>Comments</h2>
        </div>

      </div>
    </div>
  )
}

export default page