import React from 'react';

const PriceRange = () => (
  <div className="mb-6">
    <h3 className="font-bold mb-2">السعر</h3>
    <div className="flex items-center mb-4 h-[2px] w-[200px]">
      <input type="range" min="0" max="1000" className="w-full" />
    </div>
    <div className="min-w-[310px] flex ml-2 justify-between">
  <button className="min-w-[150px] min-h-[40px] border border-gray-300  rounded-none">
    أقل سعر
  </button>
  <button className="min-w-[150px] min-h-[40px] border border-gray-300 px-4 py-2 rounded-none">
    أعلى سعر
  </button>
</div>

  </div>
);

export default PriceRange;
