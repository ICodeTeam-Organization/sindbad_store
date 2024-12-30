import React from 'react';


const ProductCardSkeleton = () => {
  return (
    <div
      className={
        `m-auto rounded-t-[8px]  ho transition-all  animate-pulse`
      }
    >
      {/* Image Skeleton */}
      <div className="w-full h-[180px] bg-gray-200 rounded-t-[8px]">
        <div className="w-full h-full bg-gray-200 rounded-t-[8px] animate-pulse"></div>
      </div>

      {/* Text Skeleton */}
      <div className="p-4">
        {/* Product Name Skeleton */}
        <div className="h-10 bg-gray-200 rounded-md mb-2 animate-pulse w-3/4"></div>

        {/* Price Section Skeleton */}
        <div className="flex justify-between items-center">
          {/* Current Price Skeleton */}
          <div className="h-6 bg-gray-200 rounded-md w-1/3 animate-pulse"></div>

          {/* Old Price Skeleton */}
          <div className="h-6 bg-gray-200 rounded-md w-1/4 animate-pulse"></div>
        </div>
        
        {/* Add to Basket Skeleton */}
        <div className="h-10 bg-gray-200 rounded-md mt-4 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
