"use client";
import CategoryCard from "../category-card"; 
import { useRef } from "react";
import { NormalizedCategoryType } from "@/Data/normalizTypes";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface categoriesPropsInterface {
  categories: NormalizedCategoryType[];
}

const Categories = ({ categories }: categoriesPropsInterface) => {
  
   const sliderRef = useRef<Slider | null>(null);
  
    const next = () => {
      sliderRef.current?.slickNext();
    };
    const previous = () => {
      sliderRef.current?.slickPrev();
    };
  
    const settings: import("react-slick").Settings = {
      dots: false,
      infinite: categories.length > 4 ,
      speed: 100, 
      slidesToShow: categories.length > 8 ? 8 : categories?.length,
      slidesToScroll: 1,
      autoplay: false, 
      autoplaySpeed: 2500,
      arrows: true,
      // rtl: true,
      rows:2,
      responsive: [
        { breakpoint: 1280, settings: { slidesToShow: 6 } },
        { breakpoint: 934, settings: { slidesToShow: 5 } },
        { breakpoint: 660, settings: { slidesToShow: 3} },
        { breakpoint: 400, settings: { slidesToShow: 2 } },
      ],
      
    };

  return (
   <div dir="rtl" className="lg:container mx-auto p-4">
       <div className="pt-5 w-full">
        <div className="flex flex-col justify-center items-center mb-5 ">
          <h3 className={" lg:text-lg text-base font-bold relative p-3"}>
            تسوق حسب الفئات
          </h3>
          <div className="w-[200px] h-[2px] rounded-full bg-primary" />
        </div>
      </div>
      <div className="w-full relative overflow-hidden items-center pt-4 ">
        <Slider {...settings} ref={sliderRef}> 
          {categories.filter(e=>e.categoryTypeNumber == 1).map((category) => (
            <div key={category.id} className="px-2 my-2 sm:w-[220px] w-[180px]  ">
              <div className="flex items-center justify-center py-4 rounded-md  group  ">
                 <CategoryCard
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    imageUrl={category.image || ""}
                />
              </div>
            </div>
          ))}
        </Slider>
        
        <>
          <button
            className="bg-white opacity-85 absolute   top-[50%] -translate-y-[50%]  z-10 hover:opacity-100 p-3 border rounded-full text-primary hover:text-black hover:shadow-sm transition duration-300 -right-4"
            onClick={next}
          >
            <ArrowRight />
          </button>
          <button
            className="bg-white p-3 absolute z-[0] top-[50%]  -translate-y-[50%]   border opacity-85 hover:opacity-100 rounded-full text-primary hover:text-black hover:shadow-sm transition duration-300 -left-4"
            onClick={previous}
          >
            <ArrowLeft />
          </button>
        </>
        {/* <div className="flex w-full items-center justify-between absolute z-50 top-[50%] -translate-y-[50%]">
          <button
            className="bg-white p-3 border rounded-sm text-primary hover:text-black hover:shadow-sm transition duration-300"
            onClick={next}
          >
            <ArrowRight />
          </button>
          <button
            className="bg-white p-3 border rounded-sm text-primary hover:text-black hover:shadow-sm transition duration-300 -left-5"
            onClick={previous}
          >
            <ArrowLeft />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Categories;
