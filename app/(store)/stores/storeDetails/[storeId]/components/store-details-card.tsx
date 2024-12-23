import React from "react";
import Image from "next/image";
import { StoreData } from "../../../typest";
import { IoMdHeartEmpty } from "react-icons/io";
import SafeImage from "@/components/SafeImage";
// import { Link } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const StoreDetailsCard = ({id,
  name ,
  description,
  imageUrl,
  websiteUrl,
  storeCategoriesIds,
  images,
  createdAt,
  updatedAt }: StoreData) => {
  return (
    <div className="border px-12 py-6 rounded-lg shadow-sm relative w-full  m-auto text-center">
            <SafeImage
          src={imageUrl}
          alt={name}
          className="w-full h-[400px] object-cover rounded-lg border shadow-md"
          width={380}
          height={250}
      />
      <div className="m-4">
        <h2 className="font-bold mt-2 text-center">{name}</h2>
        <p className="text-gray-extr-light mt-2">{description}</p>
        {storeCategoriesIds? (
        <p className="text-gray-extr-light mt-2">{
          storeCategoriesIds?.map((category) => (
            <span key={category.id} className="border-2 border-gray-300 px-2 py-1 text-sm rounded-md">
              {category.categoryName}
            </span>
        ))}</p>
        ): null
      }

      {
        images? (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.id} className="sm:basis-1/2 lg:basis-1/3">
                  <SafeImage
                    src={image.imageUrl}
                    alt={name}
                    className="w-full h-[400px] object-cover rounded-lg border shadow-md"
                    width={380}
                    height={250}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : null
      }

        <div className="flex flex-wrap justify-evenly items-center w-full mt-6 px-4">
          <Link href={"/shop?storeId="+id} className="flex-1 min-w-[70px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            منتجات المتجر
          </Link>
          {
            websiteUrl != null?
          <Link href={websiteUrl} target="_blank" className="flex-1 min-w-[70px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            متجر المحل
          </Link> :
            <button className="flex-1 min-w-[70px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            لايوجد رابط
          </button>
          }
          <button className="flex-1 min-w-[40px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            <IoMdHeartEmpty className="w-4 h-4 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailsCard;