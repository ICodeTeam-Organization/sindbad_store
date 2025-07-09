import { currency } from "@/lib/utils";

type Props = {
  title: string;
  price: number;
};

const PriceLabel = ({ title, price }: Props) => {
  return (
    <div className="flex justify-between  mb-2">
      <span className="text-gray-500">{title}</span>
      <span>{price.toFixed(2)} {currency} </span>
    </div>
  );
};

export default PriceLabel;
