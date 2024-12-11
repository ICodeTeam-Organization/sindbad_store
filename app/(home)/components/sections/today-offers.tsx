"use client";
import SectionTitle from "../section-title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useState } from "react";
import ProductCard from "../product-card";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/types/storeTypes";

const TodayOffers = ({
  Offersproducts = { data: [] },
}: {
  Offersproducts: { data: Product[] };
}) => {
  const [IsHover, setIsHover] = useState(true);

  return (
    <>
      <div className=" sm:px-4  ">
        <SectionTitle title={"عروض اليوم"} href="/shop?hasOffer=t" />
      </div>
      <div className="w-full">
        <Carousel
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
          className="m-auto cursor-pointer md:w-[88%] sm:w-[85%] w-[100%]"
        >
          <CarouselContent dir="rtl" className="py-10 ">
            {Offersproducts?.data?.map((product: Product) => (
              <CarouselItem
                key={product.id}
                className="pl-0 ml-4 xlHalf:basis-1/6 2lg:basis-[22%] mdHalf:basis-[25%] 2sm:basis-[35%] sm:basis-[42%] 2xs:basis-[34%] 1xs:basis-[45%] basis-1/2 rounded-t-[8px] "
              >
                <div className="sm:w-[220px]  1xs:w-[180px] w-full">
                  <ProductCard
                    key={product.id}
                    id={"" + product.id}
                    image={product.mainImageUrl}
                    productName={product.name}
                    price={
                      product.priceAfterOffer
                        ? product.priceAfterOffer
                        : product.price
                    }
                    ProductDet={product.id}
                    oldPrice={product.priceAfterOffer ? product.price : 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="sm:flex hidden" />
          <CarouselNext className=" sm:flex hidden " />
        </Carousel>
      </div>
    </>
  );
};

export default TodayOffers;
