import SectionTitle from "../section-title";
import ProductCard from "../product-card";
import { getApi } from "@/lib/http";
import React from "react";
import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
import { NormalizedProductType } from "@/Data/normalizTypes";

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
    <div className="pt-10 mx-auto">
      <SectionTitle title={"تسوق الآن"} href="/shop" />
      <div className="md:px8 lg:px-0 mt-10">
        <div className="flex flex-wrap xl:gap-4 sm:gap-7 gap-4 items-center justify-center">
          {products.length > 0 ? (
            products.map((product: NormalizedProductType) => (
              <div key={product.id} className="sm:w-[220px] w-[180px]">
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

export default ShoppingNow;
