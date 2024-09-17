'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageGalleryProps } from '../types';

const ImageGallery = ({ images } : ImageGalleryProps) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col">
      <Image src={activeImage} width={100} height={80} alt="Product" className="w-full h-[450px] object-cover border-1 border-gray-400 px-8" />
      <div className="flex gap-2 mt-4 justify-center">
        {images.map((img, index:number) => (
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
      </div>
    </div>
  );
};

export default ImageGallery;
