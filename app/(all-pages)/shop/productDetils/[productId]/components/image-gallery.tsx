"use client";

import { useState, useEffect } from "react";
import SafeImage from "@/components/SafeImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ButtonAddToFavoriteOfProDetails from "./ButtonAddToFavoriteOfProDetails";
import ShareButton from "./ShareButton";

const ImageGalleryProductDetails = ({
  images,
  productId,
}: {
  images: string[];
  productId: number;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length, activeIndex]);

  return (
    <div className="  w-full h-full rounded overflow-hidden relative ">
         <div className="z-20 absolute   top-5 right-5">
            <ButtonAddToFavoriteOfProDetails id={productId} />
          </div>
          <div className="z-20 absolute   top-20 right-5">
            <ShareButton />
          </div>
      {images && images.length > 0 && (
        <Carousel
          opts={{
            direction: "rtl",
          }}
          className="relative"
        >
          <CarouselContent className="flex w-full">
            {images.map((image) => (
              <CarouselItem
                key={image}
                className="relative w-full aspect-square rounded-lg border shadow-sm"
              >
                <SafeImage
                  src={image}
                  alt={image}
                  className="object-contain rounded-lg border shadow-sm"
                  fill
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="right-2 rtl:left-2 rtl:right-auto z-10 text-primary-background  h-10  w-10 border-primary-background" />
          <CarouselNext className="left-2 rtl:right-2 rtl:left-auto z-10  text-primary-background  h-10  w-10 border-primary-background" />
        
        </Carousel>
      )}
    </div>
  );
  // return (
  //   <div className="flex flex-col mx-5" style={{ direction: "ltr" }}>
  //     {images.length > 0 ? (
  //       <>
  //         <div className="flex justify-center overflow-hidden relative  h-[360px] rounded-lg border">
  //           <div
  //             className="w-full h-full flex transition-transform duration-500 ease-in-out "
  //             style={{ transform: `translateX(-${activeIndex * 100}%)` }}
  //           >
  //             {images.map((img, index) => (
  //               <div key={index} className="w-full  flex-shrink-0">
  //                 <SafeImage
  //                   src={img}
  //                   alt="صور للمنتج"
  //                   width={300}
  //                   height={360}
  //                   className="w-full h-full object-contain rounded cursor-pointer"
  //                 />
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //         <div dir="rtl" className="flex w-full overflow-x-auto    space-x-2 gap-x-3 mt-4 p-2 scrollbar-hide">
  //           {images.map((ele, ix) => (
  //             <div
  //               key={ix}
  //               className={`flex p-2 aspect-square h-[80px] border rounded cursor-pointer transition-all duration-300 ${activeIndex === ix ? 'border-orange-500 scale-105' : ''}`}
  //               onClick={() => setActiveIndex(ix % images.length)}
  //             >
  //               <SafeImage
  //                 src={ele}
  //                 alt={"صور للمنتج" + ix}
  //                 width={80}
  //                 height={80}
  //                 className="w-[70px] h-[70px] object-contain rounded"
  //               />
  //             </div>
  //           ))}
  //         </div>
  //       </>
  //     ) : (
  //       <div className="text-center text-gray-500 w-full border flex items-center justify-center h-[350px] rounded-lg">
  //         لا توجد صور متوفرة
  //       </div>
  //     )}
  //   </div>
  // );
};

export default ImageGalleryProductDetails;
