"use client";
import CategoryCard from "../category-card";
import styles from "../SectionTitle.module.css";
import { Category } from "@/types/storeTypes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";

interface categoriesPropsInterface {
  categories: Category[];
}

const Categories = ({ categories }: categoriesPropsInterface) => {
  const [IsHover, setIsHover] = useState(true);

  return (
    <div className=" sm:px-4  mt-10 ">
      <div className="py-5 w-full">
        <div className="flex justify-between items-center ">
          <div>
            <h3
              className={styles.title + "  text-lg font-normal relative pr-3"}
            >
              الفئات
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          onMouseEnter={() => {
            setIsHover(false);
          }}
          onMouseLeave={() => {
            setIsHover(true);
          }}
          onBlur={()=>{
            setIsHover(true);
          }}
          opts={{
            direction: "rtl",
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              active: IsHover,
            }),
          ]}
          className="m-auto md:w-[90%] w-[100%]"
        >
          <CarouselContent dir="rtl">
            {categories && categories?.map(
              (category: Category, index: number) =>
                index < 20 && (
                  <CarouselItem key={category.id} className="basis-1/8 group">
                    <CategoryCard
                      key={category.id}
                      id={category.id}
                      name={category.name}
                      imageUrl={category.imageUrl || ""}
                    />
                  </CarouselItem>
                )
            )}
          </CarouselContent>
          <div className="absolute rotate-180 left-16 -top-8 flex items-center justify-center z-10">
              <CarouselPrevious className=" -left-6 text-[#F58634]" />
              <CarouselNext className=" text-[#F58634]" />
            </div>
        </Carousel>
      </div>
      {/* <div className="py-4 px-4 bg-slate-500 flex flex-wrap justify-center gap-y-5 gap-x-3 lg:gap-x-14 ">
        {categories.data.map(
          (category: Category, index: number) =>
            index < 10 && (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                imageUrl="/images/shoppingStore.svg"
              />
            )
        )}
      </div> */}
    </div>
  );
};

export default Categories;
