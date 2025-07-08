"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import CategoryCard from "@/app/(home)/components/category-card";
import { NormalizedCategoryType } from "@/Data/normalizTypes"; // افترض عندك هذا النوع للفئات
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const fakeCategories = [
  {
    id: 1,
    name: "ساعات يد",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    code: "watch",
    path: "/categories/watch",
  },
  {
    id: 2,
    name: "فاكهة طازجة",
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e38e?auto=format&fit=crop&w=800&q=80",
    code: "fruits",
    path: "/categories/fruits",
  },
  {
    id: 3,
    name: "إلكترونيات",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    code: "electronics",
    path: "/categories/electronics",
  },
  {
    id: 4,
    name: "ملابس رجالية",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    code: "mens-clothing",
    path: "/categories/mens-clothing",
  },
  {
    id: 5,
    name: "أثاث منزلي",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    code: "furniture",
    path: "/categories/furniture",
  },
  {
    id: 6,
    name: "كتب ومجلات",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    code: "books",
    path: "/categories/books",
  },
  {
    id: 5,
    name: "أثاث منزلي",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    code: "furniture",
    path: "/categories/furniture",
  },
  {
    id: 6,
    name: "كتب ومجلات",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    code: "books",
    path: "/categories/books",
  },
  {
    id: 5,
    name: "أثاث منزلي",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    code: "furniture",
    path: "/categories/furniture",
  },
  {
    id: 6,
    name: "كتب ومجلات",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    code: "books",
    path: "/categories/books",
  },


  {
    id: 5,
    name: "أثاث منزلي",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    code: "furniture",
    path: "/categories/furniture",
  },
  {
    id: 6,
    name: "كتب ومجلات",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    code: "books",
    path: "/categories/books",
  },{
    id: 5,
    name: "أثاث منزلي",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    code: "furniture",
    path: "/categories/furniture",
  },
  {
    id: 6,
    name: "كتب ومجلات",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    code: "books",
    path: "/categories/books",
  },
 
];

const NewCategoriesCarousel = ({
  // categories = [],
  sectionTitle,
  sectionHref,
}: {
  categories: NormalizedCategoryType[];
  sectionTitle: string;
  sectionHref: string;
}) => {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const settings: import("react-slick").Settings = {
    dots: false,
    // infinite: true,
    speed: 100, 
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: false, 
    autoplaySpeed: 2500,
    arrows: true,
    rtl: true,
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
        <div className="flex justify-between items-center">
          <div>
            <h3 className="lg:text-lg text-base font-bold relative pr-3">
              {sectionTitle}
            </h3>
          </div>
          <Link href={sectionHref}>
            <button className="btn flex items-center text-sm ml-3 group">
              <h3 className="mr-2 mdHalf:text-sm text-xs group-hover:text-primary group-hover:underline transition duration-500">
                عرض الكل
              </h3>
              <IoIosArrowBack className="text-sky-700 group-hover:text-primary group-hover:underline transition duration-500" />
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full relative overflow-hidden items-center pt-4 ">
        <Slider {...settings} ref={sliderRef}> 
          {fakeCategories.map((category) => (
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
        <div className="flex w-full items-center justify-between absolute z-50 top-[50%] -translate-y-[50%]">
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
        </div>
      </div>
    </div>
  );
};

export default NewCategoriesCarousel;
