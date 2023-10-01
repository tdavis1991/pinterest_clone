import Image from "next/image";

const PinCard = ({ image, title }) => {
  return (
    <div className="flex flex-col">
      {/* <Image 
        src={image}
        width={50}
        height={50}
        className="rounded-xl"
      /> */}
      <h1>{title}</h1>
    </div>
  )
}

export default PinCard