"use client";
import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
// import { getApi } from "@/lib/http";
import { cn } from "@/lib/utils";
import { MainCategory } from "@/types/storeTypes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { IoStorefrontOutline } from "react-icons/io5";

function AllCategoriesMegaMenu() {
  const { categories } = useCategoriesDataStore((state) => state);

  const allMainCat = categories?.filter((i) => i.categoryTypeNumber == 1);

  const [subCategories, setSubCategories] = useState<MainCategory[]>([]);

  const handleSubCategory = (id: number) => {
    const subCategories: MainCategory[] =
      allMainCat?.find((main: MainCategory) => main.id === id)?.subCategories ||
      [];
    setSubCategories(() => [...subCategories]);
  };

  const [selectedCategory, setselectedCategory] = useState(allMainCat[0]?.id);

  useEffect(() => {
    if (allMainCat.length > 0) {
      setselectedCategory(allMainCat[0]?.id);
      setSubCategories(allMainCat[0]?.subCategories || []);
      console.log("all categories mega menu");
    }
  }, [categories]);

  return (
    <div className="transition-all opacity-0 invisible hidden duration-200 right-0 xl:w-[40%] lg:w-[50%] mdHalf:w-[60%] w-full  mdHalf:block  group-hover:block  translate-y-5  group-hover:-translate-y-0  group-hover:opacity-100 group-hover:visible mdHalf:mt-1 -mt-2 rounded top-10 left-0  min-h-[400px] max-h-[540px] mdHalf:overflow-y-hidden overflow-y-scroll z-[99999]  bg-white  mdHalf:shadow-md mdHalf:border-y border-b dark:bg-gray-800  mdHalf:absolute   ">
      <div className="flex mdHalf:flex-row flex-col px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:px-6 gap-x-4 w-full">
        {allMainCat.length == 0 ? (
          <div className="flex items-center justify-center  mdHalf:min-h-[400px] mdHalf:max-h-[540px] w-full text-base font-bold">
            لا توجد فئات
          </div>
        ) : (
          <>
            <div className="flex mdHalf:block  bg-white flex-col xl:w-[50%] mdHalf:w-[50%] justify-between mdHalf:min-h-[400px] mdHalf:max-h-[540px] overflow-hidden ">
              <div className="flex items-center  gap-2 mb-4  ">
                <BiCategoryAlt
                  size={25}
                  color="black"
                  className="hidden mdHalf:flex"
                />
                <h3 className="mdHalf:text-md text-xs font-bold text-black  ">
                  {" "}
                  الفئات{" "}
                </h3>
              </div>
              <div
                dir="ltr"
                className="mdHalf:grid grid-cols-1 flex direction-  mdHalf:place-content-start  mdHalf:overflow-y-scroll mdHalf:overflow-x-hidden overflow-x-scroll   gap-x-4  mdHalf:mb-5 mb-2  mdHalf:h-[75%]"
              >
                {allMainCat?.map((i: MainCategory) => (
                  <div key={i.id}>
                    <Link
                      href={`/shop?cats=${i.id}`}
                      onMouseEnter={() => {
                        setselectedCategory(i.id);
                        handleSubCategory(i.id);
                      }}
                      className={cn(
                        "  text-[11px] mdHalf:block hidden  my-[2px] hover:bg-gray-200 text-black text-end me-2 font-semibold transition-colors duration-200 h-fit px-2 p-1 mdHalf:rounded rounded-full xl:whitespace-nowrap mdHalf:whitespace-normal whitespace-nowrap ",
                        selectedCategory == i.id && "bg-slate-200"
                      )}
                    >
                      {" "}
                      {i.name}{" "}
                    </Link>
                    <p
                      //  href={`/shop?cats=${i.id}`}
                      onMouseEnter={() => {
                        setselectedCategory(i.id);
                        handleSubCategory(i.id);
                      }}
                      className={cn(
                        "  text-[11px] mdHalf:hidden block  my-[2px] hover:bg-gray-200 text-black text-end me-2 font-semibold transition-colors duration-200 h-fit px-2 p-1 mdHalf:rounded rounded-full xl:whitespace-nowrap mdHalf:whitespace-normal whitespace-nowrap ",
                        selectedCategory == i.id && "bg-slate-200"
                      )}
                    >
                      {" "}
                      {i.name}{" "}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mdHalf:border-r  border-[#AAA7A744]  mdHalf:pr-4  mdHalf:min-h-[400px] mdHalf:max-h-[500px] xl:w-[50%] mdHalf:w-[50%] ">
              <div className="flex items-center  gap-2 mb-4 ">
                <IoStorefrontOutline
                  size={25}
                  color="black"
                  className="hidden mdHalf:flex"
                />
                <h3 className="mdHalf:text-md text-xs font-bold text-black ">
                  {" "}
                  الفئات الفرعية{" "}
                </h3>
              </div>
              {subCategories.length != 0 ? (
                <div className="mdHalf:grid  grid-cols-1 place-content-start  gap-x-4   overflow-y-scrol overflow-x-hidden h-[75%]">
                  {subCategories?.map((i: MainCategory) => (
                    <div key={i.id}>
                      <Link
                        href={`/shop?subCats=${i.id}`}
                        className=" block text-[11px] my-[2px] h-fit hover:bg-gray-200 font-semibold transition-colors duration-200 px-2 p-1 rounded lg:whitespace-nowrap"
                      >
                        {" "}
                        {i.name}{" "}
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className=" flex items-center justify-center h-[70%]">
                  <h2 className="text-center">
                    {" "}
                    لا توجد فئات فرعية ل{" "}
                    {
                      allMainCat?.find((i) => i.id == selectedCategory)?.name
                    }{" "}
                  </h2>
                </div>
              )}
              {/* <Link href="/" className="hover:underline hover:text-blue-600 ">
           <p>عرض الكل</p>
         </Link> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AllCategoriesMegaMenu;
