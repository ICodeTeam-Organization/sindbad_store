import React from 'react'
import StoreGrid from './components/StoreGrid';
import Pagination from '../../../components/Pagination'
function StoresPage() {
  return (
    <div className='mt-12'>
  
        <StoreGrid />
        <Pagination />
    </div>
  )
}

export default StoresPage