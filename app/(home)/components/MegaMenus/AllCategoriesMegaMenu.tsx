"use client";
import { getApi } from '@/lib/http';
import { cn } from '@/lib/utils'
import { Category } from '@/types/storeTypes';
import React, { useState } from 'react'
import { BiCategoryAlt } from 'react-icons/bi';
import { IoStorefrontOutline } from 'react-icons/io5';


function AllCategoriesMegaMenu({AllCategoriesWithSub}:{AllCategoriesWithSub:any}) {


  
  
    
  const [subCategories, setSubCategories] = useState<any>(AllCategoriesWithSub?.data[0].subCategoriesForVeiw);

  const handleSubCategory = (id: number) => {
    const subCategories: Category[] = AllCategoriesWithSub.data?.find((main: any) => main.id === id).subCategoriesForVeiw;
    setSubCategories(() => [...subCategories]);
  };

  const [selectedCategory, setselectedCategory] = useState(
    AllCategoriesWithSub?.data[0]?.id
  );

  return (
    <div className="transition-all duration-200 right-0 opacity-0 invisible hidden  mdHalf:block  group-hover:block  translate-y-5  group-hover:-translate-y-0 mdHalf:w-[85%] w-full group-hover:opacity-100 group-hover:visible mdHalf:mt-1 -mt-2 rounded top-10 left-0   max-h-[400px] mdHalf:overflow-y-hidden overflow-y-scroll z-[99999]  bg-white  mdHalf:shadow-md mdHalf:border-y border-b dark:bg-gray-800  mdHalf:absolute   ">
      <div className="flex mdHalf:flex-row flex-col px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:px-6 gap-x-4 w-full">
        <div className="flex mdHalf:block  bg-white flex-col xl:w-[20%] mdHalf:w-[30%] justify-between mdHalf:max-h-[400px] overflow-hidden ">
          <div className="flex items-center  gap-2 mb-4  ">
            <BiCategoryAlt size={25} color="black" className='hidden mdHalf:flex' />
            <h3 className="mdHalf:text-md text-xs font-bold text-black  ">  الفئات </h3>
          </div>
          <div 
          className="mdHalf:grid lg:grid-cols-1 flex  mdHalf:place-content-start  mdHalf:overflow-y-scroll mdHalf:overflow-x-hidden overflow-x-scroll  gap-x-4  mdHalf:mb-5 mb-2  mdHalf:h-[75%]">
            {AllCategoriesWithSub?.data?.map((i:any) => (
              <p 
                onMouseEnter={()=>{
                  setselectedCategory(i.id)
                  handleSubCategory(i.id)
                  
                }} 
                className={cn(
                  "text-[11px]  my-[2px] hover:bg-gray-200 text-black font-semibold transition-colors duration-200 h-fit px-2 p-1 mdHalf:rounded rounded-full xl:whitespace-nowrap mdHalf:whitespace-normal whitespace-nowrap ",
                  selectedCategory == i.id && "bg-slate-200"
                )}
              >
                {" "}
                {i.name}{" "}
              </p>
            ))}
          </div>
        
        </div>
        <div className="mdHalf:border-r  border-[#AAA7A744]  mdHalf:pr-4  mdHalf:max-h-[400px] w-full ">
          <div className="flex items-center  gap-2 mb-4 ">
            <IoStorefrontOutline size={25} color="black" className='hidden mdHalf:flex'/>
            <h3 className="mdHalf:text-md text-xs font-bold text-black "> الفئات الفرعية </h3>
          </div>
          <div className="mdHalf:grid xl:grid-cols-7 lg:grid-cols-6 mdHalf:grid-cols-4 grid-cols-1 place-content-start  gap-x-4   overflow-y-scrol overflow-x-hidden h-[75%] ">
            {subCategories?.map((i:any) => (
                <p className=" text-[11px] my-[2px] h-fit hover:bg-gray-200 font-semibold transition-colors duration-200 px-2 p-1 rounded lg:whitespace-nowrap">
                  {" "}
                  {i.name}{" "}
                </p>
              ))}
          </div>
          {/* <Link href="/" className="hover:underline hover:text-blue-600 ">
            <p>عرض الكل</p>
          </Link> */}
        </div>
      </div>
    </div>

  )
}

export default AllCategoriesMegaMenu