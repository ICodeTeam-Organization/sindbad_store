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
import Autoplay from "embla-carousel-autoplay"
import Link from "next/link";
import { useState } from "react";
import { Store } from "@/types/storeTypes";
import StoresCardCarsoul from "../StoresCardCarsoul";

const AllStores =  ({Allstores}:{Allstores:any}) => {
 
  
  const [IsHover, setIsHover] = useState(true)

  return (
    <div className="bg-[#F8F8F8] w-full">
     <div className="xl:container mx-auto relative" >
     <div className=" mx-4 pt-10">
        <h1 className="text-[#333333] text-[24px]">جميع المحلات</h1>
        <p className="text-[16px] text-[#666666]">
          تسوق احدث المنتجات المميزة المضافة جديد
        </p>
      </div>
      <div className="mx-2" >
      <Carousel
        dir="rtl"
        className="m-auto  w-[100%]"
        onMouseEnter={()=>{
          setIsHover(false)
        }}
        onMouseLeave={()=>{
          setIsHover(true)
        }}
        opts={{
          direction:"rtl",
          
        }}
         plugins={[
          Autoplay({
            delay: 1500,
            active:IsHover,
          }),
        ]}
      >
        <div className="absolute rotate-180 left-16 -top-10 flex items-center justify-center z-10 " >
        <CarouselPrevious className=" -left-6 text-[#F58634]"  />
        <CarouselNext className="  text-[#F58634]" />
        </div>
        <CarouselContent>
          {Allstores?.data?.map((store: Store) => (
            <CarouselItem
              key={store.id}
              dir="rtl"
              className="group overflow-hidden hover:cursor-pointer flex items-center pl-0  ml-4 xl:basis-1/3 mdHalf:basis-1/2 basis-1/1 border-[1px] border-gray-300 rounded-sm bg-white sm:w-[520px] w-[90vw]   hover:border-[#F58634] transition-all duration-700"
            >
              <StoresCardCarsoul
               description={store?.description}
               id={store?.id}
               mainImageUrl={store?.mainImageUrl}
               name={store?.name}
               websiteLink={store?.websiteLink}
               imagesUrl={store?.imagesUrl}
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

export default AllStores;
