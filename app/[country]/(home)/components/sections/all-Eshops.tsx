"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import EshopsCardCarsoul from "../EshopsCardCarsoul";
import { Shop } from "@/types/storeTypes";

const AllEShops = ({
  AllEShops,
}: {
  AllEShops: { data: { items: Shop[] } };
}) => {
  return (
    <div className="bg-[#F8F8F8] w-full pb-6">
      <div className=" pb-6 px-4"> 
        <div className="xl:container mx-auto relative">
          <div className=" pt-10 mb-5">
            <h1 className="text-[#333333] text-lg">جميع المتاجر</h1>
            <p className="text-base text-[#666666]">
              تسوق احدث المنتجات المميزة المضافة جديد
            </p>
          </div>
          <div className="">
            <Carousel
              dir="rtl"
              className="m-auto  w-[100%]"
              opts={{
                direction: "rtl",
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnMouseEnter: true,
                  stopOnFocusIn: true,
                }),
              ]}
            >
              <div className="absolute  left-9 -top-10 flex items-center justify-center z-10 ">
                <CarouselPrevious className=" -left-6 text-[#F58634] p-2" />
                <CarouselNext className="  text-[#F58634] p-2" />
              </div>
              <CarouselContent>
                {AllEShops?.data?.items?.map((shop: Shop) => (
                  <CarouselItem
                    key={shop.id}
                    dir="rtl"
                    className="group overflow-hidden hover:cursor-pointer flex items-center pl-0  ml-4 xl:basis-[32%] mdHalf:basis-1/2 basis-1/1 border-[1px] border-gray-300 rounded-sm bg-white sm:w-[520px] w-[90vw]   hover:border-[#F58634] transition-all duration-700"
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
                      coupon={shop.coupon}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEShops;
