"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { customerAddressType } from "../types";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";
import AddAddressDialog from "./AddAddressDialog";
import { useMutation } from "@tanstack/react-query";
import { deleteApi } from "@/lib/http";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const TABLE_HEAD = ["العنوان", "المنطقة", "المستلم", "التلفون", " "];

const AddressTable: React.FC<{ address: customerAddressType[] }> = ({
  address,
}) => {
  const [addresses, setAddresses] = useState<customerAddressType[]>(address);
  const [openAddAddressDialog, setOpenAddAddressDialog] = useState(false);
  const [isEditing, setisEditing] = useState<{
    isEdit: boolean;
    data?: customerAddressType;
  }>({
    isEdit: false,
    data: undefined,
  }); 

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      await deleteApi<any>(`CustomerAddress/DeleteCustomerAddress/${id}`);
      return id;
    },
    onSuccess: (id) => {
      
      toast({
        variant: "default",
        description: "تم حذف العنوان",
      });
      setAddresses((prev) => prev.filter((ele) => ele.id != id));
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        description: error?.message,
      });
    },
  });

  return (
    <>
      <div className="mb-6">
        <Button
          onClick={() => {
            setOpenAddAddressDialog(true);
          }}
          className="bg-primary-background hover:bg-primary-background hover:bg-opacity-60 text-sm"
        >
          <IoMdAddCircleOutline className="ml-4 " size={20} /> إضافة عنوان جديد
        </Button>
      </div>

      <AddAddressDialog
        show={openAddAddressDialog}
        setShow={setOpenAddAddressDialog}
        dataEditing={isEditing?.data}
        isEditing={isEditing?.isEdit}
        onEditEnd={(updatedData) => {
          setAddresses((prev) =>
            prev.map((ele) => {
              if (ele.id == updatedData.id) {
                return updatedData;
              }
              return ele;
            })
          );
          setisEditing({data:undefined,isEdit:false})
        }}
        onAddAddressEnd={(newData)=>{
          setAddresses(prev=>([...prev,newData]))
        }}
        onClose={()=>{
          setisEditing({data:undefined,isEdit:false})
        }}
      />

      {addresses?.length == 0 ? (
        <div className="h-[60vh] flex items-center justify-center">
          <h1> ليس لديك اي عنوان </h1>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#FFECE5] text-sm font-medium   text-[#000]">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <td key={head} className="px-4 py-3 font-medium">
                    {head}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-right text-[#000]">
              {addresses.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 !== 0 ? "bg-[#FFFBF8]" : "bg-white"
                  } border-b border-gray-200`}
                >
                  <td className="px-4 py-3">{item?.locationDescription}</td>
                  <td className="px-4 py-3">{item?.directorateName}</td>
                  <td className="px-4 py-3">{item?.userName}</td>
                  <td className="px-4 py-3">{item?.phoneNumber}</td>

                  {/* Actions Column */}
                  <td className="px-4 py-3">
                    {isPending ? (
                      <div className="text-red-500 hover:text-red-700">
                        <Loader2 className="animate-spin" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            setOpenAddAddressDialog(true);
                            setisEditing({ data: item, isEdit: true });
                          }}
                        >
                          <FiEdit fontSize="15px" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            mutate(item?.id);
                          }}
                        >
                          <MdOutlineDelete fontSize="20px" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AddressTable;
