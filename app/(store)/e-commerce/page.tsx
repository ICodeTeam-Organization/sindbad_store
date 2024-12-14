import React from 'react';
import E_commerceGrid from './components/e-commerce-grid';
import Pagination from '../../../components/Pagination';
import { getApi, postApi } from '@/lib/http';

const E_commercePage=  async ()=> {
  
  const Ecommerces = await postApi<any>(
    'EcommercesStores/FilterECommerce',
    { 
      body:
        {
          "pageSize": 50,
          "pageNumber": 1,
        }
      
    }
  )

  console.log(Ecommerces?.data?.items);
  



  return (
    <div className='mt-12'>
      <E_commerceGrid allEcommerces={Ecommerces?.data?.items} />
      <Pagination />
    </div>
  );
}

export default E_commercePage;
