import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'
;

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

export default function SpecialOrderMegaMenu() {
  return (
    <div className={cn(
        " transition-all duration-200 opacity-0 invisible hidden mdHalf:flex -mt-2  group-hover:flex  mdHalf:translate-y-5 translate-y-0  group-hover:-translate-y-0 group-hover:opacity-[1] group-hover:visible mdHalf:mt-1 rounded top-10  max-h-[400px]  overflow-y-scroll z-[99999]  bg-white  w-full  mdHalf:shadow-md mdHalf:border-y border-b dark:bg-gray-800  mdHalf:absolute justify-center "
        ,"right-0"
      )}>

      <div className="flex  px-4 py-5  text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6 gap-x-4">
        <div className='w-full' >
          <h3 className='mdHalf:text-md text-xs font-bold text-black mb-4 ' > فئات المنتجات </h3>
         { categories.length != 0 
         ? <div className='grid 2xl:grid-cols-5 lg:grid-cols-3 max-lg: mdHalf:grid-cols-3 mdHalf:grid-rows-4 gap-x-4  mb-5 ' >
              {
                categories?.map((i)=>(
                    <p onClick={()=>{}}  className='text-[11px] font-semibold my-[2px] hover:bg-gray-200  transition-colors duration-200 px-2 p-1 rounded mdHalf:whitespace-nowrap text-black ' > {i} </p>
                ))
              }
          </div>
        : <div className='p-5 flex items-center justify-center ' >
              <h2 className='text-center' > لاتوجد فئات </h2>
          </div>  
        }
          {/* <Link href={"/"} className='hover:underline hover:text-blue-600 ' ><p>عرض الكل</p></Link> */}
        </div>
         
      </div>

      <div className="flex  px-4 py-5  text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6 gap-x-4">
        <div className='w-full' >
          <h3 className='mdHalf:text-md text-xs font-bold text-black mb-4  ' > فئات الخدمات </h3>
         { categories.length != 0 
         ? <div className='grid 2xl:grid-cols-5 lg:grid-cols-3 mdHalf:grid-cols-3 mdHalf:grid-rows-4 gap-x-4  mb-5 ' >
              {
                  categories?.map((i)=>(
                      <p onClick={()=>{}}  className='text-[11px] font-semibold my-[2px] hover:bg-gray-200  transition-colors duration-200 px-2 p-1 rounded mdHalf:whitespace-nowrap text-black ' > {i} </p>
                  ))
              }
          </div>
        : <div className='p-5 flex items-center justify-center ' >
              <h2 className='text-center' > لاتوجد فئات </h2>
          </div>  
        }
          {/* <Link href={"/"} className='hover:underline hover:text-blue-600 ' ><p>عرض الكل</p></Link> */}
        </div>
         
      </div>

  </div>
  
  )
}
