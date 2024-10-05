import SectionTitle from "../SectionTitle";
import ProductCard from "../ProductCard";
import { getApi } from "@/lib/http";
import { notFound } from "next/navigation";
import React from "react";
const ShoppingNow = async () => {
  const products = await getApi<any>(
    // change the url later
    "Products/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/5"
  );
  if (!products) return notFound();

  return (
    <>
      <div className="container pt-10 mx-auto sm:px-4 md:px8  lg:px16 xl:px-32">
        <SectionTitle title={"تسوق الآن"} />
        <div className="container ">
          <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 max-lg:grid-cols-4 max-sm:grid-cols-3 gap-y-5 2xl:gap-[25px] max-sm:gap-x-1 max-lg:gap-x-5  max-md:m-auto  py-4 mr-2 ">
            {products.data.map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.mainImageUrl}
                productName={product.name}
                price={product.price}
                ProductDet={product.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingNow;
