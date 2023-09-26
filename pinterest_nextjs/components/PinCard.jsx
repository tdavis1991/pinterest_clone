import Image from "next/image";

const PinCard = ({ image }) => {
  return (
    <div className="flex flex-col">
      <Image 
        src={image}
        width={50}
        height={50}
        className="rounded-xl"
      />
    </div>
  )
}

export default PinCard