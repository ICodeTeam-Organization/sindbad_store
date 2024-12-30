import React  from "react";
import E_commerceGrid from "./components/e-commerce-grid";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import EcommerceSideBar from "./components/EcommerceSideBar";

const E_commercePage = () => {
  return (
      <div className="mt-12 flex xl:container xl:mx-auto">
        <div className="xl:w-[23%] lg:block hidden">
          <EcommerceSideBar />
        </div>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              asChild
              className="bg-[#0f172a] text-white cursor-pointer shadow-md  rounded-lg p-2 px-6 fixed left-[50%] bottom-10 -translate-x-[50%] z-20 "
            >
              <div className="flex items-center justify-between gap-x-2 ">
                <FilterIcon size={16} />
                <p className="text-sm tajawal mt-1">فلاتر البحث</p>
              </div>
            </SheetTrigger>
            <SheetContent className="w-full ">
              <div className="mt-4">
                <EcommerceSideBar />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="lg:w-[77%] w-full">
          <E_commerceGrid />
        </div>
      </div>
  );
};

export default E_commercePage;
