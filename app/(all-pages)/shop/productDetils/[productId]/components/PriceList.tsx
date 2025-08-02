import React from "react";

type PriceEntry = {
  id: number;
  productId: number;
  minQuantity: number;
  pricePerUnit: number;
};

type PriceListProps = {
  prices: PriceEntry[];
  currency:string
};

const PriceList: React.FC<PriceListProps> = ({ prices, currency}) => {
  if (!prices || prices.length === 0) {
    return <div className="text-gray-500">لا توجد أسعار متوفرة.</div>;
  }

  // ترتيب حسب الكمية الأدنى
  const sortedPrices = [...prices].sort(
    (a, b) => a.minQuantity - b.minQuantity
  );

  return (
    <div className="rounded-xl p-4 bg-white flex justify-center items-center gap-x-8">
      {/* <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-right">
            <th className="p-2">الكمية الأدنى</th>
            <th className="p-2">السعر للوحدة</th>
          </tr>
        </thead>
        <tbody>
          {sortedPrices.map((price,) => (
            <tr key={price.id} className="text-right">
              <td className="p-2">{price.minQuantity}</td>
              <td className="p-2">{price.pricePerUnit} ريال</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {sortedPrices.map((price, index, arr) => {
        const next = arr[index + 1];
        if (!next) return (
           <div key={price.id}>
            <p className="text-secondary">
              {price.minQuantity} 
                حبة 
            </p>
            <p className="text-primary font-bold text-lg" >{price.pricePerUnit} {currency}</p>
          </div>
        );

        return (
          <div key={price.id}>
            <p className="text-secondary">
              {price.minQuantity} - {next.minQuantity - 1}
                حبة 
            </p>
            <p className="text-primary font-bold text-lg" >{price.pricePerUnit} {currency}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PriceList;
