"use client"
import React from 'react';
import { IoIosClose } from "react-icons/io";

const SearchResultsHeader = ({products}:any) => {
  console.log(products)
  return (
    <section className="flex items-center justify-between w-full mb-6 bg-gray-100 p-4 rounded-lg">
      <div className="">
        <span className="flex items-center"><IoIosClose />اجهزةالكترونية</span>
      </div>
      <div>
        <p>نتائج البحث: {products?.data?.length} منتج</p>
      </div>
    </section>
  );
};

export default SearchResultsHeader;
