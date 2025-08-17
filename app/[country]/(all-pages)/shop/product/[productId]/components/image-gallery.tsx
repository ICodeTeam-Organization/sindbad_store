// "use client";

// // import { useState, useEffect } from "react";
// import SafeImage from "@/components/SafeImage";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   // CarouselNext,
//   // CarouselPrevious,
// } from "@/components/ui/carousel";
// // import ButtonAddToFavoriteOfProDetails from "./ButtonAddToFavoriteOfProDetails";
// // import ShareButton from "./ShareButton";

// const ImageGalleryProductDetails = ({
//   images,
//   // productId,
// }: // blurHash
// {
//   images: string[];
//   // productId: number;
//   blurHash?: string;
// }) => {
//   return (
//     <div className="  w-full h-full rounded overflow-hidden relative ">
//       {/* <div className="z-20 absolute top-5 right-5">
//         <ButtonAddToFavoriteOfProDetails id={productId} />
//       </div>
//       <div className="z-20 absolute top-20 right-5">
//         <ShareButton />
//       </div> */}
//       {images && images.length > 0 && (
//         <Carousel
//           opts={{
//             direction: "rtl",
//           }}
//           className="relative"
//         >
//           <CarouselContent className="flex w-full">
//             {images.map((image) => (
//               <CarouselItem
//                 key={image}
//                 className="relative w-full aspect-square rounded-lg overflow-hidden bg-bg-50 shadow-sm"
//               >
//                 <SafeImage
//                   src={image}
//                   alt={image}
//                   className="object-contain rounded-lg  shadow-sm"
//                   fill
//                 />
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           {/* <CarouselPrevious className="right-2 rtl:left-2 rtl:right-auto z-10 text-primary-background  h-10  w-10 border-primary-background" />
//           <CarouselNext className="left-2 rtl:right-2 rtl:left-auto z-10  text-primary-background  h-10  w-10 border-primary-background" /> */}
//         </Carousel>
//       )}
//     </div>
//   );
// };

// export default ImageGalleryProductDetails;

"use client";
 
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import SafeImage from "@/components/SafeImage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageGalleryProductDetails = ({ images }: { images: string[] }) => {
  const mainSliderRef = useRef<Slider | null>(null);
  const thumbSliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings: import("react-slick").Settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    arrows: false,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };
  const thumbSettings: import("react-slick").Settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: false,
    infinite: false,
    speed: 500,
    swipeToSlide: true,
    arrows: true,
    beforeChange: (_: number, next: number) => {
      mainSliderRef.current?.slickGoTo(next);
    },
  };
  return (
    <div className="w-full h-full rounded overflow-hidden relative">
      {images && images.length > 0 && (
        <Slider {...settings} ref={mainSliderRef}>
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full aspect-square rounded-lg overflow-hidden bg-bg-50 shadow-sm"
            >
              <SafeImage
                src={image}
                alt={image}
                className="object-contain rounded-lg shadow-sm"
                fill
              />
            </div>
          ))}
        </Slider>
      )}

      {/* Thumbnails */}
      <div className="w-full mt-2 ">
        <Slider {...thumbSettings} ref={thumbSliderRef}>
          {images.map((image, idx) => (
            <div
              key={idx}
              onClick={() => mainSliderRef.current?.slickGoTo(idx)}
            >
              <div
                className={`aspect-square m-[2px] relative overflow-hidden rounded bg-bg-50 border ${
                  currentSlide === idx ? "border-primary" : "border-transparent"
                }`}
              >
                <SafeImage
                  src={image}
                  alt={`Thumbnail ${idx + 1}`}
                  className="object-cover"
                  fill
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageGalleryProductDetails;
