import React from 'react';
import E_commerceGrid from './components/E_commerceGrid';
import Pagination from '../../../components/Pagination';

function E_commercePage() {
  return (
    <div className='mt-12'>
      <E_commerceGrid />
      <Pagination />
    </div>
  );
}

export default E_commercePage;
