"use client"; 
import Link from "next/link";
import React from "react";

function CategorisListSection({ cats }: { cats: {id:number,name:string}[] }) {
 
  return (
    <div className="  mb-2">
      <p className="  ml-1 mb-2 font-bold">
        {cats.length !== null ? "الفئات : " : ""}
      </p>
      <div className="flex flex-wrap gap-4">
        {cats.map((category, x) => (
          <Link
            href={"/shop?cats=" + category.id}
            className="bg-zinc-100 px-2 py-1 shadow rounded text-xs  "
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
