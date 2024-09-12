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

type MainCategory = {
  id: string;
  name: string;
};

type BranchCategory = {
  id: string;
  name: string;
  main: string;
};

const CategoriesDialog = () => {
  const [branches, setBranches] = useState<BranchCategory[]>([]);
  const mainCategory: MainCategory[] = [
    { id: "asdas", name: "كهربائيات" },
    { id: "wrwe", name: "الكترونيات" },
    { id: "asddfgdas", name: "هواتف" },
    { id: "asdvfvfdas", name: "كهربائيات" },
    { id: "adfesdas", name: "كهربائيات" },
    { id: "asdavvvcs", name: "كهربائيات" },
  ];
  const branchCategory: BranchCategory[] = [
    { id: "nbg", name: "جوالات", main: "asdas" },
    { id: "nwebg", name: "جوالات", main: "asdas" },
    { id: "nbgvf", name: "جوالات", main: "asdas" },
    { id: "nbght", name: "جوالات", main: "asdas" },
    { id: "nbgxx", name: "جوالات", main: "asdas" },
    { id: "nbgse", name: "جوالات", main: "asdas" },
    { id: "nbgertw", name: "جوالات", main: "asdas" },
    { id: "nbgerger", name: "جوالات", main: "asdas" },
    { id: "nbgvweverfe", name: "جوالات", main: "asdas" },
    { id: "nbgasdfasd", name: "جوالات", main: "asdas" },
    { id: "nbasdg", name: "جوالات", main: "asdas" },
    { id: "nbeefeg", name: "جوالات", main: "asdas" },
    { id: "nbaewaerg", name: "جوالات", main: "asdas" },
    { id: "bbcweafrgrgq", name: "العاب", main: "asdavvvcs" },
    { id: "bbcweafrgrgw", name: "العاب", main: "asdavvvcs" },
    { id: "bbcweafrgrge", name: "العاب", main: "asdavvvcs" },
    { id: "bbcweafrgrgr", name: "العاب", main: "asdavvvcs" },
    { id: "bbcweafrgrgt", name: "العاب", main: "asdavvvcs" },
    { id: "bbcweafrgrgff", name: "العاب", main: "asdavvvcs" },
    { id: "bbcweafrgrgvc", name: "العاب", main: "asdavvvcs" },
    { id: "bbcweafrgrgbf", name: "العاب", main: "asdavvvcs" },
    { id: "bbcweafrgrgbv", name: "العاب", main: "asdavvvcs" },
    { id: "bbcweafrqwqwdagrg", name: "العاب", main: "asdavvvcs" },
  ];

  const handelBranchCategory = (id: string) => {
    setBranches(() => branchCategory.filter((categ) => categ.main === id));
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
          <div className="border sm:w-40 md:w-60 lg:w-1/2 p-2">
            <h1 className="font-bold text-xl text-center mb-4">الرئيسية</h1>
            <div className="h-80 p-2 overflow-auto">
              {mainCategory.map((category) => (
                <Button
                  className="w-40 md:w-72 lg:w-full mb-3 bg-gray-400 lg:text-xl"
                  onClick={() => handelBranchCategory(category.id)}
                  key={category.id}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="border sm:w-40 md:w-60 lg:w-1/2 p-2  ">
            <h1 className="font-bold text-xl text-center mb-4">الفرعية</h1>
            <div className="h-80 p-2 text-center  overflow-auto">
              {branches.length > 0 ? (
                branches.map((category) => (
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
              )}
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
