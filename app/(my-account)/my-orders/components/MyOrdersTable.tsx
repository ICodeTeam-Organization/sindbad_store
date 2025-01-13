import React from 'react';
import { MyOrdersTableProps } from '../types';

const MyOrdersTable: React.FC<MyOrdersTableProps> = ({ orders }) => {
  const TABLE_HEAD = ["التتبع", "الحالة", "التاريخ", "قيمة الطلب", "رقم الطلب"];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
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
          {orders.map(({ order_number, order_value, date, status, traking }, index) => (
            <tr
              key={index}
              className={`${
                index % 2 !== 0 ? "bg-[#FFFBF8]" : "bg-white"
              } border-b border-gray-200`}
            >
              <td className="px-4 py-3">{order_number}</td>
              <td className="px-4 py-3">{order_value}</td>
              <td className="px-4 py-3">{date}</td>
              <td className="px-4 py-3">
                <span className="inline-block px-3 py-1 whitespace-nowrap text-[#2E9E2C] bg-[#288B5326] text-sm">
                  {status}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="inline-block px-3 py-1 whitespace-nowrap text-[#2E9E2C] bg-[#288B5326] text-sm">
                  {traking}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrdersTable;
