import { PriceSectionProps } from "../types";

const PriceSection = ({
  discountedPrice,
  originalPrice,
  discount,
}: PriceSectionProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex justify-between gap-x-2">
        <span className="text-lg font-bold text-black">
          {!!discountedPrice ? discountedPrice : originalPrice}{" "}
          <span className="text-sm">رس</span>{" "}
        </span>
        {!!discountedPrice && (
          <span className="text-base line-through text-gray-500">
            {originalPrice} رس
          </span>
        )}
      </div>
      {!!discountedPrice && (
        <div className="px-3 py-1 text-xs  bg-yellow-500 text-white rounded-sm font-medium">
          {discount !== null ? discount : 0} % خصم
        </div>
      )}
    </div>
  );
};

export default PriceSection;
