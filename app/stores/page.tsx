import React from 'react'
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import StoreGrid from './components/StoreGrid';
import Pagination from './components/Pagination'
import Footer from '../../components/Footer';

function StoresPage() {
  return (
    <div>
        <Header />
        <SearchBar />
        <StoreGrid />
        <Pagination />
        <Footer />
    </div>
  )
}

export default StoresPage