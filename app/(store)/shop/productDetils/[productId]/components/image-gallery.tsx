"use client";

import SafeImage from "@/components/SafeImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ImageGallery = ({ images }: { images: string[] }) => {
  return (
    <div className="flex flex-col mx-5" style={{ direction: "ltr" }}>
      {images.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index} style={{ height: "400px" }}>
                <SafeImage
                  src={img}
                  alt="صور للمنتج"
                  width={400}
                  height={400}
                  className={`w-full h-full rounded cursor-pointer`}
                  style={{ objectFit: "fill" }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="text-center text-gray-500">
          لا توجد صور متوفرة
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

       {/* Main Image Display */}
      {/* <Image
        src={activeImage}
        width={400}
        height={50}
        alt="Product"
        className="object-cover border-1 border-gray-400 px-8"
      />


      <div className="flex gap-2 mt-4 justify-center">
        {images?.slice(0, 3).map((img, index: number) => (
          <Image
            key={index}
            src={img}
            width={84}
            height={84}
            alt="Thumbnail"
            className={`w-16 h-16 rounded cursor-pointer ${activeImage === img ? 'border-1 border-orange-500' : ''
              }`}
            onClick={() => setActiveImage(img)}
          />
        ))}
      </div> */}
