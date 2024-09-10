import React from 'react'
import Header from '../stores/components/Header';

import SearchBar from '../stores/components/SearchBar';
import E_commerceGrid from '../e-commerce/components/e-commGrid';
import Pagination from '../stores/components/Pagination'
import Footer from '../../components/Footer';

function StoresPage() {
  return (
    <div>
        <Header />
        <SearchBar />
        <E_commerceGrid />
        <Pagination />
        <Footer />
    </div>
  )
}

export default StoresPage