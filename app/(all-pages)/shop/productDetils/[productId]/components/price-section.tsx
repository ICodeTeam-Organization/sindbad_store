import { currency } from "@/lib/utils";
import { PriceSectionProps } from "../types";

const PriceSection = async ({
  discountedPrice,
  originalPrice,
  discount,
}: PriceSectionProps) => { 
  return (
    <div className="flex items-center gap-4">
      <div className="flex justify-between gap-x-2">
        <span className="text-xl font-bold text-black">
          {!!discountedPrice ? discountedPrice : originalPrice}{" "}
          <span className="text-sm">{currency}</span>{" "}
        </span>
        {!!discountedPrice && (
          <span className="text-base line-through text-gray-500">
            {originalPrice} {currency}
          </span>
        )}
      </div>
      {!!discountedPrice && (
        <div className="px-3 py-1 text-xs  bg-yellow-300 text-black  font-bold">
          {discount !== null ? discount : 0} % خصم
        </div>
      )}
    </div>
  );
};

export default PriceSection;
