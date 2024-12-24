"use client";
import React from "react";
import { IoIosClose } from "react-icons/io";

const SreachEcommercesResultsHeader = ({ ecommerceName="",catName="",totalResults=0 }) => {
  return (
    <section className="flex items-center justify-between w-full mb-6 bg-gray-100 p-4  rounded-lg text-[13px]">
      {ecommerceName != "" &&<div >
         <span className="flex items-center">
          <span> اسم المتجر :  </span>
          {ecommerceName}
        </span>
      </div>}
      {catName != "" && <div >
         <span className="flex items-center">
          <span> الفئة :  </span>
          {catName}
        </span>
      </div>}

      {(catName == "" && ecommerceName == "") && <div >
         <span className="flex items-center">
          <span> جميع المتاجر </span>
        </span>
      </div>}
      <div>
        <p  >نتائج البحث: {totalResults} متجر</p>
      </div>
    </section>
  );
};

export default SreachEcommercesResultsHeader;
