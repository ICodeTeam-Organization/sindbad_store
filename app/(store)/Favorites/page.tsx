import React from 'react'
import TabsComponent from '../shop/productDetils/[productId]/components/taps';
const Favorites = () => {
  return <>
  <div className='px-12 py-4'>
        <h2 className='h2 text-2xl font-bold'>المفضلات</h2>
  </div>
  <TabsComponent 
          tabLabels={{
            details: "المنتجات",
            features: "المتاجر",
            reviews: "الأسواق",
          }}
          tabContent={{
            tap1: <h1>المنتجات</h1>,
            tap2: <h1>المتاجر</h1>,
            tap3: <h1>اللأسواق</h1>,
        }}/>
  </>
}

export default Favorites