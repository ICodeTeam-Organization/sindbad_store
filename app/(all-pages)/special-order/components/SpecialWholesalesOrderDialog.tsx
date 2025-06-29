import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/lib/http";
import {  useToast } from "@/hooks/use-toast";
import { Plus, Send, X } from "lucide-react";
import { useState } from "react";
import {
  SpecialWholesalesOrderFormValues,

} from "../utils/zod-schema";
import SpecialWholesalesOrderFormCard from "./SpecialWholesalesOrderFormCard";
import ResulteDialog from "./ResulteDialog";

function SpecialWholesalesOrderDialog({
  show = false,
  setShow,
  category = "",
}: {
  show: boolean;
  setShow: (s: boolean) => void;
  category?: string;
}) {
  const initValues = {
    orderKey: Math.random().toString(36).substring(2, 7),
    category: category || "",
    orderDetails: "",
    orderFrom: 200,
    isValid: false,
    isUrgen: false,
    quantity: 0,
    Name:""
  };
  const [ordersValues, setOrdersValues] = useState<
    SpecialWholesalesOrderFormValues[]
  >([initValues]);

  const [showResultesDialog, setShowResultesDialog] = useState<{
    success: { orderIndex: number; value: any }[];
    failed: { orderIndex: number; reason: any }[];
  } | null>(null);

  const { toast } = useToast(); // @todo: find a better way to implement the toast notification
  const onSuccess = () => {
    // @todo: show a taost notifaction
    // toast({
    //   variant: "default",
    //   description: "تم إرسال الطلبات بنجاح",
    // });
  };

  const onError = (error: any) => {
    // @todo: show a taost notifaction
    // toast({
    //   variant: "destructive",
    //   description: "حدث خطاء أثناء إرسال الطلبات",
    // });
    console.log("error", { error });
  };

  const handleOnSubmit = useMutation({
    mutationFn: async () => {
      const results = await Promise.allSettled(
        ordersValues.map(async (request) => {
          const data = {
            SpecialCategoryId: "category" in request ? +request.category : 0,
            // SpecialCategoryId: "dd",
            Name: "orderDetails" in request ? request.Name : "",
            Description: "orderDetails" in request ? request.orderDetails : "",
            // ECommerceName: "ecommerce" in request ? request.ecommerce + "" : "",
            LinkUrl: request.linkUrl,
            Source: request.orderFrom,
            Quantity: request.quantity,
            isUrgen: request.isUrgen,
            Note: "note" in request ? request.note : "",
            FilePDF: "filePDF" in request ? request.filePDF : null,
            Images: "images" in request ? request.images : [],
            Type: 4, //4 > للطلب الجملة
          };

          // Convert `data` to FormData
          const formData = new FormData();

          Object.entries(data).forEach(([key, value]) => {
            if (key === "Images" && Array.isArray(value)) {
              value.forEach((file) => {
                formData.append(`Images`, file);
              });
            } else if (key === "FilePDF" && value instanceof File) {
              formData.append("FilePDF", value);
            } else if (value !== null && value !== undefined) {
              formData.append(key, value.toString());
            }
          });

          // إرسال الطلب إلى API
          return await postApi(
            `SpecialProducts/Market/AskNewSpecialProductByCustomer`,
            {
              body: formData,
            }
          );
        })
      );

      // معالجة النتائج يرجع الي نجح والي فشل
      const response = {
        success: results
          .map((result, index) =>
            result.status === "fulfilled"
              ? { orderIndex: index, value: result.value }
              : null
          )
          .filter((item) => item !== null),
        failed: results
          .map((result, index) =>
            result.status === "rejected"
              ? { orderIndex: index, value: null, reason: result.reason }
              : null
          )
          .filter((item) => item !== null),
      };

      // if (failedRequests.length > 0) {
      //   console.error("Failed requests:", failedRequests.map(f => f.reason));
      //   throw new Error("Some requests failed. Check console for details.");
      // }

      setShowResultesDialog(response);

      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
  });

  const closeDialog = () => { 
    setShowResultesDialog(null);
    setShow(false);
    setOrdersValues([initValues])
   }

  return (
    <Dialog open={show} onOpenChange={closeDialog}>
      <DialogContent className="[&>button]:hidden border-none p-0 mdHalf:m-auto overflow-hidden mdHalf:h-auto mdHalf:w-screen  h-[90vh] w-[98vw]  ">
        <ResulteDialog
          data={showResultesDialog}
          onOpenChange={() => {
            // هذا عشان يتحقق اذا كل الطلبات تم ارسالها بنجاح لما تضغط اغلاق بيقفل المودل حق الطلب الخاص كاملا
            // اما اذا كان هناك خطاء بيقفل المودل الي يعرض النتائج حق ارسال الطلبات
            if (showResultesDialog?.failed.length == 0) {
              closeDialog()
            } else {
              setShowResultesDialog(null);
            }
          }}
          open={showResultesDialog != null}
        />

        <div className="mdHalf:h-[80vh] mdHalf:overflow-hidden overflow-auto" >
          <div className=" bg-[#257F24] sticky top-0 z-10  p-4 text-white flex items-center justify-between">
          <div className="flex gap-x-3" >
        <X  className="cursor-pointer" onClick={closeDialog} />
       <p>طلب بالجملة</p>
       </div>
            {/* <Link href="/" className="text-xs underline">
              كيف تطلب طلب خاص ؟
            </Link> */}
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-y-4 ">
              <div className="flex items-center justify-between gap-x-6">
                <Button
                  onClick={() => {
                    // لتحقق من ان الحقول حق اخر طلب كامله لكي لايسوي طلب قبل ما يكمل الطلب الاول
                    if (
                      ordersValues.length > 0 &&
                      !ordersValues[ordersValues.length - 1]?.isValid
                    ) {
                      toast({
                        variant: "destructive",
                        description: "يجب إكمال الطلب السابق قبل اضافة طلب اخر",
                      });
                    } else {
                      setOrdersValues([
                        ...ordersValues,
                        {
                          ...initValues,
                          orderKey: Math.random().toString(36).substring(2, 7),
                        },
                      ]);
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
                  if (!ordersValues[ordersValues.length - 1].isValid) {
                    toast({
                      variant: "destructive",
                      description: "يجب إكمال الطلب الأخير قبل الإرسال    ",
                    });
                  } else {
                    handleOnSubmit.mutate();
                  }
                }}
                className="bg-primary px-8 hover:bg-primary hover:bg-opacity-[0.7] tajawal "
              >
                {handleOnSubmit.isPending ? (
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

            {/* orders forms cards */}
            <div className="overflow-y-auto mdHalf:h-[60vh]">
              {ordersValues?.map((order, index) => (
                <SpecialWholesalesOrderFormCard
                  key={order.orderKey}
                  orderFrom={order?.orderFrom}
                  onDeleteOrderForm={() => {
                    setOrdersValues((prev) =>
                      prev.filter((ele) => ele.orderKey != order.orderKey)
                    );
                  }}
                  ordersNumber={ordersValues.length}
                  index={index}
                  orderKey={order?.orderKey}
                  initCategory={+category}
                  onChangeValues={(vals, isValid) => {
                    setOrdersValues((prevOrders) => {
                      return prevOrders.map((order) =>
                        order.orderKey === vals.orderKey
                          ? { ...vals, isValid }
                          : order
                      );
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SpecialWholesalesOrderDialog;
