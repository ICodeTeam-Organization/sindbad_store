import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const categories = [
  "كتب",
  "مجوهرات",
  "أدوات رياضية",
  "كاميرات",
  "موسيقى وأدوات صوتية",
  "أطعمة ومشروبات",
  "حيوانات أليفة",
  "تكنولوجيا",
  "أدوات مكتبية",
  "أدوات سفر",
  "معدات البناء",
  "موسيقى وأدوات صوتية",
  "أطعمة ومشروبات",
  "حيوانات أليفة",
  "تكنولوجيا",
  "أدوات مكتبية",
  "أدوات سفر",
  "معدات البناء",
  "موسيقى وأدوات صوتية",
  "أطعمة ومشروبات",
  "حيوانات أليفة",
  "تكنولوجيا",
  "أدوات مكتبية",
  "أدوات سفر",
  "معدات البناء",
  "موسيقى وأدوات صوتية",
  "أطعمة ومشروبات",
  "حيوانات أليفة",
  "تكنولوجيا",
  "أدوات مكتبية",
  "أدوات سفر",
  "معدات البناء",
  "موسيقى وأدوات صوتية",
  "أطعمة ومشروبات",
  "حيوانات أليفة",
  "تكنولوجيا",
  "أدوات مكتبية",
  "أدوات سفر",
  "معدات البناء",
];
// 
function WholesalerOrderCategoriesMegaMenu() {
   
  return (
    <div className={cn(
      " transition-all duration-200 opacity-0 invisible hidden mdHalf:block -mt-2  group-hover:block  mdHalf:translate-y-5  group-hover:-translate-y-0 group-hover:opacity-[1] group-hover:visible mdHalf:mt-1 rounded top-10   max-h-[400px]  overflow-y-scroll z-[99999]  bg-white lg:w-fit w-full  mdHalf:shadow-md mdHalf:border-y border-b dark:bg-gray-800  mdHalf:absolute "
      ,"lg:left-2 left-0 right-0"
    )}>
    <div className="flex  px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6 gap-x-4">
      <div className='w-full' >
        <h3 className='mdHalf:text-md text-sm font-bold text-black mb-4 hidden mdHalf:block ' > فئات طلب جملة  </h3>
       { categories.length != 0 
       ? <div className='grid lg:grid-cols-6 mdHalf:grid-cols-5 mdHalf:grid-rows-4 gap-x-4  mb-5 ' >
            {
                categories?.map((i:any)=>(
                    <p onClick={()=>{}}  className=' text-[11px] my-[2px] hover:bg-gray-200 font-bold transition-colors duration-200 px-2 p-1 rounded mdHalf:whitespace-nowrap text-black ' > {i} </p>
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