"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IoIosArrowForward } from "react-icons/io";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import MainCategory from "./MainCategory";
import { Category } from "@/types/storeTypes";
import { getApi } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";

const CategoriesDialog = () => {
  const [branches, setBranches] = useState<any>([]);

  const { data } = useQuery<any>({
    queryKey: ["branch-category"],
    queryFn: () =>
      getApi(
        "Market/categories/GetAllMainCategoriesWithSubCategoriesForViewInSpecialProductsPage/1/1"
      ),
  });

  const handleSubCategory = (id: number) => {
    setBranches(
      (prevData) =>
        (prevData = [
          data.data.filter((main: any) => main.id === id).subCategoriesForVeiw,
        ])
    );

    console.log(branches);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} className="flex items-center text-sm ml-3 ">
          <IoIosArrowForward className="text-sky-700" />
          <h3 className="mr-2">عرض الكل</h3>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-4/5 ">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-xl font-bold">
            جميع الفئات
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-gray-500">
            تصفح جميع الفئات الرئيسية و الفرعية
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="pt-2 flex flex-row md:gap-1 lg:gap-3  ">
          <MainCategory onClick={handleSubCategory} />
          <div className="border sm:w-40 md:w-60 lg:w-1/2 p-2  ">
            <h1 className="font-bold text-xl text-center mb-4">الفرعية</h1>
            <div className="h-80 p-2 text-center  overflow-auto">
              {/* {branches && branches.length > 0 ? (
                branches.map((category: Category) => (
                  <Button
                    variant={"outline"}
                    className="w-40 md:w-72 lg:w-full mb-3   lg:text-xl"
                    key={category.id}
                  >
                    {category.name}
                  </Button>
                ))
              ) : (
                <p className="font-bold mt-20 min-w-40 ">
                  لا تتوفر اي فئة فرعية في الوقت الحالي
                </p>
              )} */}
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>أغلاق</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CategoriesDialog;
