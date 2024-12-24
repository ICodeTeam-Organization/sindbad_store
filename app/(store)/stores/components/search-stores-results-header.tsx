"use client";
import React from "react";
import { IoIosClose } from "react-icons/io";

const SreachStoresResultsHeader = ({ storeName="",catName="",totalResults=0 }) => {
  return (
    <section className="flex items-center justify-between w-full mb-6 bg-gray-100 p-4  rounded-lg text-[13px]">
      {storeName != "" &&<div >
         <span className="flex items-center">
          <span> اسم المحل :  </span>
          {storeName}
        </span>
      </div>}
      {catName != "" && <div >
         <span className="flex items-center">
          <span> الفئة :  </span>
          {catName}
        </span>
      </div>}

      {(catName == "" && storeName == "") && <div >
         <span className="flex items-center">
          <span> جميع المحلات </span>
        </span>
      </div>}
      <div>
        <p  >نتائج البحث: {totalResults} محل</p>
      </div>
    </section>
  );
};

export default SreachStoresResultsHeader;
