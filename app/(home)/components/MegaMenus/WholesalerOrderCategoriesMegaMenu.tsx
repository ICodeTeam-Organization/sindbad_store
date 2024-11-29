"use client"
import { useCategoriesDataStore } from '@/app/stores/categoriesStore';
import { cn } from '@/lib/utils'
import { MainCategory } from '@/types/storeTypes';
import React from 'react'


function WholesalerOrderCategoriesMegaMenu() {
  
  const {categories} = useCategoriesDataStore((state)=>state)
  const wholesalerCateg = categories?.filter(i=>i.categoryTypeNumber==4);

  return (
    <div className={cn(
      " transition-all duration-200 opacity-0 invisible hidden mdHalf:block -mt-2  group-hover:block  mdHalf:translate-y-5  group-hover:-translate-y-0 group-hover:opacity-[1] group-hover:visible mdHalf:mt-1 rounded top-10   max-h-[400px]  overflow-y-auto z-[99999]  bg-white mdHalf:w-fit w-full  mdHalf:shadow-md mdHalf:border-y border-b dark:bg-gray-800  mdHalf:absolute "
      ,""
    )}>
    <div className="flex  px-2 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6 gap-x-4">
      <div className='w-full' >
        <h3 className='mdHalf:text-md text-sm font-bold text-black mb-4 hidden mdHalf:block ' > فئات طلب جملة  </h3>
       {wholesalerCateg.length != 0 
       ? <div className='grid lg:grid-cols-1 mdHalf:grid-rows-4 gap-x-4  mb-5 ' >
            {
               wholesalerCateg?.map((i:MainCategory)=>(
                    <p  key={i.id} onClick={()=>{}}  className=' text-[11px] my-[2px] hover:bg-gray-200 font-bold transition-colors duration-200 px-2 p-1 rounded mdHalf:whitespace-nowrap text-black ' > {i.name} </p>
                ))
            }
        </div>
      : <div className='p-5 flex items-center justify-center ' >
            <h2 className='text-center' > لاتوجد فئات </h2>
        </div>  
      }
      </div>
       
    </div>
</div>

  )
}

export default WholesalerOrderCategoriesMegaMenu