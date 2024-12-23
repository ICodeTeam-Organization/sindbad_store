import React from "react";
import Image from "next/image";
import { StoreData } from "../../../typest";
import { IoMdHeartEmpty } from "react-icons/io";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


const StoreDetailsCard = ({
  id,
  name,
  description,
  imageUrl,
  websiteUrl,
  storeCategoriesIds,
  images,
}: StoreData) => {
  return (
    <div className="rounded-lg shadow-lg p-6 w-full  mx-auto container mt-5">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          <SafeImage
            src={imageUrl}
            alt={name}
            className="w-full h-[350px] object-cover rounded-lg border shadow-sm"
            width={400}
            height={350}
          />
          {images && images.length > 0 && (
            <div className="px-12">
                        <Carousel className="mt-4">
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.id} className="sm:basis-1/2 md:basis-1/3">
                  <SafeImage
                    src={image.imageUrl}
                    alt={name}
                    className="object-cover rounded-lg border shadow-sm"
                    width={380}
                    height={250}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
            </div>
        )}
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 w-full text-gray-800 mt-10">
          <h2 className="text-2xl font-bold mb-4">{name}</h2>
          <p className="text-gray-600 mb-4 text-sm">{description}</p>

          {storeCategoriesIds && storeCategoriesIds.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {storeCategoriesIds.map((category) => (
                <span
                  key={category.id}
                  className=" text-gray-800 text-sm px-3 py-1 rounded-md"
                >
                  {category.categoryName}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <span className="font-bold text-yellow-500">50 <span className="font-normal text-sm">مشتري</span></span>
            <div className="flex items-center gap-4">

              <Link
                href={websiteUrl || "#"}
                target={websiteUrl ? "_blank" : ""}
                className={` px-2 py-2 rounded-lg text-sm text-white ${
                  websiteUrl ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {websiteUrl ? "موقع المتجر" : " لايوجد رابط"}
              </Link>
              <button className="bg-red-500 text-white rounded-full p-3 hover:bg-red-600">
                <IoMdHeartEmpty className="w-5 h-5" />
              </button>
            </div>
          </div>

          <Link
            href={"/shop?storeId=" + id}
            className="mt-6 inline-block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg"
          >
            عرض المنجات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailsCard;
