"use client";

import Image from "next/image";

const ImageGallery = ({ image }: { image: any }) => {
  // const [activeImage, setActiveImage] = useState(images[0]);

  // const productImages = [
  //   "/images/01.svg",
  //   "/images/02.svg",
  //   "/images/03.svg",
  //   "/images/04.svg",
  //   "/images/05.svg",
  //   "/images/06.svg",
  // ];
  return (
    <div className="flex flex-col">
      <Image
        src={image}
        width={100}
        height={80}
        alt="Product"
        className="w-full h-[450px] object-cover border-1 border-gray-400 px-8"
      />
      {/* <div className="flex gap-2 mt-4 justify-center">
        {productImages.map((img, index:number) => (
          <Image
            key={index}
            src={img}
            width={84}
            height={84}
            alt="Thumbnail"
            className={`w-16 h-16 rounded cursor-pointer ${activeImage === img ? 'border-1 border-orange-500' : ''}`}
            onClick={() => setActiveImage(img)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default ImageGallery;
