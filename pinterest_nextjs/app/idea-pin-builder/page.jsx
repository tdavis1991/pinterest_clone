"use client"

import { CldImage } from "next-cloudinary";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <CldImage
        width="960"
        height="600"
        src="nc4d1da6cs8jcihakrr6"
        sizes="100vw"
        alt="Description of my image"
      />
    </div>
  )
}

export default page