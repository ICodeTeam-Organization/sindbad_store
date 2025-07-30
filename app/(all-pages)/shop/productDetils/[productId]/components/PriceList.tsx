import React from "react";

type PriceEntry = {
  id: number;
  productId: number;
  minQuantity: number;
  pricePerUnit: number;
};

type PriceListProps = {
  prices: PriceEntry[];
};

const PriceList: React.FC<PriceListProps> = ({ prices }) => {
  if (!prices || prices.length === 0) {
    return <div className="text-gray-500">لا توجد أسعار متوفرة.</div>;
  }

  // ترتيب حسب الكمية الأدنى
  const sortedPrices = [...prices].sort((a, b) => a.minQuantity - b.minQuantity);

  return (
    <div className="rounded-xl p-4 bg-white">
      <h2 className="text-xl font-bold mb-4">أقل كمية للشراء  - {sortedPrices[0]?.minQuantity}</h2>
      <table className="w-full">
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
      </table>
    </div>
  );
};

export default PriceList;
