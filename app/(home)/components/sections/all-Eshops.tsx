"use client"
import { IoIosArrowBack } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useState } from "react";
import EshopsCardCarsoul from "../EshopsCardCarsoul";
import { Shop, Store } from "@/types/storeTypes";

const AllEShops = ({ AllEShops }: { AllEShops: { data: { items: { items: Shop[] } } } }) => {
  const [IsHover, setIsHover] = useState(true);

  console.log("AllEShops: ");
  console.log(AllEShops);

  return (
    <div className="bg-[#F8F8F8] w-full">
      <div className="xl:container mx-auto relative">
        <div className="mx-4 pt-10">
          <h1 className="text-[#333333] text-[24px]">جميع المتاجر</h1>
          <p className="text-[16px] text-[#666666]">
            تسوق احدث المنتجات المميزة المضافة جديد
          </p>
        </div>
        <div className="mx-2">
          <Carousel
            dir="rtl"
            className="m-auto w-[100%]"
            onMouseEnter={() => {
              setIsHover(false);
            }}
            onMouseLeave={() => {
              setIsHover(true);
            }}
            opts={{
              direction: "rtl",
            }}
            plugins={[
              Autoplay({
                delay: 1500,
                active: IsHover,
              }),
            ]}
          >
            <div className="absolute rotate-180 left-16 -top-10 flex items-center justify-center z-10">
              <CarouselPrevious className=" -left-6 text-[#F58634]" />
              <CarouselNext className=" text-[#F58634]" />
            </div>
            <CarouselContent>
              {AllEShops?.data?.items?.items?.map((shop: Shop) => (
                <CarouselItem
                  key={shop.id}
                  dir="rtl"
                  className="group hover:cursor-pointer flex items-center pl-0 ml-4 xl:basis-1/3 mdHalf:basis-1/2 basis-1/1 border border-gray-300 rounded-sm bg-white sm:w-[520px] w-[90vw] hover:border-[#F58634] transition-all duration-700"
                >
                  <EshopsCardCarsoul
                    name={shop.name}
                    description={shop.description}
                    urlLinkOfStore={shop.urlLinkOfStore}
                    logo={shop.logo}
                    id={shop.id}
                    ecommerceStoreImages={shop.ecommerceStoreImages}
                    key={shop.id}
                    categories={shop.categories}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default AllEShops;
