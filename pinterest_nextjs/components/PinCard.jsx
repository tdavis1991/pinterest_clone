import { CldImage } from 'next-cloudinary';
import Link from 'next/link';

const PinCard = ({ image, description, id }) => {

  return (
    <Link href={`/pin/${id}`} className="rounded-lg">
      <CldImage 
        width={250}
        height={800}
        src={image}
        alt={description}
      />
    </Link>
  )
}

export default PinCard;