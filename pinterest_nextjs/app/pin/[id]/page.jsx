"use client"

import { useSearchParams } from "next/navigation"

const page = () => {
  const searchParams = useSearchParams();
  const pinId = searchParams.get('id')
  console.log(pinId)

  return (
    <div>Pin details</div>
  )
}

export default page