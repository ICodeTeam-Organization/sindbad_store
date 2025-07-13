"use client";

import { useState } from "react";
import SafeImage from "@/components/SafeImage";

const ImagesViewr = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center mx-5 w-[300px]" style={{ direction: "ltr" }}>
      {images.length > 0 ? (
        <div className="w-full" >
          {/* Main Image */}
          <div className="aspect-square w-[300px]">
            <SafeImage
              src={selectedImage}
              alt="الصورة الرئيسية للمنتج"
              width={300}
              height={300}
              className="w-full h-full rounded object-cover border border-gray-200"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex  overflow-x-auto space-x-2 p-2">
  {images.map((img, index) => (
    <button
      key={index}
      onClick={() => setSelectedImage(img)}
      className={`border rounded overflow-hidden w-16 h-16 flex-shrink-0 relative ${
        selectedImage === img ? "border-blue-500" : "border-gray-200"
      }`}
    >
      <SafeImage
        src={img}
        alt={`صورة مصغرة ${index + 1}`}
        fill
        className="w-full h-full object-cover" width={0} height={0}      />
    </button>
  ))}
</div>

        </div>
      ) : (
        <div className="text-center text-gray-500 aspect-square w-[300px] flex items-center justify-center border rounded-sm">لا توجد صور متوفرة</div>
      )}
    </div>
  );
};

export default ImagesViewr;
