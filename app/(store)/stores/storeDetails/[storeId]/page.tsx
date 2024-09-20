import React from 'react'
import store from '../../../../.././public/images/store-IKEA.svg';
import StoreDetailsCard from './components/StoreDetailsCard';

const Storedetails = () => {
  const storeDetails = 
    {
      image: store,
      title: "شركة ايكيا للاثاث",
      description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
    };

  return (
    <div>

      <StoreDetailsCard {...storeDetails} />
    </div>
  )
}

export default Storedetails