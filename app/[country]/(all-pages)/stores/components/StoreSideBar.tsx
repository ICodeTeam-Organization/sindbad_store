"use client";

import { useCategoriesDataStore } from "@/app/stores_mangament/categoriesStore";
import MainCategoriesFilter from "../../components/MainCategoriesFilter";
import useStoreQuerySearch from "../hooks/useStoreQuerySearch"; 

function StoreSideBar() {

  const { categories } = useCategoriesDataStore();
  const { categoryId, setCategoryId } = useStoreQuerySearch();

  return (
    <div className="lg:border-l lg:mx-4" >
      {/* Filter Stores by category */}
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

export default StoreSideBar;
