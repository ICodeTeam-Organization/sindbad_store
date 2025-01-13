import React from "react";
import Image from "next/image";
import { MySpecialOrdersTableProps } from "../types";
const TABLE_HEAD = [
  "العمليات",
  "التاريخ",
  "التفاصيل",
  "الفئة",
  "الطلب",
  "الرقم",
];
const MySpecialOrdersTable: React.FC<MySpecialOrdersTableProps> = ({ special_orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
      {/* Table Header */}
      <thead className="bg-[#FFECE5] text-sm font-medium text-center text-[#000]">
        <tr>
          {TABLE_HEAD.map((head) => (
            <th key={head} className="px-4 py-3 font-medium">
              {head}
            </th>
          ))}
        </tr>
      </thead>
      {/* Table Body */}
      <tbody className="text-sm text-center text-[#000]">
        {special_orders.map(({ number, order, category, details, date, actions }, index) => (
            <tr
              key={index}
              className={`${
                index % 2 !== 0 ? "bg-[#FFFBF8]" : "bg-white"
              } border-b border-gray-200`}
            >
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2 ">
                  <span className=" w-[140px] text-[#768396] h-[38px] bg-[#FFEBDD] px-4 py-2 rounded-lg whitespace-nowrap">
                    {actions}
                  </span>
                  <Image
                    src="/images/MyAccountImages/ai-generative.svg"
                    alt="ai-generative"
                    width={20}
                    height={20}
                  />
                </div>
              </td>
              <td className="px-4 py-3">{date}</td>
              <td className="px-4 py-3">{details}</td>
              <td className="px-4 py-3">{category}</td>
              <td className="px-4 py-3">{order}</td>
              <td className="px-4 py-3">{number}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
    </div>
  );
};

export default MySpecialOrdersTable;
