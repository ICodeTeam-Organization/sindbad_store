"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductCard from "@/components/product_card/ProductCard";
import { NormalizedProductType } from "@/Data/normalizTypes";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

const NewProductCarousel = ({
  products = [],
  sectionTitle,
  sectionHref,
}: {
  products: NormalizedProductType[];
  sectionTitle: string;
  sectionHref?: string;
}) => {
  return (
    <div dir="rtl" className="lg:container mx-auto sm:p-4 p-2">
      <div className="pt-5 w-full">
        <div className="flex flex-col justify-center items-center mb-5">
          <h3 className="lg:text-lg text-base font-bold relative p-3">
            {sectionTitle}
          </h3>
          <div className="w-[150px] h-[2px] rounded-full bg-primary" />
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          direction: "rtl",
          loop: products.length > 6,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full relative"
      >
        <CarouselContent className="py-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className=" px-2"
            >
              <ProductCard data={product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {products.length > 2 && (
          <div className="hidden md:block">
            <CarouselNext className="absolute top-[50%] -translate-y-1/2 -right-4 bg-white shadow-lg w-10 h-10 z-10 text-primary" />
            <CarouselPrevious className="absolute top-[50%] -translate-y-1/2 -left-4 bg-white shadow-lg w-10 h-10 z-10 text-primary" />
          </div>
        )}
      </Carousel>

      {sectionHref && (
        <div className="flex items-center justify-center my-4 border-b mt-8">
          <Link href={sectionHref}>
            <button className="btn bg-secondary flex items-center gap-x-4 text-sm p-3 rounded-t-md text-white group">
              <h3 className="text-xs md:text-sm -translate-y-[1px] transition duration-500 pr-1">
                عرض المزيد
              </h3>
              <IoIosArrowBack className="transition duration-500 text-lg" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NewProductCarousel;
