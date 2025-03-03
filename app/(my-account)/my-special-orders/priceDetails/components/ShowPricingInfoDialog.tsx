import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pricing } from "../../types";
import ImagesViewr from "@/components/ImagesViewr";

function ShowPricingInfoDialog({
  show,
  setShow,
  data,
}: {
  show: boolean;
  setShow: (status: boolean) => void;
  data: Pricing | null;
}) {
  return (
    <Dialog open={show && data != null} onOpenChange={setShow}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle> </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4  w-full">
          <div className="flex justify-center  w-full overflow-hidden">
            <ImagesViewr
              images={data?.images.map((e:any)=>e?.imageUrl) ?? []}
              key={10}
            />
          </div>

          {/* السعر والشحن */}
          <div className="flex justify-between items-center tajawal">
            <span className="text-sm font-semibold">
              السعر: {data?.price} رس
            </span>
            <span className="text-sm text-gray-500">
              الشحن: {data?.shippingCost} رس
            </span>
          </div>

          {/* ملاحظات */}
          <div>
            <p className="text-sm text-gray-600">
              {data?.note ?? "لاتوجد ملاحظات إضافية حول المنتج."}
            </p>
          </div>

          <div className="flex items-center space-x-4 gap-x-4">
            <label htmlFor="quantity" className="text-sm font-medium">
              الكمية : 
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              disabled
              defaultValue={data?.quantity}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-start mt-4 space-x-2 gap-x-2 ">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              إغلاق
            </Button>
          </DialogClose>
          {/* <Button type="button" className="bg-primary-background hover:bg-primary-background" >أضف إلى السلة</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ShowPricingInfoDialog;
