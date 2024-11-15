import React from 'react'
import store from '../../../../.././public/images/store-IKEA.svg';
import StoreDetailsCard from './components/store-details-card';

const Storedetails = () => {
  const storeDetails = 
    {
      imagesUrl: store,
      name: "شركة ايكيا للاثاث",
      description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
    };

  return (
    <div>

      <StoreDetailsCard {...storeDetails} />
    </div>
  )
}

export default Storedetails