import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/lib/http";
import { useToast } from "@/hooks/use-toast";

import Link from "next/link";
import { Check, Plus, Send } from "lucide-react";
import { useState } from "react";
import SpecialOrderFormCard from "./SpecialOrderFormCard";
import {
  SpecialOrderFromEcommerce_FormValue,
  SpecialProductAndServiceOrderForm_FormValue,
} from "../utils/zod-schema";
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

type SpecialOrderBody = {
  SpecialCategoryId?: number;
  Name?: string;
  Description?: string; // Optional
  ECommerceName?: string; // Optional
  LinkUrl?: string; // Optional
  Type?: number;
  Quantity?: number;
  isUrgen?: boolean;
  Note?: string; // Optional
  FilePDF?: File; // Optional
  Images?: File[]; // Optional array
};

// Initial values for Special Product And Special Service
const initialSpecialProduct: SpecialProductAndServiceOrderForm_FormValue = {
  category: "", // Required field
  // linkUrl: undefined, // Optional field
  type: 0, // Required field, default to 0 or appropriate type
  quantity: 1, // Required field, minimum value enforced by schema
  isUrgen: false, // Required field, default to false
  orderDetails:""
  // note: undefined, // Optional field
  // filePDF: undefined, // Optional field
  // images: undefined, // Optional field
};

// Initial values for SpecialOrderFromEcommerce
const initialSpecialEcommerce: SpecialOrderFromEcommerce_FormValue = {
  type: 0, // Required field
  ecommerce: "", // Required field
  linkUrl: "", // Required field
  quantity: 1, // Required field, minimum value enforced by schema
  isUrgen: false, // Required field, default to false
  // note: undefined, // Optional field
  // images: undefined, // Optional field
};

const SpecialOrderForm = ({
  tabType = 1,
  category = 0,
  closeDialog,
}: {
  tabType: number;
  category: number;
  closeDialog: () => void;
}) => {
  // ORDERS STATE //
  // هذي تحفظ الطلبات من اي نوع سوا منتج , خدمة , او متجر
  // الطلب ينحفظ مع حقل اسمه isValid لتحقق من ان الحقول المطلوبه حق الطلب  ريضه
  // حطيت قيمة افتراضية عشان اول ما يفتح المودل تظهر حقول الطلب الاول
  const initOrderValues = [
    tabType == 3 ? initialSpecialEcommerce : initialSpecialProduct,
  ];
  const [ordersValues, setOrdersValues] =
    useState<
      (
        | SpecialProductAndServiceOrderForm_FormValue
        | SpecialOrderFromEcommerce_FormValue
      )[]
    >(initOrderValues);
  // ORDERS STATE //

  const [showResultesDialog, setShowResultesDialog] = useState<{
    success: { orderIndex: number; value: any }[];
    failed: { orderIndex: number; reason: any }[];
  } | null>(null);

  const { toast } = useToast(); // @todo: find a better way to implement the toast notification
  const onSuccess = (res: any) => {
    // @todo: show a taost notifaction
    toast({
      variant: "default",
      description: "تم إرسال الطلبات بنجاح",
    });
    console.log("🚀 ~ onSuccess ~ res:", res);
  };

  const onError = (error: any) => {
    // @todo: show a taost notifaction
    toast({
      variant: "destructive",
      description: "حدث خطاء أثناء إرسال الطلبات",
    });
    console.log("error", { error });
  };

  const handleOnSubmit = useMutation({
    mutationFn: async () => {
      const results = await Promise.allSettled(
        ordersValues.map(async (request, index) => {
          const data = {
            SpecialCategoryId: "category" in request ? +request.category : 0,
            // SpecialCategoryId: "dd",
            Name: "orderDetails" in request ? request.orderDetails : "",
            Description: "orderDetails" in request ? request.orderDetails : "",
            ECommerceName: "ecommerce" in request ? request.ecommerce + "" : "",
            LinkUrl: request.linkUrl,
            Type: request.type,
            Quantity: request.quantity,
            isUrgen: request.isUrgen,
            Note: "note" in request ? request.note : "",
            FilePDF: "filePDF" in request ? request.filePDF : null,
            Images: "images" in request ? request.images : [],
          };

          // Convert `data` to FormData
          const formData = new FormData();

          Object.entries(data).forEach(([key, value]) => {
            if (key === "Images" && Array.isArray(value)) {
              value.forEach((file, index) => {
                formData.append(`Images[${index}]`, file);
              });
            } else if (key === "FilePDF" && value instanceof File) {
              formData.append("FilePDF", value);
            } else if (value !== null && value !== undefined) {
              formData.append(key, value.toString());
            }
          });

          console.log(formData.get("SpecialCategoryId"));

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

      console.log(response);

      setShowResultesDialog(response);

      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <div
      // onSubmit={form.handleSubmit((data) => handleOnSubmit.mutate(data))}
      className=" h-[80vh]"
    >
      <Dialog
        open={showResultesDialog != null}
        onOpenChange={() => {
          // هذا عشان يتحقق اذا كل الطلبات تم ارسالها بنجاح لما تضغط اغلاق بيقفل المودل حق الطلب الخاص كاملا
          // اما اذا كان هناك خطاء بيقفل المودل الي يعرض النتائج حق ارسال الطلبات
          if (showResultesDialog?.failed.length == 0) {
            closeDialog();
          } else {
            setShowResultesDialog(null);
          }
        }}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent dir="rtl" className="sm:max-w-md ">
          <DialogHeader>
            <DialogTitle dir="ltr">
              {" "}
              <Check />{" "}
            </DialogTitle>
            {showResultesDialog?.success &&
              showResultesDialog?.success.length > 0 && (
                <>
                  <DialogDescription
                    dir="rtl"
                    className="text-rightfont-semibold  text-green-400"
                  >
                    نجح إرسال الطلبات التالية :
                  </DialogDescription>
                  <DialogDescription dir="rtl" className="text-right">
                    {showResultesDialog?.success?.map((ele, inx) => (
                      <p>
                        {" "}
                        {inx + 1} - {ele.value?.message}{" "}
                      </p>
                    ))}
                  </DialogDescription>
                </>
              )}
            {showResultesDialog?.failed &&
              showResultesDialog?.failed.length > 0 && (
                <>
                  <DialogDescription
                    dir="rtl"
                    className="text-right font-semibold text-red-600"
                  >
                    فشل إرسال الطلبات التالية :
                  </DialogDescription>
                  <DialogDescription dir="rtl" className="text-right">
                    {showResultesDialog?.failed?.map((ele, inx) => (
                      <p>- </p>
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

      <div className=" bg-[#257F24] p-4 text-white flex items-center justify-between">
        <p>طلب خاص</p>
        <Link href="/" className="text-xs underline">
          كيف تطلب طلب خاص ؟
        </Link>
      </div>

      <div className="p-5">
        {/* section of addBtn and numOfOrders and SubmitBtn */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-between gap-x-6">
            <Button
              onClick={() => {
                // لتحقق من ان الحقول حق اخر طلب كامله لكي لايسوي طلب قبل ما يكمل الطلب الاول
                if (!ordersValues[ordersValues.length - 1].isValid) {
                  toast({
                    variant: "destructive",
                    description: "يجب إكمال الطلب السابق قبل اضافة طلب اخر",
                  });
                } else {
                  const newOrder = initOrderValues;
                  setOrdersValues(
                    (prevOrders) =>
                      [...prevOrders, newOrder[0]] as typeof prevOrders
                  );
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
              console.log(ordersValues);
              
              // if (!ordersValues[ordersValues.length - 1].isValid) {
              //   toast({
              //     variant: "destructive",
              //     description: "يجب إكمال الطلب السابق قبل الإرسال ",
              //   });
              // } else {
              //   handleOnSubmit.mutate();
              // }
            }}
            className="bg-primary-background px-8 hover:bg-primary-background hover:bg-opacity-[0.7] tajawal "
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

        <div className="overflow-y-auto h-[60vh]">
          {ordersValues?.map((order, index) => (
            <SpecialOrderFormCard
              key={index}
              ordersNumber={ordersValues.length}
              index={index}
              initCategory={category}
              initOrderType={tabType}
              onChangeValues={(vals, isValid) => {
                setOrdersValues((prevOrders) => {
                  const updatedOrders = [...prevOrders];
                  updatedOrders[index] = { ...vals, isValid };
                  return updatedOrders;
                });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOrderForm;
