"use client";

import Image from "next/image";
import { useState } from "react";

const ImageGallery = ({ images }: { images: string[] }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col">
      {/* Main Image Display */}
      <Image
        src={activeImage}
        width={400}
        height={50}
        alt="Product"
        className="object-cover border-1 border-gray-400 px-8"
      />

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 justify-center">
        {images?.slice(0, 3).map((img, index: number) => (
          <Image
            key={index}
            src={img}
            width={84}
            height={84}
            alt="Thumbnail"
            className={`w-16 h-16 rounded cursor-pointer ${
              activeImage === img ? 'border-1 border-orange-500' : ''
            }`}
            onClick={() => setActiveImage(img)} 
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
