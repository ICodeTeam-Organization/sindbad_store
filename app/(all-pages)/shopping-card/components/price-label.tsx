'use client';  
type Props = {
  title: string;
  price: number;
  currency: string;
};

const PriceLabel = ({ title, price, currency }: Props) => {
  return (
    <div className="flex justify-between  mb-2">
      <span className="text-gray-500">{title}</span>
      <span>{price.toFixed(2)} {currency} </span>
    </div>
  );
};

export default PriceLabel;
