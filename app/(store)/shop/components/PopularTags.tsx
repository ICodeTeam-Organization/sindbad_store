import React from 'react';

const PopularTags = () => (
  <div>
    <h3 className="font-bold mb-2">POUPLAR TAGS</h3>
    <div className="flex flex-wrap gap-2">
      <span className="px-2 py-1 bg-gray-200 border border-orange-500 text-orange-500 rounded-full">
        Graphics Cards
      </span>
      <span className="px-2 py-1 bg-gray-200 rounded-full">Asus Laptops</span>
      <span className="px-2 py-1 bg-gray-200 rounded-full">TV</span>
      <span className="px-2 py-1 bg-gray-200 rounded-full">Game</span>
    </div>
  </div>
);

export default PopularTags;
