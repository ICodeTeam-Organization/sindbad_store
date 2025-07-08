"use client";

import Slider from "react-slick";  
import { useRef } from "react"; 
import { Store } from "@/types/storeTypes";
import StoresCardCarsoul from "@/app/(home)/components/StoresCardCarsoul";
 
 
interface Props {
  Allstores:Store[]
}

const NewStoresCarsouole = ({Allstores}:Props) => {
 
  const sliderRef = useRef<Slider | null>(null);

  const settings: import("react-slick").Settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
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
    <div className="bg-[#F8F8F8] w-full pb-6">
      <div className="pb-6">
        <div className="lg:container mx-auto relative sm:p-4 p-2">
          <div className="pt-10 mb-5 pr-3">
            <h1 className="text-[#333333] font-bold text-lg">جميع المحلات</h1>
            <p className="text-sm text-[#666666]">
              تسوق أحدث المنتجات المميزة المضافة حديثًا
            </p>
          </div>

          <div className="w-full relative overflow-hidden">
            <Slider {...settings} ref={sliderRef}>
              {Allstores.map((store) => { 
                return (
                  <StoresCardCarsoul
                  key={store?.id}
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
    </div>
  );
};

export default NewStoresCarsouole;
