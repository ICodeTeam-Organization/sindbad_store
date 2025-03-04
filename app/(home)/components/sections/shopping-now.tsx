import SectionTitle from "../section-title";
import ProductCard from "../product-card";
import { getApi } from "@/lib/http";
import React from "react";

const ShoppingNow = async () => {
  let products = [];
  
  try {
    const response = await getApi<any>(
      "Products/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/18"
    );
    products = response?.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="pt-10 mx-auto">
      <SectionTitle title={"تسوق الآن"} href="/shop" />
      <div className="md:px8 lg:px-0 mt-10">
        <div className="flex flex-wrap xl:gap-4 sm:gap-7 gap-4 items-center justify-center">
          {products.length > 0 ? (
            products.map((product: any) => (
              <div key={product.id} className="sm:w-[220px] w-[180px]">
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.mainImageUrl}
                  productName={product.name}
                  ProductDet={product.id}
                  price={
                    product.priceAfterOffer
                      ? product.priceAfterOffer
                      : product.price
                  }
                  oldPrice={product.priceAfterOffer ? product.price : 0}
                  offerSentence={product.offerSentence}
                  oneStarCount={product.oneStarCount}
                  twoStarCount={product.twoStarCount}
                  threeStarCount={product.threeStarCount}
                  fourStarCount={product.fourStarCount}
                  fiveStarCount={product.fiveStarCount}
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
