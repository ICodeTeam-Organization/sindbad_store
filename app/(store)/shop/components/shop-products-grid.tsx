import React from "react";
import ShopProductsCard from "./shop-products-card";
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
    <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {allProducts?.data?.products?.length > 0 ? (
        allProducts.data.products.map((product: any, index: number) => {
          console.log(product);
          return <ShopProductsCard key={index} product={product} />
})
      ) : (
        <p className="text-center text-xl font-bold py-12">
          لايتوفر أي منتج في الوقت الحالي
        </p>
      )}
    </div>
  );
};

export default ShopProductsGrid;
