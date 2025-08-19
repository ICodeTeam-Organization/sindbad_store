"use client"; 
import Link from "next/link";
import React from "react";

function CategorisListSection({ cats }: { cats: {id:number,name:string}[] }) {
 
  return (
    <div className="  mb-2">
      <p className="  ml-1 mb-2 font-bold">
        {cats.length !== null ? "الفئات   " : ""}
      </p>
      <div className="flex flex-wrap gap-4">
        {cats.map((category, x) => (
          <Link
            href={"/shop?cats=" + category.id}
            className="border border-zinc-100 p-2  rounded text-xs  "
            key={category.id + x}
          >
            {category?.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorisListSection;
