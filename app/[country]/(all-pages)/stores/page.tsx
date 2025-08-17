import React from "react";
import StoreGrid from "./components/store-grid";
import StoreSideBar from "./components/StoreSideBar";
import { FilterIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const StoresPage = async () => {
  return (
    <div className="bg-bg-100 pt-6" >
      <div className="  flex xl:container xl:mx-auto gap-x-7 ">
      <div className="xl:w-[23%] lg:block hidden bg-white p-5 rounded-md shadow-sm" >
        <StoreSideBar  />
      </div>
      <div className="lg:hidden" >
          <Sheet>
            <SheetTrigger asChild className="bg-[#0f172a] text-white cursor-pointer shadow-md  rounded-lg p-2 px-6 fixed left-[50%] bottom-10 -translate-x-[50%] z-20 ">
              <div className="flex items-center justify-between gap-x-2 " >
              <FilterIcon size={16} />
              <p className="text-sm tajawal mt-1" >فلاتر البحث</p>
              </div>
            </SheetTrigger>
            <SheetContent className="w-full " >
                <div className="mt-4" >
                  <StoreSideBar  />
                </div>
            </SheetContent>
          </Sheet>
        </div>
      <div className="lg:w-[77%] w-full bg-white p-5 rounded-md shadow-sm"  >
        <StoreGrid  />
      </div>
    </div>
    </div>
  );
}

export default StoresPage;

