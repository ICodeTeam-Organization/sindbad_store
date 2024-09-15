"use client";

import React from "react";
import Categories from "./Categories";
import PriceRange from "./PriceRange";
import Brands from "./Brands";
import PopularTags from "./PopularTags";

const Sidebar = () => {
  const categoryList = [
    "أجهزة إلكترونية",
    "كمبيوتر & لابتوب",
    "إكسسوارات الكمبيوتر",
    "جوالات ذكية",
    "سماعات",
    "إكسسوارات الجوال",
    "Gaming Console",
    "Camera & Photo",
    "TV & Homes Appliances",
    "Watchs & Accessories",
    "GPS & Navigation",
    "Warable Technology",
  ];

  const brandList = ['Google', 'Apple', 'Samsung', 'Microsoft','HP', 'Dell', 'Xiaomi','Symphony','Panasonic','Sony','Intel','LG','One Plus'];
  const tags = ['Graphics Cards', 'TV', 'iPhone', 'Game',  'Asus Laptops', 'SSD', 'Mackbook','Speakers','Smart TV','Power Bank','Samsung','Microsoft','Tablet'];

  return (
    <aside className="hidden md:block w-1/4 p-4">
      <Categories categories={categoryList} />
      <PriceRange />
      <Brands brands={brandList} />
      <PopularTags tags={tags} />
    </aside>
  );
};

export default Sidebar;
