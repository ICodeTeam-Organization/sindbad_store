import React from "react";
import ShopProductsCard from "./shop-products-card";
import ProductCard from "@/app/(home)/components/product-card";
import { Product } from "@/types/storeTypes";
// import product from '../../../../public/images/product.svg';

// const products = [
//   {
//     image: product,
//     title: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
//     price: 450.00,
//     oldPrice: 550.00,
//   },
//   {
//     image: product,
//     title: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
//     price: 250.00,
//     oldPrice: 350.00
//   },
//   {
//     image: product,
//     title: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
//     price: 250.00,
//     oldPrice: 350.00,
//   },
//   {
//     image: product,
//     title: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
//     price: 450.00,
//     oldPrice: 550.00,
//   },
//   {
//     image: product,
//     title: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
//     price: 450.00,
//     oldPrice: 550.00,
//   },
//   {
//     image: product,
//     title: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
//     price: 450.00,
//     oldPrice: 550.00,
//   },
// ];

const ShopProductsGrid = ({ allProducts }: any) => {
  return (
    <div className="mb-12 flex flex-wrap  justify-center gap-6">
      {allProducts?.data?.products?.length > 0 ? (
        allProducts.data.products.map((product: Product, index: number) => {
          return <div className="sm:w-[220px]  w-[180px] " >
          
                <ProductCard
                  id={product.id+""} 
                  ProductDet={+product.id}
                  image={product.mainImageUrl}
                  price={product.price}
                  productName={product.name}
                  // oldPrice={product.}
                />
          </div>
})
      ) : (
        <div className="h-[65vh] flex items-center justify-center" >
            <p className="text-center text-lg tajawal font-bold py-12">
              لايتوفر أي منتج في الوقت الحالي
            </p>
        </div>
      )}
    </div>
  );
};

export default ShopProductsGrid;
