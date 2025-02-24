import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { BsCheck2Circle } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
   
interface props {
    data:{
        success: { orderIndex: number; value: any }[];
        failed: { orderIndex: number; reason: any }[];
      } | null,
    open:boolean,
    onOpenChange:()=>void
}



function ResulteDialog({onOpenChange,open,data}:props) {
  return (
    <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent dir="rtl" className="sm:max-w-md ">
          <DialogHeader>
            <DialogTitle dir="ltr"> {/* <Check />{" "} */}</DialogTitle>
            {/* ذا بينعرض اذا ارتسلت كل الطلبات */}
            {data?.failed &&
              data?.failed.length == 0 &&
              data?.success &&
              data?.success.length > 0 && (
                <>
                  <DialogDescription
                    dir="rtl"
                    className=" font-semibold  text-center   text-green-400"
                  >
                    <div className="flex items-center mt-4 justify-center mb-4 text-primary-background">
                      <BsCheck2Circle size={50} />
                    </div>
                    <p>تم إرسال جميع الطلبات بنجاح</p>
                  </DialogDescription>
                </>
              )}
            {/* ذا بينعرض اذا ارتسلت بعض الطلبات */}
            {data?.failed &&
              data?.failed.length > 0 &&
              data?.success &&
              data?.success.length > 0 && (
                <>
                  <DialogDescription
                    dir="rtl"
                    className="text-right font-semibold   text-green-400"
                  >
                    نجح إرسال الطلبات التالية :
                  </DialogDescription>
                  <DialogDescription dir="rtl" className="text-right">
                    {data?.success?.map((ele, inx) => (
                      <p key={ele.orderIndex + inx} > طلب رقم {ele.orderIndex  + 1}</p>
                    ))}
                  </DialogDescription>
                </>
              )}

            {/* ذا بينعرض اذا فشلت بعض الطلبات */}
            {data?.failed &&
              data?.failed.length > 0 && (
                <>
                  <DialogDescription
                    dir="rtl"
                    className="text-right font-semibold text-red-600"
                  >
                    فشل إرسال الطلبات التالية :
                  </DialogDescription>
                  <DialogDescription dir="rtl" className="text-right">
                    {data?.failed?.map((ele, inx) => (
                      <p key={ele.orderIndex + inx} >طلب رقم {ele.orderIndex  + 1}</p>
                    ))}
                  </DialogDescription>
                </>
              )}
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                اغلاق
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default ResulteDialog