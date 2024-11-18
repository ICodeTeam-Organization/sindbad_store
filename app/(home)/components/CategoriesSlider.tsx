"use client"
import Image from 'next/image'
import React from 'react'
import Categories from './sections/Categories'
import Link from 'next/link'

function CategoriesSlider({categories={data:[]}}) {

  console.log(categories);
  

  const CategoryItem = ({item}:{item:any}) => (
    <Link href={"/"+item?.id} className="bg-[#FFFDF4] p-1 px-2 rounded shadow-sm  " >
       <p className="whitespace-nowrap tajawal min-w-[105px] text-center mdHalf:text-[11px] text-[10px] font-bold "> {item?.name} </p>
      </Link>
  )

  return (
    <div className="flex  items-center w-full bg-[#7B746310] mt-2 " >
      <div className="m-2" >
          <Image
            alt="right"
            src={"images/right_ic.svg"}
            width={100}
            height={100}
            />
         </div>
         <div className='flex flex-col gap-y-2 hide-scrollbar  overflow-x-auto h-30 p-4 ' >
            <div className="flex  items-center   gap-3   " >
                {categories?.data?.filter((_,x)=>x%2==0).map((item)=>
                  <CategoryItem item={item} />
                )}
            </div>
            <div className="flex mr-14 items-center  gap-3  " >
                {categories?.data?.filter((_,x)=>x%2!==0).map((item:any)=>
                  <CategoryItem item={item} key={item?.id} />
                )}
            </div>
         </div>
         <div className="m-2" >
            <Image
            alt="left"
            src={"images/left_ic.svg"}
            width={100}
            height={100}
            />
         </div>
          
          
         
      </div>
  )
}

export default CategoriesSlider