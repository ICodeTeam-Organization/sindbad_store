import ProductCard from "../../../../components/product_card/ProductCard";
import { getApi } from "@/lib/http";
import React from "react";
import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
import { NormalizedProductType } from "@/Data/normalizTypes";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";  


// // This component fetches the latest products added to the market and displays them in a grid format.
// // It uses the `getApi` function to fetch data from the API and normalizes the product data using the `normalizeProduct` function.
// // The products are displayed in a responsive grid layout, and if there are no products available, a message is shown.  


const ShoppingNow = async () => {
  let products:NormalizedProductType[] = []; 
  try {
    const response = await getApi<any>(
      "Products/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/18"
    );
    products = (response?.data as any[] || []).map(normalizeProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
 
  return ( 
     <div className="lg:container mx-auto sm:p-4 p-2 "> 
     <div className="pt-5 w-full">
        <div className="flex flex-col justify-center items-center mb-5 ">
          <h3 className={" lg:text-lg text-base font-bold relative p-3"}>
            تسوق الآن
          </h3>
          <div className="w-[150px] h-[2px] rounded-full bg-primary" />
        </div>
      </div>
      <div className=" ">
        <div className="grid grid-cols-6 max-xlHalf:grid-cols-5 max-lgHalf:grid-cols-4 max-mdHalf:grid-cols-3 max-smHalf:grid-cols-2 max-xxs:grid-cols-1 gap-4 px-2">
          {products.length > 0 ? (
            products.map((product: NormalizedProductType) => (
              <div key={product.id} className=" ">
                <ProductCard
                  data={product}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">لا توجد منتجات متاحة حاليًا</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center mt-12 border-b" >
        <Link href='/shop'>
          <button className="btn bg-secondary flex items-center gap-x-4 text-sm p-3 rounded-t-md text-white group ">
            <h3 className="mdHalf:text-sm  text-xs -translate-y-[1px] transition duration-500 pr-1">
              عرض المزيد
            </h3>
            <IoIosArrowBack className=" transition duration-500 text-lg" />
          </button>
        </Link>
      </div>
      
    </div>
  );
};

export default ShoppingNow;
