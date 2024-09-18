import React from "react";
import ShopProductsCard from "./ShopProductsCard";
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

const ShopProductsGrid = ({allProducts}:any) => {
    return (
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProducts?.data?.map((product, index) => (
          <ShopProductsCard key={index} product={product}/>
        ))}
      </div>
    );
  };

export default ShopProductsGrid;
