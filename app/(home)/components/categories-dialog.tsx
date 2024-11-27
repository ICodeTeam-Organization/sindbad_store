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
import MainCategory from "./main-category";
import { Category } from "@/types/storeTypes";
import SubCategories from "./sub-categories";
import { useQuery } from "@tanstack/react-query";
import { getApi } from "@/lib/http";

const CategoriesDialog = () => {
  const [subCategories, setSubCategories] = useState<any>([]);

  const { data } = useQuery<any>({
    queryKey: ["branch-category"],
    queryFn: () =>
      getApi(
        "Market/categories/GetMainCategoriesWithSubCategories/1/1"
      ),
  });

  const handleSubCategory = (id: number) => {
    const subCategories: Category[] = data.data.find(
      (main: any) => main.id === id
    ).subCategoriesForVeiw;

    setSubCategories(() => [...subCategories]);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} className="flex items-center text-sm  ">
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
          <SubCategories subCategories={subCategories} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>أغلاق</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CategoriesDialog;
