import React from "react";
import SectionTitle from "../SectionTitle";
import CategoryCard from "../CategoryCard";

const Categories = () => {
  return (
    <div className="container mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32  mt-10 md:mt-20">
      <SectionTitle title={"الفئات"} />
      <div className="py-4 px-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2  justify-center">
        <div className="hidden md:block">
          <CategoryCard />
        </div>
        <div className="hidden md:block">
          <CategoryCard />
        </div>
        <div className="hidden md:block">
          <CategoryCard />
        </div>
        <div className="hidden md:block">
          <CategoryCard />
        </div>
        <div className="hidden md:block">
          <CategoryCard />
        </div>
        <div>
          <CategoryCard />
        </div>
        <div>
          <CategoryCard />
        </div>
        <div>
          <CategoryCard />
        </div>
      </div>
    </div>
  );
};

export default Categories;
