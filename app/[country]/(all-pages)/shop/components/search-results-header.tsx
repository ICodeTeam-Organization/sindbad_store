"use client";
import React from "react";

const SreachResultsHeader = ({
  // storeName = "",
  // catName = "",
  totalResults = 0,
}) => {
  return (
    <section className="flex items-center justify-between w-full mb-6 bg-gray-100 p-4  rounded-lg text-[13px]">
      {/* {storeName != "" &&<div >
         <span className="flex items-center">
          <span> اسم المنتج :  </span>
          {storeName}
        </span>
      </div>}
      {catName != "" && <div >
         <span className="flex items-center">
          <span> الفئة :  </span>
          {catName}
        </span>
      </div>} */}

      {/* {(catName == "" && storeName == "") && <div >
         <span className="flex items-center">
          <span> جميع المحلات </span>
        </span>
      </div>} */}
      <div>
        <p>نتائج البحث: {totalResults} منتج</p>
      </div>
    </section>
  );
};

export default SreachResultsHeader;
