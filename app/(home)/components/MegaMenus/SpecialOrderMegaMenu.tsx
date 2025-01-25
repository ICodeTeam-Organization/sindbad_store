import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import { useSpecialOrdersDialogsStore } from "@/app/stores/specialordersDialogsStore";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";

export default function SpecialOrderMegaMenu() {
  const { categories } = useCategoriesDataStore((state) => state);
  const [CatType, setCatType] = useState("p");
  const { setSpecialOrderState } = useSpecialOrdersDialogsStore();

  return (
    <div
      className={cn(
        " transition-all duration-200  opacity-0 invisible hidden  mdHalf:flex -mt-2  group-hover:flex mdHalf:flex-row flex-col  mdHalf:translate-y-5 translate-y-0  group-hover:-translate-y-0 group-hover:opacity-[1] group-hover:visible mdHalf:mt-1 rounded top-10 min-h-[400px] max-h-[540px]  overflow-y-hidden z-[99999]  bg-white   xl:w-[40%] lg:w-[50%] mdHalf:w-[60%]  w-full  mdHalf:shadow-md mdHalf:border-y border-b dark:bg-gray-800  mdHalf:absolute  ",
        "right-15"
      )}
    >
      <div className="flex justify-center items-center mt-4 gap-8">
        <h3
          className={cn(
            "mdHalf:text-md text-xs font-bold text-black  px-2 py-1 mdHalf:hidden block mdHalf:bg-none ",
            CatType == "p" && "bg-gray-200  rounded"
          )}
          onClick={() => setCatType("p")}
        >
          {" "}
          فئات المنتجات{" "}
        </h3>
        <h3
          className={cn(
            "mdHalf:text-md text-xs font-bold text-black  px-2 py-1 mdHalf:hidden block mdHalf:bg-none ",
            CatType == "k" && "bg-gray-200  rounded"
          )}
          onClick={() => setCatType("k")}
        >
          {" "}
          فئات الخدمات{" "}
        </h3>
      </div>
      <div
        className={cn(
          "flex flex-col xl:w-[60%] mdHalf:w-[50%] w-full mdHalf:h-auto h-[90%]  px-4 py-8  text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6 gap-x-4",
          CatType != "p" && "mdHalf:flex hidden"
        )}
      >
        <h3 className="mdHalf:text-md text-xs font-bold text-black mb-4 me-3  mdHalf:block hidden ">
          {" "}
          فئات المنتجات{" "}
        </h3>
        <div className="w-full overflow-y-auto text-end " dir="ltr">
          {categories.filter((i) => i.categoryTypeNumber == 2).length != 0 ? (
            <div className="grid gap-x-4  mb-5 ">
              {categories
                .filter((i) => i.categoryTypeNumber == 2)
                ?.map((i) => (
                  <div
                    key={i.id}
                    onClick={() => {
                      setSpecialOrderState(true, 1, i.id);
                    }}
                    // href={"/special-order?sh=1&tab=1&category="+i.id}
                    className="text-[11px] me-2 font-semibold my-[2px] hover:bg-gray-200  transition-colors duration-200 px-2 p-1 rounded  text-black "
                  >
                    {" "}
                    {i.name}{" "}
                  </div>
                ))}
            </div>
          ) : (
            <div className="p-5 flex items-center justify-center ">
              <h2 className="text-center"> لاتوجد فئات </h2>
            </div>
          )}
          {/* <Link href={"/"} className='hover:underline hover:text-blue-600 ' ><p>عرض الكل</p></Link> */}
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col xl:w-[60%] mdHalf:w-[50%] w-full mdHalf:h-auto h-[90%]  px-4 py-8  text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6 gap-x-4",
          CatType != "k" && "mdHalf:flex hidden"
        )}
      >
        <h3 className="mdHalf:text-md me-3 text-xs font-bold text-black mb-4 mdHalf:block hidden  ">
          {" "}
          فئات الخدمات{" "}
        </h3>
        <div className="w-full overflow-y-auto text-end " dir="ltr">
          {categories.filter((i) => i.categoryTypeNumber == 3).length != 0 ? (
            <div className="grid  gap-x-4  mb-5 ">
              {categories
                .filter((i) => i.categoryTypeNumber == 3)
                ?.map((i) => (
                  <div
                    onClick={() => {
                      setSpecialOrderState(true, 2, i.id);
                    }}
                    // href={"/special-order?sh=1&tab=2&category="+i.id}
                    key={i.id}
                    className="text-[11px] me-2 font-semibold my-[2px] hover:bg-gray-200  transition-colors duration-200 px-2 p-1 rounded  text-black "
                  >
                    {" "}
                    {i.name}{" "}
                  </div>
                ))}
            </div>
          ) : (
            <div className="p-5 flex items-center justify-center ">
              <h2 className="text-center"> لاتوجد فئات </h2>
            </div>
          )}
          {/* <Link href={"/"} className='hover:underline hover:text-blue-600 ' ><p>عرض الكل</p></Link> */}
        </div>
      </div>
    </div>
  );
}
