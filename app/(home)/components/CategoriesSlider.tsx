"use client"
import Image from 'next/image'
import React, { useRef } from 'react'
import Link from 'next/link'
import { MainCategory } from '@/types/storeTypes';
import { useCategoriesDataStore } from '@/app/stores/categoriesStore';

function getAllSubcategories(categories: MainCategory[]): MainCategory[] {
  let subcategories: MainCategory[] = [];
  categories.forEach((category:MainCategory) => {
    subcategories = subcategories.concat(category.subCategories as MainCategory[]);
  });
  return subcategories;
}

function CategoriesSlider() {

  const scrollRef = useRef<any>(null);
  const {categories} = useCategoriesDataStore();
  const allSubCategories = getAllSubcategories(categories)

  const scroll = (direction:string) => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Adjust the amount to scroll
      scrollRef.current?.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };
  

  const CategoryItem = ({item}:{item:MainCategory}) => (
    <Link href={"/shop?subCat="+item?.id} className="bg-[#FFFDF4] p-1 px-2 rounded shadow-sm  " >
       <p className="whitespace-nowrap tajawal min-w-[105px] text-center mdHalf:text-[11px] text-[10px] font-bold "> {item?.name} </p>
      </Link>
  )

  return (
    <div className="flex  items-center w-full bg-[#7B746310] mt-2 relative px-10" >
      <div className="h-full cursor-pointer sm:w-20 absolute bg-gradient-to-l from-[#EEEAE9] via-[#EEEAE9] right-0 to-transparent flex items-center justify-center " onClick={() => scroll("right")} >
          <Image
            alt="right"
            src={"/images/right_ic.svg"}
            width={30}
            height={30}
            />
         </div>
         <div className='flex flex-col gap-y-2 hide-scrollbar  overflow-x-auto h-30 p-4 ' ref={scrollRef} >
            <div className="flex  items-center   gap-3   " >
                {allSubCategories?.filter((_,x)=>x%2==0).map((item:any)=>
                  <CategoryItem item={item}  key={item?.id} />
                )}
            </div>
            <div className="flex mr-14 items-center  gap-3  " >
                {allSubCategories?.filter((_,x)=>x%2!==0).map((item:any)=>
                  <CategoryItem item={item} key={item?.id} />
                )}
            </div>
         </div>
         <div className="h-full cursor-pointer sm:w-20 absolute bg-gradient-to-r from-[#FFE0DC] via-[#FFE0DC] left-0 to-transparent flex items-center justify-center" onClick={() => scroll("left")} >
            <Image
            alt="left"
            src={"/images/left_ic.svg"}
            width={30}
            height={30}
            />
         </div>
          
          
         
      </div>
  )
}

export default CategoriesSlider