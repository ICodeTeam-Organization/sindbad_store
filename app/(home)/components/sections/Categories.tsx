"use client"
import CategoryCard from "../category-card";
import styles from "../SectionTitle.module.css";
import CategoriesDialog from "../categories-dialog";
import { Category } from "@/types/storeTypes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { useState } from "react";

interface categoriesPropsInterface {
  categories:Category[]
}

const Categories = ({categories}:categoriesPropsInterface) => {

  const [IsHover, setIsHover] = useState(true)

  return (
    <div className=" sm:px-4  mt-10 ">
      <div className="py-5 w-full">
        <div className="flex justify-between items-center ">
          <div>
            <h3
              className={styles.title + "  text-2xl font-normal relative pr-3"}
            >
              الفئات
            </h3>
          </div>
          <CategoriesDialog />
        </div>
      </div>
      <div className="w-full" >
      <Carousel 
      onMouseEnter={()=>{
        setIsHover(false)
      }}
      onMouseLeave={()=>{
        setIsHover(true)
      }}
      opts={{
        direction:"rtl"
      }}
       plugins={[
        Autoplay({
          delay: 2000,
          active:IsHover
        }),
      ]}
      className="m-auto md:w-[90%] w-[100%]"  >
        <CarouselContent dir="rtl">
          {categories.map(
          (category: Category, index: number) => index < 20 && (
            <CarouselItem
              key={category.id}
              className="basis-1/10 group"
            >
               <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                imageUrl="/images/shoppingStore.svg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div  className="hidden md:block" >
        <CarouselPrevious 
         />
        <CarouselNext 
         />
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
