import React from "react";
import SearchResultsHeader from "./components/search-results-header";
import ShopProductsGrid from "./components/shop-products-grid";
import Pagination from "../../../components/Pagination";
import { getApi } from "@/lib/http";
import { console } from "inspector";
import Sidebar from "./components/Sidebar";

const ProductPage = async () => {
  const products = await getApi<any>(
    `products/HomePage/GetProductsOfOurStore/${20}/1`
  );

  // console.log(products);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <Sidebar />
        {/* Main content */}
        <main className="w-full md:w-3/4">
          {/* Tags and Results */}
          <SearchResultsHeader products={products} />

          {/* Products Section */}
          <section>
            <ShopProductsGrid allProducts={products} />
            <Pagination />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
