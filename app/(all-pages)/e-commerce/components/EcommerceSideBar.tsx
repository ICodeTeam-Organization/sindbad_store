"use client";

import { useCategoriesDataStore } from "@/app/stores_mangament/categoriesStore";
import MainCategoriesFilter from "../../components/MainCategoriesFilter";
import useEcommerceQuerySearch from "../hooks/useEcommerceQuerySearch"; 

function EcommerceSideBar() {

  const { categories } = useCategoriesDataStore();
  const { categoryId, setCategoryId } = useEcommerceQuerySearch();

  return (
    <div className="lg:border-l lg:mx-4" >
      {/* Filter Ecommerces by category */}
      <div  >
        <MainCategoriesFilter
          checkedId={categoryId}
          onCheckedChange={(id) => {
            if (id == categoryId) {
              setCategoryId(null);
            } else {
              setCategoryId(id);
            }
          }}
          data={categories}
        />
      </div>


    </div>
  );
}

export default EcommerceSideBar;
