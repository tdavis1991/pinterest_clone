"use client"

import Image from "next/image";


const Nav = () => {
  return (
    <nav className="m-2 flex w-full">
      <Image 
        src='/assets/icons/pinterest-logo.png'  
        alt='Pinterest Logo'
        width={40}
        height={40}
        className="object-contain"
      />
      <button className="bg-black rounded-full px-3 py-2 text-lg mx-3 text-white">Home</button>
      <input 
        placeholder="Search"
        type="text"
        className="rounded-full w-2/3"
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
    </nav>
  )
}

export default Nav