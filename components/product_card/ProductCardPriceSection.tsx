"use client ";
import { NormalizedProductType } from '@/Data/normalizTypes';
import React from 'react'

type ProductCardPriceSectionProps = {
  data: NormalizedProductType
  currency: string;
};

function ProductCardPriceSection({ data, currency }: ProductCardPriceSectionProps) {

  return (
    <div className="text-right flex flex-col justify-start items-start ">
      {!data?.minPrice ? <div className="flex items-center justify-center gap-x-2">
        <p className="max-md:text-xs text-[16px] text-secondary">
          <strong>
            {data.price} <span className="text-[13px]">{currency}</span>{" "}
          </strong>
        </p>
        {data.hasDiscount && (
          <p className="text-[12px] max-md:text-[9px] line-through text-bg-400">
            {data.priceBeforeDiscount} {currency}
          </p>
        )}
      </div> :
        <div className="flex items-center justify-center gap-x-2">
          <p className="max-md:text-xs text-[16px] text-secondary">
            <strong>
              {data.priceRange?.join(" - ")} <span className="text-[13px]">{currency}</span>{" "}
            </strong>
          </p>
        </div>
      }

      <div className="flex mt-1">
        <span className="text-[10px] p-[2px] px-2 border-bg-100 border bg-white text-danger  rounded-sm">
          + مصاريف الشحن{" "}
        </span>
      </div>
    </div>
  )
}

export default ProductCardPriceSection