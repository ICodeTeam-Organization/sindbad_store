 
import { getApi } from "@/lib/http";
import React from "react";
import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
import { NormalizedProductType } from "@/Data/normalizTypes";
import ProductCard from "@/components/product_card/ProductCard";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const NewShoppingNow = async () => {
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
      <div className="flex justify-between items-center ">
        <div>
          <h3 className={  "  lg:text-lg text-base font-bold relative pr-3"}>
            خبز
          </h3>
        </div>
        <Link href={""}>
        <button className="btn flex items-center text-sm ml-3 group ">
          <h3 className="mr-2 mdHalf:text-sm  text-xs group-hover:text-primary group-hover:underline  transition duration-500">عرض الكل</h3>
          <IoIosArrowBack className="text-sky-700 group-hover:text-primary group-hover:underline  transition duration-500" />
        </button>
        </Link>
      </div>
    </div>
      <div className=" ">
        <div className="grid grid-cols-6 max-xlHalf:grid-cols-5 max-lgHalf:grid-cols-4 max-mdHalf:grid-cols-3 max-smHalf:grid-cols-2 max-xxs:grid-cols-1 gap-4 px-2">
          {products.length > 0 ? (
            products.map((product: NormalizedProductType) => (
              <div key={product.id} className=" ">
                <ProductCard
                  key={product.id}
                  data={product}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">لا توجد منتجات متاحة حاليًا</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewShoppingNow;
