// app/components/AdsCarousel.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface AdsCarouselProps {
  images: string[];
}

export default function AdsCarousel({ images }: AdsCarouselProps) {
  return (
    <div className="lg:container mx-auto">
      <div className="w-full mdHalf:p-4 p-2">
        <Carousel
          className="rounded-xl "
          opts={{
            direction: "rtl",
          }}
        >
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full pb-[27%] rounded-xl overflow-hidden"> 
                  <Image
                    src={src}
                    alt={`Ad ${index + 1}`}
                     fill
                    className="object-cover rounded-xl overflow-hidden"
                    sizes="(max-width: 1024px) 100vw, 1290px"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mdHalf:block hidden">
            <CarouselNext className="-right-6 bg-zinc-100 border-white border-4 opacity-100 w-16 h-16" />
            <CarouselPrevious className="-left-6 bg-zinc-100 border-white border-4 opacity-100 w-16 h-16" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
