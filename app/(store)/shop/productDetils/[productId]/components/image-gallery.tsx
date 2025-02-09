"use client";

import { useState, useEffect } from "react";
import SafeImage from "@/components/SafeImage";

const ImageGallery = ({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length,activeIndex]);

  return (
    <div className="flex flex-col mx-5" style={{ direction: "ltr" }}>
      {images.length > 0 ? (
        <>
          <div className="flex justify-center overflow-hidden relative mdHalf:w-[400px] h-[360px] rounded-lg">
            <div
              className="w-full h-full flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {images.map((img, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <SafeImage
                    src={img}
                    alt="صور للمنتج"
                    width={400}
                    height={360}
                    className="w-full h-full object-contain rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div dir="rtl" className="flex w-full overflow-x-auto   space-x-2 gap-x-3 mt-4 p-2 scrollbar-hide">
            {images.map((ele, ix) => (
              <div
                key={ix}
                className={`flex p-2 min-w-[80px] h-[80px] border rounded-lg cursor-pointer transition-all duration-300 ${activeIndex === ix ? 'border-orange-500 scale-105' : ''}`}
                onClick={() => setActiveIndex(ix % images.length)}
              >
                <SafeImage
                  src={ele}
                  alt={"صور للمنتج" + ix}
                  width={80}
                  height={80}
                  className="w-[70px] h-[70px] object-contain rounded"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 w-full border flex items-center justify-center h-[350px] rounded-lg">
          لا توجد صور متوفرة
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
