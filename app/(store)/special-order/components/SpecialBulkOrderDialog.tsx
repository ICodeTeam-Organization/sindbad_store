import React from 'react'
import SpecialOrderForm from './special-order-form';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/lib/http";
import { toast, useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Plus, Send } from "lucide-react";
import { useState } from "react";
import SpecialOrderFormCard from "./SpecialOrderFormCard";
import {
  SpecialBulkOrderFormValues,
  SpecialOrderFromEcommerce_FormValue,
  SpecialProductAndServiceOrderForm_FormValue,
} from "../utils/zod-schema";
import SpecialBulkOrderForms from './SpecialBulkOrderForms';
import { isValid } from 'zod';

function SpecialBulkOrderDialog({
    show = false,
    setShow,
    tab = 4,
    category = "",
  }: {
    show: boolean;
    setShow: (s: boolean) => void;
    tab?: number;
    category?: string;
  }) {
     
   const [ordersValues, setOrdersValues] = useState<(SpecialBulkOrderFormValues | any)[]>([]);
   

    
  return (
    <Dialog open={show} onOpenChange={setShow}>
    <DialogContent className="[&>button]:hidden border-none p-0 m-auto overflow-hidden ">
    <div>
      <div className=" bg-[#257F24] p-4 text-white flex items-center justify-between">
          <p>طلب بالجملة</p>
          <Link href="/" className="text-xs underline">
            كيف تطلب بالجملة  ؟
          </Link>
        </div>

       <div className='p-4' >
          <div className="flex items-center justify-between mb-4 ">
              <div className="flex items-center justify-between gap-x-6">
                <Button
                
                  onClick={() => {
                    // لتحقق من ان الحقول حق اخر طلب كامله لكي لايسوي طلب قبل ما يكمل الطلب الاول
                    if (ordersValues.length > 0 && !ordersValues[ordersValues.length - 1]?.isValid) {
                      toast({
                        variant: "destructive",
                        description: "يجب إكمال الطلب السابق قبل اضافة طلب اخر",
                      });
                    } else {
                      setOrdersValues([...ordersValues,{}])
                    }
                  }}
                  className="text-xs text-black bg-[#FFDBC3] hover:bg-[#FFDBC3] hover:bg-opacity-[0.7] tajawal"
                >
                  <span className="mx-2 font-bold">اضافة طلب</span>
                  <Plus size={17} />
                </Button>
                <p className="text-xs">
                  عدد الطلبات
                  <span> ( {ordersValues.length} ) </span>
                </p>
              </div>
              <Button
                onClick={() => {
                  // handleOnSubmit.mutate();
                  console.log(ordersValues);
                  
                }}
                className="bg-primary-background px-8 hover:bg-primary-background hover:bg-opacity-[0.7] tajawal "
              >
                {false ? (
                  <div className="">
                    {" "}
                    <div className="h-6 w-6 outline rounded-full p-1 animate-spin ">
                      <div className="w-2 h-2  bg-white rounded-full " />
                    </div>{" "}
                  </div>
                ) : (
                  <div className="flex">
                    <span className="mx-2 font-bold text-xs">إرسال</span>
                    <Send className="-rotate-90" size={16} />
                  </div>
                )}
              </Button>
          </div>

          <div className="overflow-y-auto h-[60vh]">
          {ordersValues?.map((order, index) => (
            <SpecialBulkOrderForms
            onDeleteOrderForm={()=>{
              console.log("delete by index : ",index);
            }}
              ordersNumber={ordersValues.length}
              index={index}
              initCategory={+category}
              onChangeValues={(vals, isValid) => {
                setOrdersValues((prevOrders) => {
                  const updatedOrders = [...prevOrders];
                  updatedOrders[index] = { ...vals , isValid };
                  return updatedOrders;
                });
              }}
            />
          ))}
        </div>

       </div>

    </div>
    </DialogContent>
  </Dialog>
  )
}

export default SpecialBulkOrderDialog