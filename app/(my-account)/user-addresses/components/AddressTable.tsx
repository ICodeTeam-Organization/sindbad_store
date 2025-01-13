import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { AddressTableProps } from "../types";

const TABLE_HEAD = ["العنوان", "المنطقة", "المستلم", "التلفون", "العمليات"];

const AddressTable: React.FC<AddressTableProps> = ({ address_table }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-[#FFECE5] text-sm font-medium text-center text-[#000]">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="px-4 py-3 font-medium">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm text-right text-[#000]">
          {address_table.map(({ address, region, recipient, phone }, index) => (
            <tr
              key={index}
              className={`${
                index % 2 !== 0 ? "bg-[#FFFBF8]" : "bg-white"
              } border-b border-gray-200`}
            >
              <td className="px-4 py-3">{address}</td>
              <td className="px-4 py-3">{region}</td>
              <td className="px-4 py-3">{recipient}</td>
              <td className="px-4 py-3">{phone}</td>

              {/* Actions Column */}
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <button className="text-red-500 hover:text-red-700">
                    <FiEdit fontSize="15px" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <MdOutlineDelete fontSize="20px" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddressTable;
