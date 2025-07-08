"use client";

import Slider from "react-slick";
import Link from "next/link"; 
import { useRef,   } from "react";  
import { Store } from "@/types/storeTypes";
import StoresCardCarsoul from "@/app/(home)/components/StoresCardCarsoul";

interface Props {
  allStores: Store[];
}

const StoresCarsoule = ({ allStores }: Props) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings: import("react-slick").Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 300,
    arrows: true,
    rtl: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4, slidesToScroll: 4 },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 660,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 430,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="bg-bg-100 w-full pb-6">
      <div className="pb-6">
        <div className="lg:container mx-auto relative sm:p-4 p-2">
          <div className="pt-10 mb-5 pr-3">
            <div className="flex gap-x-5 items-center justify-center">
              {" "}
              <div className="h-10 p-[1px] bg-primary rounded-full" />
              <h1 className="text-secondary font-bold text-xl">جميع المحلات</h1>
              <div className="h-10 p-[1px] bg-primary rounded-full" />
            </div>
            <p className="text-sm text-center text-bg-800 mt-2 mb-2 ">
              تسوق أحدث المنتجات المميزة المضافة حديثًا
            </p>
          </div>
          <div className="w-full relative overflow-hidden mt-14">
            <Slider {...settings} ref={sliderRef}>
              {allStores.map((store) => {
                return (
                  <StoresCardCarsoul
                    key={store.id}
                    description={store?.description}
                    id={store?.id}
                    mainImageUrl={store?.mainImageUrl}
                    name={store?.name}
                    websiteLink={store?.websiteLink}
                    imagesUrl={store?.imagesUrl}
                    //  rate={store?.}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Link href="/stores" className="text-base">{""}عرض المزيد</Link>
          <div className="h-[2px] mt-1 w-[150%] bg-primary rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default StoresCarsoule;