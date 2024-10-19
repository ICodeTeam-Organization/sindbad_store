import React from 'react';
import E_commerceGrid from './components/E_commerceGrid';
import Pagination from '../../../components/Pagination';
import { getApi } from '@/lib/http';

const E_commercePage=  async ()=> {
  
  const Ecommerces = await getApi<any>(
    'Market/Store/GetAllStoresThatHasLinksToOnlineWebsite'
  )



  return (
    <div className='mt-12'>
      <E_commerceGrid allEcommerces={Ecommerces} />
      <Pagination />
    </div>
  );
}

export default E_commercePage;
