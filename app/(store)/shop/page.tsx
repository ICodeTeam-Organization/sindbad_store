import React from "react";
import ShopProductsGrid from "./components/shop-products-grid";
import Pagination from "../../../components/Pagination";
import Sidebar from "./components/Sidebar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { postApi } from "@/lib/http";

interface searchParamsType {
  searchParams:{
    skw?:string;//search keyword
    cats?:string;
    subCats?:string;
    store?:string;
    brands?:string;
    tags?:string;
    newProducts?:"t"|"f";
    todayOffers?:"t"|"f";
  }
  
}

const ProductPage = async ({searchParams}:searchParamsType) => {


  const {skw,brands,cats,newProducts,store,subCats,tags,todayOffers} = searchParams
  
  // const initData = await postApi(
  //   `Products/Store/GetStoreProductsWitheFilter`,
  //   {
  //     body:{
  //       "storeId": store || null,
  //       // "productNumber": "string",
  //       "productName": skw || "",
  //       "productPrice": 0,
  //       "productImageUrl": "string",
  //       "productDescription": "string"
  //     }
  //   }
  // )

 
  // const { isLoading, data } = useQuery<any>({
  //   queryKey: ["getproductsByfiltering"],
  //   queryFn: () =>
      // postApi(
      //   `Products/Store/GetStoreProductsWitheFilter`,
      //   {
      //     body:{
      //       "id": 0,
      //       "storeId": "string",
      //       "productNumber": "string",
      //       "productName": "string",
      //       "productPrice": 0,
      //       "productImageUrl": "string",
      //       "productDescription": "string"
      //     }
      //   }
      // ),
  // });


  // const query = new URLSearchParams({
  //   priceFrom: filters.price.from.toString(),
  //   priceTo: filters.price.to.toString(),
  //   storId: filters.storId.toString(),
  //   categoryId: filters.categoryId.toString(),
  //   pageNumber: filters.pageNumber.toString(),
  // }).toString();

  // router.push(`/shop?${query}`);


  

  return (
    <div className="xl:container mx-auto mdHalf:py-6 mdHalf:px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className=" lg:w-[20%] mdHalf:w-[25%] mdHalf:block hidden mt-10 ms-7  " >
         <Sidebar/>
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
            <ShopProductsGrid  />
            <Pagination />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
