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
import { FaClock } from 'react-icons/fa'

const TodayOffers = ({ Offersproducts = { data: [] } }: { Offersproducts: { data: Product[] } }) => {
  const [IsHover, setIsHover] = useState(true);
  const [countdown, setCountdown] = useState(0);

  // useEffect(() => {
  //   const updateCountdown = () => {
  //     const now = new Date();
  //     const targetTime = new Date();
  //     targetTime.setHours(6, 0, 0, 0);
  //     if (now.getHours() >= 6) {
  //       targetTime.setDate(targetTime.getDate() + 1);
  //     }
  //     const timeLeft = targetTime - now;
  //     setCountdown(Math.max(timeLeft, 0));
  //   };

  //   updateCountdown();
  //   const interval = setInterval(updateCountdown, 1000);
  //   return () => clearInterval(interval);
  // }, []);

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
  
    return () => clearInterval(interval); // تنظيف المؤقت عند إلغاء التفعيل
  }, []);
  

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <>
      <style jsx>{`
        .countdown-timer {
font-size: 20px;
    color: #fff;
    background-color: rgb(206 35 52 / 88%);
    padding: 7px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    text-align: center;
    -webkit-box-shadow: 0 4px 15px rgba(0, 0, 0, .5);
    -moz-box-shadow: 0 4px 15px rgba(0, 0, 0, .5);
    box-shadow: 0 4px 15px rgba(0, 0, 0, .5);
    margin: 0px 0;
    /* opacity: 0.8; */
    font-family: system-ui;
    width: 90%;
    margin: auto;
        }

    .countdown-timer span{
        font-family: fantasy;
    letter-spacing: 6px;
}
    .countdown-timer p{
        display: flex
;
    justify-content: center;
    align-items: center;
    gap: 10px;}
        .carousel-container {
          margin: auto;
          width: 88%;
        }
        .carousel-item {
          transition: transform 0.3s;
        }
        .carousel-item:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <div className="sm:px-4">
        <SectionTitle title={"عروض اليوم"} href="/shop?hasOffer=t" />
        <div className="countdown-timer">
          <p>سارع قبل نفاذ الوقت <FaClock className="timer-icon" /> <span>{formatTime(countdown)}</span></p>
        </div>
      </div>
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
        >
          <CarouselContent dir="rtl" className="py-10">
            {Offersproducts?.data?.map((product: Product) => (
              <CarouselItem
                key={product.id}
                className="carousel-item pl-0 ml-4 xlHalf:basis-1/6 2lg:basis-[22%] mdHalf:basis-[25%] 2sm:basis-[35%] sm:basis-[42%] 2xs:basis-[34%] 1xs:basis-[45%] basis-1/2 rounded-t-[8px]"
              >
                <div className="sm:w-[220px] 1xs:w-[180px] w-full">
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
                    offerSentence={product.offerSentence}
                    oneStarCount = {product.oneStarCount}
                    twoStarCount = {product.twoStarCount}
                    threeStarCount = {product.threeStarCount}
                    fourStarCount = {product.fourStarCount}
                    fiveStarCount = {product.fiveStarCount}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="sm:flex hidden" />
          <CarouselNext className="sm:flex hidden" />
        </Carousel>
      </div>
    </>
  );
};

export default TodayOffers;