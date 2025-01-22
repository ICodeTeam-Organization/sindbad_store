"use client"
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { customerAddressType } from "../types";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";
import AddAddressDialog from "./AddAddressDialog";

const TABLE_HEAD = ["العنوان", "المنطقة", "المستلم", "التلفون", "العمليات"];

const AddressTable: React.FC<{ address: customerAddressType[] }> = ({
  address,
}) => {

  const [openAddAddressDialog, setOpenAddAddressDialog] = useState(false);


  return (
    <>
     
      <div className="mb-6" >
      <Button
        onClick={() => {setOpenAddAddressDialog(true)}}
        className="bg-primary-background hover:bg-primary-background hover:bg-opacity-60 text-sm"
      >
        <IoMdAddCircleOutline className="ml-4 " size={20} /> طلب عنوان جديد
      </Button>
      </div>

      <AddAddressDialog show={openAddAddressDialog} setShow={setOpenAddAddressDialog} />

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
            {address.map(({ location, regionName }, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 !== 0 ? "bg-[#FFFBF8]" : "bg-white"
                } border-b border-gray-200`}
              >
                <td className="px-4 py-3">{location}</td>
                <td className="px-4 py-3">{regionName}</td>
                {/* <td className="px-4 py-3">{recipient}</td>
              <td className="px-4 py-3">{phone}</td> */}

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
    </>
  );
};

export default AddressTable;
