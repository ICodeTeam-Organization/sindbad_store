'use client';

import { get_currency_key } from "@/lib/cookie/cookie.clients";

type Props = {
  title: string;
  price: number;
};

const PriceLabel = ({ title, price }: Props) => {
  const currency = get_currency_key()
  return (
    <div className="flex justify-between  mb-2">
      <span className="text-gray-500">{title}</span>
      <span>{price.toFixed(2)} {currency} </span>
    </div>
  );
};

export default PriceLabel;
