"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";

import Modal from '@/components/Modal';

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [pin, setPin] = useState({
    title: '',
    description: '',
    imageUrl: '',
    board: '', 
  });

  const { data: session } = useSession();
  console.log(pin, 'PIN')

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/user/${session?.user.id}`);
      const data = await response.json();
  
      setUser(data);
    };

    if(session?.user.id) fetchUser();
  }, [session])

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    setPin({...pin, imageUrl: file})
  };

  const createPin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/pin/new', {
        method: 'POST',
        body: JSON.stringify({
          title: pin.title,
          description: pin.description || '',
          imageUrl: pin.imageUrl,
          board: pin.board || '',
          userId: session?.user.id,
        })
      })

      if(res.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gray_bg p-24">
      <div className='shawdow-md w-3/4 flex flex-col h-3/4 border-blue-200 border-2 bg-white p-4 rounded-md'>
        <div className='flex justify-between items-center'>
          <Image 
            src='/assets/icons/dots-icon.png'  
            alt='Pinterest Logo'
            width={40}
            height={40}
            className="object-contain"
          />
            {user.boards && user.boards.length > 0 ? (
              <div className='w-1/4 flex'>
                <select className='w-3/4 gray_bg rounded-l-md px-1 py-2' value={pin.board} onChange={(e) => setPin({ ...pin, board: e.target.value })}>
                  {user.boards.map((board, i) => (
                    <option key={i} value={board.name}>{board.name}</option>
                  ))
                  }
                </select>
                <button onClick={createPin} className='cta_btn w-1/4 text-white rounded-r-md'>Save</button>
              </div>
              ) : (
                <div className='w-1/4'>
                  <button onClick={() => setOpenModal(prevModal => !prevModal)} className='cta_btn w-full py-2 text-white rounded-md'>Create a board</button>
                  {openModal && <Modal onClose={toggleModal} setPin={setPin} pin={pin} onSubmit={createPin} />}
                </div>
              )}
        </div>
        <div className='flex w-full justify-between'>
          <div className='flex flex-col flex-2'>
            <CldUploadWidget 
              uploadPreset="gxoon7ry"
              onSuccess={(result) => setPin({ ...pin, imageUrl: result.info.public_id })}
            >
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <button className="button" onClick={handleOnClick}>
                    Upload an Image
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
          <div className='flex flex-col gap-10 flex-1 border-red-200 border-2'>
            <input 
              type='text'
              value={pin.title}
              onChange={(e) => setPin({ ...pin, title: e.target.value })}
              placeholder='Add Title'
              required
            />
            <div className='flex'>
              <Image 
                src={session?.user ? session?.user.image : '/assets/icons/profile-icon.png'}
                alt='Profile'
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className='flex flex-col'>
                <p>{session?.user.name}</p>
                <p>{session?.user.email}</p>
              </div>
            </div>
            <input 
              type='text'
              value={pin.description}
              onChange={(e) => setPin({ ...pin, description: e.target.value })}
              placeholder='Tell everyone what your pin is about'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page