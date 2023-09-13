"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Dropdown = () => {
  return (
    <div className="flex flex-col items-start z-10 top-14 bg-white rounded-lg p-2 gap-2 absolute">
      <Link href='/idea-pin-builder' className="hover:bg-gray-300 rounded-lg px-2 w-full">Create Idea Pin</Link>
      <Link href='/pin-builder' className="hover:bg-gray-300 rounded-lg px-2 w-full">Create Pin</Link>
    </div>
  )
}


const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  console.log(toggleDropdown)

  return (
    <nav className="my-2 flex w-full gap-3">
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
          <Dropdown />
        ) : (
          ''
        )}
      </div>
      <input 
        placeholder="Search"
        type="text"
        className="rounded-full w-2/3 flex-grow pl-3"
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
      <Image 
        src='/assets/icons/profile-icon.png'
        alt='Profile'
        width={25}
        height={25}
        className="rounded-full bg-white"
      />
    </nav>
  )
}

export default Nav