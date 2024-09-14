import React from 'react';
import Sidebar from './components/Sidebar';
import SearchResultsHeader from './components/SearchResultsHeader';
import ShopProductsGrid from './components/ShopProductsGrid';
import Pagination from '../../../components/Pagination';

const ProductPage = () => {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="w-full md:w-3/4">
          {/* Tags and Results */}
          <SearchResultsHeader />

          {/* Products Section */}
          <section>
            <ShopProductsGrid />
            <Pagination />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
