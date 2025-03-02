import React from "react";
import ShopProductsGrid from "./components/shop-products-grid";
import Sidebar from "./components/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";

// interface searchParamsType {
//   searchParams:{
//     productName?:string;//search keyword
//     cats?:string;
//     subCats?:string;
//     storeId?:string;
//     brands?:string;
//     tags?:string;
//     newProducts?:"t"|"f";
//     todayOffers?:"t"|"f";
//   }

// }

const ProductPage = async () => {
  // const {productName,brands,cats,newProducts,store,subCats,tags,todayOffers} = searchParams

  return (
    <div className="xl:container mx-auto mdHalf:py-6 mdHalf:px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="xl:w-[22%] mdHalf:w-[32%] mdHalf:block hidden mt-10 ms-7 border-l pl-4 sticky top-[100px] h-[86vh] overflow-y-auto  p-4">
          <Sidebar />
        </div>
        <div className="mdHalf:hidden">
          <Sheet>
            <SheetTrigger
              asChild
              className="bg-[#F8F4E5] cursor-pointer shadow-md  rounded-full p-2 px-6 fixed left-[50%] bottom-10 -translate-x-[50%] z-10 "
            >
              <div className="flex items-center justify-between gap-x-2">
                <FilterIcon size={16} />
                <p className="text-[#333] text-sm">فلاتر البحث</p>
              </div>
            </SheetTrigger>
            <SheetContent className="w-full h-full overflow-y-auto">
              <div className="mt-4  ">
                <Sidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Main content */}
        <main className="w-full xl:w-[78%] mdHalf:w-[68%] md:my-10 mb-16  ">
          {/* Products Section */}
          <section>
            <ShopProductsGrid />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
