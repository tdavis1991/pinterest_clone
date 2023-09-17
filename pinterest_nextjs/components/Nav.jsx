"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  console.log(session)



  const signedIn = false;

  useEffect(() => {
    const setupProviders = async () => {
      const res = await getProviders();
      console.log(res, 'RES')

      setProviders(res);
    }

    setupProviders();
  }, [])

  console.log(providers, 'PROVIDERS')

  return (
    <nav className="my-2 w-full">

      {session?.user ? (
        <div className="flex w-full gap-3">
          <Link href='/'>
            <Image 
              src='/assets/icons/pinterest-logo.png'  
              alt='Pinterest Logo'
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>
          <Link href='/' className="bg-black rounded-full px-3 py-2 text-lg text-white">Home</Link>
          <div className="flex flex-col justify-center">
            <button className="flex items-center text-lg" onClick={() => setToggleDropdown(prevToggleDropdown => !prevToggleDropdown)}>
              Create
              <span>
                <Image 
                  src='/assets/icons/down-arrow-icon.png'
                  alt='down arrow'
                  width={20}
                  height={20}
                />
              </span>
            </button>
            {toggleDropdown ? (
                <div className="flex flex-col items-start z-10 top-14 bg-white rounded-lg p-2 gap-2 absolute">
                  <Link onClick={() => setToggleDropdown(prevToggleDropdown => !prevToggleDropdown)} href='/idea-pin-builder' className="hover:bg-gray-300 rounded-lg px-2 w-full">Create Idea Pin</Link>
                  <Link onClick={() => setToggleDropdown(prevToggleDropdown => !prevToggleDropdown)} href='/pin-builder' className="hover:bg-gray-300 rounded-lg px-2 w-full">Create Pin</Link>
                </div>
            ) : (
              ''
            )}
          </div>
          <input 
            placeholder="Search"
            type="text"
            className="rounded-full w-2/3 flex-grow pl-3 bg-gray-300"
          />
          <Image 
            src='/assets/icons/bell-icon.png'  
            alt='Bell icon'
            width={30}
            height={30}
            className="object-contain"
          />
          <Image 
            src='/assets/icons/chatBubble-icon.png'  
            alt='Bell icon'
            width={30}
            height={30}
            className="object-contain"
          />
          <div className="flex justify-center items-center w-18 mr-2">
            <Image 
              src='/assets/icons/profile-icon.png'
              alt='Profile'
              width={30}
              height={30}
              className="rounded-full bg-white"
            />
            <Image 
              src='/assets/icons/down-arrow-icon.png'
              alt='down arrow'
              width={20}
              height={20}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <Image 
              src='/assets/icons/pinterest-logo.png'  
              alt='Pinterest Logo'
              width={40}
              height={40}
              className="object-contain"
            />
            <h2>Pinterest Clone</h2>
          </div>
          <div className="flex gap-3">
            {providers && 
                Object.values(providers).map((provider) => (
                  <button 
                    type="button" 
                    key={provider.name} 
                    onClick={() => signIn(provider.id)}
                    className="bg-red-600 rounded-full px-3 py-1 text-md text-white"
                  >
                    Login
                  </button>
                ))
              }
            {/* <button className="bg-red-600 rounded-full px-3 py-1 text-md text-white">Login</button> */}
            <button className="bg-gray-300 text-black text-md rounded-full px-3 py-1">Sign Up</button>
          </div>
        </div>
      )}


    </nav>
  )
}

export default Nav