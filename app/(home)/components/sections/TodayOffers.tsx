import { AiOutlineHeart } from "react-icons/ai";
import React from "react";
import SectionTitle from "../SectionTitle";
import Image from "next/image";
import hero from "@/public/images/hero.jpg";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

const TodayOffers = () => {
  return (
    <>
      <div className="container mx-auto sm:px-4 xl:px-32 pt-10">
        <SectionTitle title={"عروض اليوم"} />
      </div>
      <Carousel dir="ltr" className="m-auto max-md:w-[265px] md:w-[650px] sm:w-[500px] lg:w-[930px] xl:w-[1200px]">
        <CarouselContent className="">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-0 ml-4 lg:basis-1/6 max-md:basis-1/2 md:basis-1/4  xl:basis-1/6 rounded-t-[8px] w-[230px] max-md:h-[230px] md:h-[230px] lg:h-[250px] xl:h-[280px]"
            >
              <Image
                className="h-[210px] max-md:h-[120px] md:h-[120px] xl:h-[150px] rounded-t-[8px]"
                src={hero}
                alt={""}
                width={400}
              />
              <div className="border-[1px] border-[#C3C3C3] border-t-0  max-md:h-[110px] md:h-[110px] lg:h-[130px]  xl:h-[130px]">
                <p className="line-clamp-2 font-[Tajawal] xl:pr-1 text-[#007580] text-[20px] max-md:text-[12px] md:text-[14px] text-right ">
                  <strong>
                    ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف
                  </strong>
                </p>
                <div className="max-md:mt-2 lg:mt-4 xl:mb-2 md:mt-1 text-right max-md:gap-0 md:gap-0 max-md:text-[12px] gap-[7px] flex justify-end">
                  <p className="pr-4 text-[12px] line-through">550.00</p>
                  <p className="max-md:pr-4 md:pr-4 xl:pr-7 text-[#F55157]">
                    <strong>450.00</strong>
                  </p>
                </div>
                <div className="flex justify-around items-center absolute bottom-0">
                  <div className="max-md:mr-3 md:mr-2  max-md:w-[35px] md:w-[40px] max-md:h-[33px] lg:h-[40px] md:h-[33px] max-md:ml-1 xl:ml-2 xl:w-[40px] md:ml-1 hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:my-1 md:my-1 w-[41px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
                    <AiOutlineHeart
                      className=" w-[20px] h-[20px]"
                      color="#D5D5D5"
                    />
                  </div>
                  <div className=" mr-1 max-md:w-[80px] xl:w-[150px] md:w-[105px] lg:w-[120px] max-md:h-[33px] lg:h-[40px] md:h-[33px] max-md:text-[12px] md:text-[12px] w-[159px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center hover:bg-[#F55157] hover:text-white transition-all duration-700">
                    <p>اضف للسلة</p>
                    <MdOutlineLocalGroceryStore className="w-[17.39px] h-[15px]" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default TodayOffers;
