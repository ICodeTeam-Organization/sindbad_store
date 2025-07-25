"use client"
import Image from 'next/image'
import React, { useRef } from 'react'
import Link from 'next/link'  
import { NormalizedCategoryType } from '@/Data/normalizTypes';
import { useCategoriesDataStore } from '@/app/stores_mangament/categoriesStore';

function getAllSubcategories(categories: NormalizedCategoryType[]): NormalizedCategoryType[] {
  let subcategories: NormalizedCategoryType[] = [];
  categories.forEach((category:NormalizedCategoryType) => {
    subcategories = subcategories.concat(category.subCategories as NormalizedCategoryType[]);
  });
  return subcategories;
}

const CategoryItemSkeleton = () => (
  <div  className="bg-slate-100 p-1 px-2 rounded shadow-sm animate-pulse ">
    <div className="h-[16px] w-[105px] rounded"></div>
  </div>
)

const CategoryItem = ({item}:{item:NormalizedCategoryType}) => (
  <Link href={"/shop?subCats="+item?.id} className="bg-bg-100 hover:text-white hover:bg-primary duration-300 text-secondary p-2 rounded-full shadow-sm  " >
     <p className="whitespace-nowrap tajawal min-w-[105px] text-center mdHalf:text-[11px] text-[10px] font-bold "> {item?.name} </p>
    </Link>
)

function CategoriesSlider() {

  const scrollRef = useRef<any>(null);
  const {categories,isFechingCategories} = useCategoriesDataStore();
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
  

  return (
    <div className="flex  items-center w-full bg-white relative mdHalf:px-10 px-3" >
      <div className="h-full max-mdHalf:hidden cursor-pointer sm:w-20 absolute bg-gradient-to-l from-[#fff] via-[#fff1] right-0 to-transparent flex items-center justify-center " onClick={() => scroll("right")} >
          <Image
            alt="right"
            src={"/images/right_ic.svg"}
            width={30}
            height={30}
            />
         </div>
         <div className='flex flex-col gap-y-2 hide-scrollbar  overflow-x-auto h-30 p-4 ' ref={scrollRef} >
            <div className="flex  items-center gap-3   " >
                {!isFechingCategories ? allSubCategories?.filter((_,x)=>x%2==0).sort(() => Math.random() - 0.5).map((item:any)=>
                  <CategoryItem item={item}  key={item?.id} />
                )
                :[... Array(20)].map((_,x)=>(<CategoryItemSkeleton key={x} />))
               }
            </div>
            {/* <div className="flex mr-14 items-center  gap-3  " >
            {!isFechingCategories ? allSubCategories?.filter((_,x)=>x%2!==0).sort(() => Math.random() - 0.5).map((item:any)=>
                  <CategoryItem item={item}  key={item?.id} />
                )
                :[... Array(20)].map((_,x)=>(<CategoryItemSkeleton key={x} />))
               }
            </div> */}
         </div>
         <div className="h-full max-mdHalf:hidden cursor-pointer sm:w-20 absolute bg-gradient-to-r from-[#fff] via-[#fff1] left-0 to-transparent flex items-center justify-center" onClick={() => scroll("left")} >
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