import SectionTitle from "../section-title";
import ProductCard from "../product-card";
import { getApi } from "@/lib/http";
import React from "react";
const ShoppingNow = async () => {
  const products = await getApi<any>(
    // change the url later
    "Products/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/18"
  );
  // if (!products) return notFound();
//   const productList = Array.from({ length: 30 }, (v, i) => ({
//     id: i + 1,
//     mainImageUrl: `https://img.freepik.com/free-photo/flat-lay-natural-self-care-products-composition_23-2148990019.jpg`,
//     name: `ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف ${i + 1}`,
//     price: (i + 1) * 10 
// }));
  return (
    <>
      <div className="pt-10 mx-auto sm:px-4 ">
        <SectionTitle title={"تسوق الآن"} href="/shop" />
        <div className="md:px8  lg:px-8   ">
          <div 
          // className="grid 2xl:grid-cols-5 lg:grid-cols-4 justify-items-center justify-center lg:gap-[25px] sm:grid-cols-3 grid-cols-2  2xl:gap-[25px]  max-lg:gap-x-5  max-md:m-auto  py-4 mr-2 gap-2 px-2 "
          className="flex flex-wrap xl:gap-4 sm:gap-7 gap-4 items-center justify-center"
          >
            {products?.data?.map((product: any) => (
              <div key={product.id} className="sm:w-[220px]  w-[180px]  " >
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.mainImageUrl}
                  productName={product.name}
                  price={product.price}
                  ProductDet={product.id}
                />
              </div>
            ))}
            {/* {productList.map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.mainImageUrl}
                productName={product.name}
                price={product.price}
                ProductDet={product.id}
              />
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingNow;
