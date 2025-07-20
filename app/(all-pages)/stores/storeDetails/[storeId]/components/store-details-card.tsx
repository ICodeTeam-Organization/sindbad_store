import React from "react";
import { StoreData } from "../../../typest";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { goToExtrnalLink } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AddStoreToFavBtn from "./AddStoreToFavBtn";
const StoreDetailsCard = ({
  id,
  name,
  description, 
  websiteUrl,
  storeCategoriesIds,
  images,
}: StoreData) => {
  return (
    <div className=" p-6 w-full mx-auto xl:container mt-5">
      <div className="flex flex-col mdHalf:flex-row gap-6">
        {/* Image Section */}
        <div className="lg:w-1/2 w-full aspect-video relative">
          {/* <SafeImage
            src={imageUrl}
            alt={name}
            className="w-full h-[350px] aspect-video object-cover rounded-lg border shadow-sm"
            fill
          /> */}
          {images && images.length > 0 && (
            <div className="px-12">
              <Carousel className="mt-4">
                <CarouselContent>
                  {images.map((image) => (
                    <CarouselItem
                      key={image.id}
                      className="w-full h-[350px] aspect-video object-cover rounded-lg border shadow-sm"
                    >
                      <SafeImage
                        src={image.imageUrl}
                        alt={name}
                        className="w-full h-[350px] aspect-video object-cover rounded-lg border shadow-sm"
                        fill
                        width={0}
                        height={0}
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
        <div className="lg:w-1/2 w-full text-gray-800 mt-0  flex flex-col">
          <h2 className="text-2xl font-bold mb-4">{name}</h2>
          <p className="text-gray-600 mb-4 text-sm">{description}</p>

          <p className="text-sm font-bold m-1"> فئات المحل </p>
          {storeCategoriesIds && storeCategoriesIds.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {storeCategoriesIds.map((category) => (
                <span
                  key={category.id}
                  className="text-gray-800 bg-zinc-100 m-1 text-sm px-3 py-1 rounded-md"
                >
                  {category.categoryName}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto">
            <div className="flex items-center justify-between mt-6 ">
              {/* <span className="font-bold text-yellow-500">
                {" "}
                <span className="font-normal text-sm"></span>
              </span> */}
              <div className="flex items-center gap-4">
                <AddStoreToFavBtn id={id} />
                <Link
                  href={goToExtrnalLink(websiteUrl) || "#"}
                  target={websiteUrl ? "_blank" : ""}
                  className={`px-2 py-3 rounded-md text-sm  ${
                    false
                      ? "text-primary-background underline"
                      : "text-gray-400 border cursor-not-allowed"
                  }`}
                >
                  {false
                    ? "الموقع الإلكتروني للمحل"
                    : "لا يوجد موقع الكتروني للمحل"}
                </Link>
              </div>
            </div>

            <Link
              href={"/shop?storeId=" + id}
              className="mt-6 inline-block w-full text-center text-base  bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg"
            >
              عرض منتجات المحل
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailsCard;
