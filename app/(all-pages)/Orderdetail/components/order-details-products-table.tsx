"use client"
import SafeImage from "@/components/SafeImage";
import { cn } from "@/lib/utils";
import { useRouter } from "next-nprogress-bar";
import React from "react";

type Detail = {
  detail: {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    imageUrl: string;
    shipCost:number
  }[];
};

const OrderDetailProductsTable = ({ detail }: Detail) => {


  const router = useRouter()
  const goToProductdetails = (id:number) => { 
    router.push("/shop/productDetils/" + id)
   }

  return (
    <div className="overflow-x-auto border  rounded-lg">
      <div>
        {/* Desktop Table */}
        <div className="hidden mdHalf:block overflow-x-auto border rounded-lg">
          <table className="min-w-full table-auto whitespace-nowrap">
            <thead>
              <tr className="text-center font-semibold text-sm mb-4">
                <th className="px-8 py-4">المنتج</th>
                <th className="px-8 py-4">السعر</th>
                <th className="px-8 py-4">الكمية</th>
                <th className="px-8 py-4">تكلفة الشحن</th>
                <th className="px-8 py-4">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              {detail.map((details, ix) => (
                <tr  
                  key={ix}
                  onClick={()=>{goToProductdetails(details?.productId)}}
                  className={cn(
                    "text-center cursor-pointer border-gray-300",
                    ix % 2 === 0 && "bg-slate-100"
                  )}
                >
                  <td className="py-2">
                    <div className="flex items-center">
                      <div className="w-20 h-20 relative mr-4 bg-slate-100 rounded-lg me-4 overflow-hidden">
                        <SafeImage
                          fill
                          className="ml-3"
                          src={details?.imageUrl || ""}
                          alt="Product"
                        />
                      </div>
                      <span className="text-sm font-bold">
                        {details?.productName}
                      </span>
                    </div>
                  </td>
                  <td className="py-2">{details?.price.toFixed(2)} رس</td>
                  <td className="py-2">
                    <div className="flex items-center justify-center">
                      <input
                        value={details?.quantity}
                        type="number"
                        className="w-14 text-center bg-transparent remove-arrow outline-none"
                        readOnly
                      />
                    </div>
                  </td>
                  <td className="py-2">{details?.shipCost.toFixed(2)} رس</td>
                  <td className="py-2">
                    {((details?.quantity * details?.price) + (details?.quantity * details?.shipCost)).toFixed(2)} رس
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block mdHalf:hidden">
          {detail.map((details, ix) => (
            <div
            onClick={()=>{goToProductdetails(details?.productId)}}
              key={ix}
              className={cn(
                "border cursor-pointer rounded-lg p-4 mb-4",
                  "bg-white"
              )}
            >
              <div className="flex  mb-2">
                <div className="w-20 h-20 relative bg-slate-100 rounded-lg overflow-hidden ">
                  <SafeImage fill src={details?.imageUrl || ""} alt="Product" />
                </div>
                <div className="px-3 my-2" >
                  <span className="text-sm font-bold block ">
                    {details?.productName}
                  </span>
                  <p className="text-xs mt-1 text-primary-background font-bold" >
                    {details?.price.toFixed(2)} رس
                  </p>
                  <p className="text-xs mt-1 text-primary-background font-bold" >
                  <span className="font-bold text-black">تكلفة الشحن: </span>
                  {details?.shipCost.toFixed(2)} رس
                </p>
                </div>
              </div>
              <div className="text-xs p-1">
               
                <p>
                  <span className="font-bold">الكمية: </span>
                  {details?.quantity}
                </p>
                
                <p className="text-primary-background flex justify-between items-center my-2 -mb-1" >
                  <span className="font-bold text-black"> إجمالي السعر والشحن </span>
                  <span className="text-base  font-bold" >{(details?.quantity * details?.price).toFixed(2)} رس</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailProductsTable;
