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
          {Allstores?.data?.map((store: any) => (
            <CarouselItem
              key={store.id}
              dir="rtl"
              className="group hover:cursor-pointer flex items-center pl-0  ml-4 xl:basis-1/3 mdHalf:basis-1/2 basis-1/1 border-[1px] border-gray-300 rounded-sm bg-white sm:w-[520px] w-[90vw]   hover:border-[#F58634] transition-all duration-700"
            >
              <div className=" flex justify-center items-center mdHalf:w-[196px] mdHalf:h-[140px] w-[156px] h-[100px] relative">
                {store.mainImageUrl === null ? (
                  <h1>لاتوجد صورة للمتجر</h1>
                ) : (
                  <Image
                    src={store?.mainImageUrl?.startsWith("http")?store.mainImageUrl:"/"+store.mainImageUrl}
                    alt={"store"}
                    layout="fill"
                  />
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between h-full py-2">
                <div>
                    <h1 className="mdHalf:text-md text-sm font-bold text-right line-clamp-1 mt-1">
                      {store.name} 
                    </h1>
                    <p className="mdHalf:text-sm text-[11px]  line-clamp-1 text-[#666666]">
                      {store.description ? store.description : " ."}
                    </p>
                    <div className="flex items-center  max-sm:w-20 mb-1">
                      <AiFillStar className="text-[#FFC62A] text-xs" />
                      <AiFillStar className="text-[#FFC62A] text-xs" />
                      <AiFillStar className="text-[#FFC62A] text-xs" />
                      <AiFillStar className="text-[#FFC62A] text-xs" />
                      <AiFillStar className="text-[#D6D6D6] text-xs" />
                      <p className="text-[#A5A5A5] text-[12px] mr-3">
                        (4.5)
                      </p>
                    </div>
                </div>
                {store.websiteLink === null ? (
                 <div className=" w-[96%] p-2  cursor-pointer   rounded-sm border-[1px] group-hover:border-0 group-hover:bg-[#F58634] group-hover:text-white group-hover:border-transparent transition-all duration-300 flex justify-center items-center border-black">
                 <h1 className="text-base">
                   لا يوجد رابط للمتجر
                 </h1>
                 <IoIosArrowBack />
               </div>
                ) : (
                  <Link href={store.websiteLink}>
                    <div className=" w-[96%] p-2 cursor-pointer  rounded-sm border-[1px] group-hover:border-0 group-hover:bg-[#F58634] group-hover:text-white group-hover:border-transparent transition-all duration-300 flex justify-center items-center border-black">
                      <h1 className="text-base">
                        زيارة المتجر
                      </h1>
                      <IoIosArrowBack />
                    </div>
                  </Link>
                )}
              </div>
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
