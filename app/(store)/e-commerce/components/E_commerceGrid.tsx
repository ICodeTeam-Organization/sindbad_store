import React from 'react';
import E_commerceCard from './E_commCard';
import alibaba from '../../../../public/images/alibaba.svg';

// const e_commers = [
//     {
//       image: alibaba,
//       title: "علي بابا",
//       description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
//     }
//   ];

const E_commerceGrid = ({ allEcommerces }: any) => {
  return (
    <div className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allEcommerces?.data?.length > 0 ? (
        allEcommerces.data.map((e_comm :any, index : number) => {
          return <E_commerceCard key={index} eCommerce={e_comm} />
        })
      ) : (
        <p className="text-center text-xl font-bold py-12">
        لايتوفر أي اسواق في الوقت الحالي
      </p>
      )
      }
    </div>
  );
};

export default E_commerceGrid;
