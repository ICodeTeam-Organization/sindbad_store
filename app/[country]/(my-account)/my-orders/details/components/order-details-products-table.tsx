"use client"
import SafeImage from "@/components/SafeImage";
import { NormalizedProductType } from "@/Data/normalizTypes";
import { get_currency_key } from "@/lib/cookie/cookie.clients";
import { cn,  } from "@/lib/utils"; 
import { useRouter } from "next-nprogress-bar";
import React from "react";

type Detail = {
  detail: NormalizedProductType[];
};

const OrderDetailProductsTable = ({ detail }: Detail) => {
 
  const currency = get_currency_key(detail[0]?.country);

  const router = useRouter()
  const goToProductdetails = (id:number) => { 
    router.push("/shop/product/" + id)
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
                  onClick={()=>{goToProductdetails(+details?.id)}}
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
                          className="ml-3 object-cover"
                          src={details?.image || ""}
                          alt="Product"
                        />
                      </div>
                      <span className="text-sm font-bold">
                        {details?.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-2">{details?.price.toFixed(2)} {currency}</td>
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
                  <td className="py-2">{(details?.shipCost ?? 0).toFixed(2)} {currency}</td>
                  <td className="py-2">
                    {(((details?.quantity ?? 0) * (details?.price ?? 0)) + (((details?.quantity ?? 0) + (details?.extraQuantity ?? 0)) * (details?.shipCost ?? 0))).toFixed(2)} {currency}
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
            onClick={()=>{goToProductdetails(+details?.id)}}
              key={ix}
              className={cn(
                "border cursor-pointer rounded-lg p-4 mb-4",
                  "bg-white"
              )}
            >
              <div className="flex  mb-2">
                <div className="w-20 h-20 relative bg-slate-100 rounded-lg overflow-hidden ">
                  <SafeImage  fill src={details?.image || ""} alt="Product"  />
                </div>
                <div className="px-3 my-2" >
                  <span className="text-sm font-bold block ">
                    {details?.name}
                  </span>
                  <p className="text-xs mt-1 text-primary-background font-bold" >
                  <span className="font-bold text-black">  السعر: </span>

                    {details?.price.toFixed(2)} {currency}
                  </p>
                  <p className="text-xs mt-1 text-primary-background font-bold" >
                  <span className="font-bold text-black">تكلفة الشحن: </span>
                  {(details?.shipCost ?? 0) * ((details?.extraQuantity ?? 0) + (details?.quantity ?? 0))} {currency}
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
                  <span className="text-base  font-bold" >{(((details?.quantity ?? 0) * (details?.price ?? 0)) + (((details?.quantity ?? 0) + (details?.extraQuantity ?? 0)) * (details?.shipCost ?? 0))).toFixed(2)} {currency}</span>
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
