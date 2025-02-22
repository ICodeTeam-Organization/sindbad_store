

"use client";

import SectionTitle from "../section-title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import ProductCard from "../product-card";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/types/storeTypes";
import { FaClock } from "react-icons/fa";

const TodayOffers = ({ Offersproducts = { data: [] } }: { Offersproducts: { data: Product[] } }) => {
  const [IsHover, setIsHover] = useState(true);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const targetTime = new Date();
      targetTime.setHours(6, 0, 0, 0);

      if (now.getHours() >= 6) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const timeLeft = targetTime.getTime() - now.getTime();
      setCountdown(Math.max(timeLeft, 0));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="mx-auto">
      <SectionTitle title={"عروض اليوم"} href="/shop?todayOffer=t" />
      {/* Countdown Timer */}
      <div className="mdHalf:mx-4 mx-1  text-center text-white bg-red-400 py-2 px-4 rounded-md ">
        <p className="flex items-center sm:justify-center justify-between  gap-3 font-system-ui mdHalf:text-lg text-sm tajawal font-bold">
          <span className="" > سارع قبل نفاذ الوقت </span>
          <span className="font-fantasy tracking-widest flex flex-row-reverse items-center justify-center gap-x-2">{formatTime(countdown)} <FaClock className="text-xl" /> </span>
        </p>
      </div>
      {/* Carousel */}
      <div className="carousel-container">
        <Carousel
          onMouseEnter={() => setIsHover(false)}
          onMouseLeave={() => setIsHover(true)}
          opts={{ direction: "rtl" }}
          plugins={[
            Autoplay({
              delay: 1500,
              active: IsHover,
            }),
          ]}
          className="m-auto cursor-pointer md:w-[88%] sm:w-[85%] w-full"
        >
          <CarouselContent dir="rtl" className="py-10">
            {Offersproducts?.data?.map((product: Product) => (
              <CarouselItem
                key={product.id}
                className="pl-0 ml-4 xlHalf:basis-1/6 2lg:basis-[22%] mdHalf:basis-[25%] 2sm:basis-[35%] sm:basis-[42%] 2xs:basis-[34%] 1xs:basis-[45%] basis-1/2 rounded-t-lg"
              >
                <div className="sm:w-[220px] 1xs:w-[180px] w-full">
                  <ProductCard
                    key={product.id}
                    id={"" + product.id}
                    image={product.mainImageUrl}
                    productName={product.name}
                    price={
                      product.priceAfterOffer ? product.priceAfterOffer : product.price
                    }
                    ProductDet={product.id}
                    oldPrice={product.priceAfterOffer ? product.price : 0}
                    offerSentence={product.offerSentence}
                    oneStarCount={product.oneStarCount}
                    twoStarCount={product.twoStarCount}
                    threeStarCount={product.threeStarCount}
                    fourStarCount={product.fourStarCount}
                    fiveStarCount={product.fiveStarCount}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="sm:flex hidden" />
          <CarouselNext className="sm:flex hidden" />
        </Carousel>
      </div>
    </div>
  );
};

export default TodayOffers;
