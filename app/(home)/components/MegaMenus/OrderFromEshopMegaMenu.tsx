"use clinet";
import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import { getApi } from "@/lib/http";
import { cn } from "@/lib/utils";
import { MainCategory, Shop } from "@/types/storeTypes";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { IoStorefrontOutline } from "react-icons/io5";
import Spinner from "../Spinner";
import Link from "next/link";
import Image from "next/image";
import SafeImage from "@/components/SafeImage";



function OrderFromEshopMegaMenu() {


  const { categories } = useCategoriesDataStore((state) => state);
  const allMainCat:MainCategory[] = categories?.filter((i) => i.categoryTypeNumber == 1) || [];


  const [params, setParams] = useState({
    selectedCategory: allMainCat[0]?.id,
    pageNumber: 1,
    limit: 50,
  });

  const { data, isLoading } = useQuery<{data:{items:Shop[]}}>({
    queryKey: [params.selectedCategory, params.pageNumber],
    queryFn:()=>getApi(`EcommercesStores/GetEcommercesByCategoryId /${params.selectedCategory}/50/${params.pageNumber}`),
  });
  useEffect(()=>{
    if (allMainCat.length > 0) {
        setParams(o=>({...o,selectedCategory:allMainCat[0]?.id}))
    }
  },[categories])
  return (
    //
    <div className="transition-all duration-200 right-0 opacity-0 invisible hidden  mdHalf:block  group-hover:block  translate-y-5  group-hover:-translate-y-0  w-full group-hover:opacity-100 group-hover:visible mdHalf:mt-1 -mt-2 rounded top-10 left-0   min-h-[400px] max-h-[540px] mdHalf:overflow-y-hidden overflow-y-scroll z-[99999]  bg-white  mdHalf:shadow-md mdHalf:border-y border-b  mdHalf:absolute   ">
      <div className="flex mdHalf:flex-row flex-col px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:px-6 gap-x-4 w-full">
        <div className="flex mdHalf:block  bg-white flex-col xl:w-[20%] mdHalf:w-[30%] justify-between mdHalf:min-h-[400px] mdHalf:max-h-[540px] overflow-hidden ">
          <div className="flex items-center  gap-2 mb-4  ">
            <BiCategoryAlt
              size={25}
              color="black"
              className="hidden mdHalf:flex"
            />
            <h3 className="mdHalf:text-md text-xs font-bold text-black  " onClick={()=>{console.log(data?.data?.items);
            }} >
              {" "}
              إختر فئة{" "}
             
            </h3>
          </div>
          <div className="mdHalf:grid lg:grid-cols-1 flex  mdHalf:place-content-start  mdHalf:overflow-y-scroll mdHalf:overflow-x-hidden overflow-x-scroll  gap-x-4  mdHalf:mb-5 mb-2  mdHalf:h-[80%]">
            {allMainCat.map((i,x) => (
              <p
                key={i.id}
                onClick={() => {
                  setParams((o) => ({ ...o, selectedCategory: i.id }));
                }}
                className={cn(
                  "text-[11px]  my-[2px] hover:bg-gray-200 text-black font-semibold transition-colors duration-200 h-fit px-2 p-1 mdHalf:rounded rounded-full xl:whitespace-nowrap mdHalf:whitespace-normal whitespace-nowrap ",
                  params.selectedCategory == i.id && "bg-slate-200"
                )}
              >
                {" "}
                {i.name}{" "}
              </p>
            ))}
          </div>
        </div>
        <div className="mdHalf:border-r  border-[#AAA7A744]  mdHalf:pr-4  mdHalf:min-h-[400px] mdHalf:max-h-[540px] w-full ">
          <div className="flex items-center  gap-2 mb-4 ">
            <IoStorefrontOutline
              size={25}
              color="black"
              className="hidden mdHalf:flex"
            />
            <h3 className="mdHalf:text-md text-xs font-bold text-black ">
              {" "}
              المتاجر الإلكترونية{" "}
            </h3>
          </div>
          {isLoading ? (
            <div className=" flex items-center justify-center h-[70%]">
              <Spinner/>
            </div>
          ) : data?.data?.items?.length != 0 ? (
            <div className="mdHalf:grid  xl:grid-cols-5 2lg:grid-cols-4 mdHalf:grid-cols-3 grid-cols-1 place-content-start  gap-x-4   overflow-y-scrol overflow-x-hidden h-[75%] ">
              {data?.data?.items?.map((i,x) => (
                <Link href={"/special-order?sh=1&tab=3&category="+params.selectedCategory+"&link="+i.urlLinkOfStore} key={i.id} className=" text-[11px] my-[2px] h-fit overflow-hidden hover:bg-gray-200 font-semibold transition-colors duration-200 px-2 p-1 rounded lg:whitespace-nowrap">
                  <div className="flex gap-3 items-center " >
                    <div className="rounded-lg flex overflow-hidden w-12 border h-12 relative"  > 
                      <SafeImage
                        alt={i.name}
                        fill

                        className="bg-gray-100 h-12 w-12"
                        src={"/images/alogo.png"}
                       />
                    </div>
                    <p className="" > {i.name}   </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className=" flex items-center justify-center h-[70%]">
              <h2>لا توجد متاجر لهذه الفئة</h2>
            </div>
          )}
          {/* <Link href="/" className="hover:underline hover:text-blue-600 ">
        <p>عرض الكل</p>
      </Link> */}
        </div>
      </div>
    </div>
  );
}

export default OrderFromEshopMegaMenu;
