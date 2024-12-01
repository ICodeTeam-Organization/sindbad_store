import React from "react";
import SearchResultsHeader from "./components/search-results-header";
import ShopProductsGrid from "./components/shop-products-grid";
import Pagination from "../../../components/Pagination";
import { getApi } from "@/lib/http";
import Sidebar from "./components/Sidebar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const ProductPage = async () => {
  const products = await getApi<any>(
    `products/HomePage/GetProductsOfOurStore/${15}/1`
  );

  // console.log(products);

  return (
    <div className="xl:container mx-auto mdHalf:py-6 mdHalf:px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className=" lg:w-[20%] mdHalf:w-[25%] mdHalf:block hidden mt-10 ms-7  " >
         <Sidebar />
        </div>
        <div className="mdHalf:hidden " >
          <Sheet>
            <SheetTrigger asChild className="bg-slate-400 cursor-pointer shadow-md  rounded-full p-3 px-6 fixed left-[50%] bottom-10 -translate-x-[50%]">
              <p className="text-white" >فلاتر البحث</p>
            </SheetTrigger>
            <SheetContent className="w-full " >
                <div className="mt-4" >
                   <Sidebar />
                </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Main content */}
        <main className="w-full lg:w-[80%] mdHalf:w-[75%] my-10 mb-16 ">
          {/* Tags and Results */}
          {/* <SearchResultsHeader products={[]} /> */}

          {/* Products Section */}
          <section>
            <ShopProductsGrid allProducts={products} />
            <Pagination />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
