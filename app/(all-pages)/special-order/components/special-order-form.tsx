import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/lib/http";
import { useToast } from "@/hooks/use-toast";

import { Plus, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import SpecialOrderFormCard from "./SpecialOrderFormCard";
import {
  SpecialOrderFromEcommerce_FormValue,
  SpecialProductAndServiceOrderForm_FormValue,
} from "../utils/zod-schema";

import ResulteDialog from "./ResulteDialog";

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
  orderDetails: "",
  // note: undefined, // Optional field
  // filePDF: undefined, // Optional field
  // images: undefined, // Optional field
  orderKey: "",
  Name: "",
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
  category: "",
  orderKey: "",
  Name: "",
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
  const initOrderValues =
    tabType == 3 ? initialSpecialEcommerce : initialSpecialProduct;
  const [ordersValues, setOrdersValues] = useState<
    (
      | SpecialProductAndServiceOrderForm_FormValue
      | SpecialOrderFromEcommerce_FormValue
    )[]
  >([
    {
      ...initOrderValues,
      orderKey: Math.random().toString(36).substring(2, 7),
    },
  ]);
  // ORDERS STATE //

  // const router = useRouter();
  const [showResultesDialog, setShowResultesDialog] = useState<{
    success: { orderIndex: number; value: any }[];
    failed: { orderIndex: number; reason: any }[];
  } | null>(null);

  const { toast } = useToast(); // @todo: find a better way to implement the toast notification
  const onSuccess = (res:any) => {
    setShowResultesDialog(res);
    //  router.push("/my-special-orders");
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
          const data: SpecialOrderBody = {
            SpecialCategoryId: "category" in request ? +request.category : 0,
            // SpecialCategoryId: "dd",
            Name: request.Name,
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
              value.map((v) => {
                formData.append("Images", v);
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

      return response;
    },
    onSuccess: onSuccess,
    onError: onError,
  });

  // ذا عشان لما يسوي طلب جديد ينزل به تحت
  const divRefForScroll = useRef<HTMLDivElement>(null); // Create a ref for the div
  const handleScrollToEnd = () => {
    if (divRefForScroll.current) {
      divRefForScroll.current.scrollTo({
        top: divRefForScroll.current.scrollHeight - 100, // Scroll to the bottom
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  return (
    <div
      // onSubmit={form.handleSubmit((data) => handleOnSubmit.mutate(data))}
      className=" mdHalf:h-[80vh] mdHalf:overflow-hidden overflow-auto"
    >
      <ResulteDialog
        data={showResultesDialog}
        onOpenChange={() => {
          // هذا عشان يتحقق اذا كل الطلبات تم ارسالها بنجاح لما تضغط اغلاق بيقفل المودل حق الطلب الخاص كاملا
          // اما اذا كان هناك خطاء بيقفل المودل الي يعرض النتائج حق ارسال الطلبات
          if (showResultesDialog?.failed.length == 0) {
            closeDialog();
          } else {
            setShowResultesDialog(null);
          }
        }}
        open={showResultesDialog != null}
      />

      <div className=" bg-[#257F24] p-4 text-white flex items-center justify-between sticky top-0 z-50 ">
        <div className="flex gap-x-3">
          <X
            className="cursor-pointer"
            onClick={() => {
              closeDialog();
            }}
          />
          <p>طلب خاص</p>
        </div>
        {/* <Link href="/" className="text-xs underline">
          كيف تطلب طلب خاص ؟
        </Link> */}
      </div>

      <div className="p-5">
        {/* section of addBtn and numOfOrders and SubmitBtn */}
        <div className="flex items-center justify-between mb-4  ">
          <div className=" flex items-center justify-between flex-wrap mdHalf:gap-x-6 gap-x-4 ">
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
                      [
                        ...prevOrders,
                        {
                          ...newOrder,
                          orderKey: Math.random().toString(36).substring(2, 7),
                        },
                      ] as typeof prevOrders
                  );
                  setTimeout(() => {
                    handleScrollToEnd();
                  }, 200);
                }
              }}
              className="text-xs text-black bg-[#FFDBC3] hover:bg-[#FFDBC3] hover:bg-opacity-[0.7] tajawal"
            >
              <span className="mx-2 font-bold">اضافة طلب</span>
              <Plus size={17} />
            </Button>
            <p className="text-xs mdHalf:block hidden">
              عدد الطلبات
              <span> ( {ordersValues.length} ) </span>
            </p>
          </div>
          <Button
            onClick={() => {
              if (!ordersValues[ordersValues.length - 1].isValid) {
                toast({
                  variant: "destructive",
                  description: "يجب إكمال الطلب السابق قبل الإرسال ",
                });
              } else {
                handleOnSubmit.mutate();
              }
            }}
            className="bg-primary mdHalf:px-8 hover:bg-primary hover:bg-opacity-[0.7] tajawal "
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

        <p className="text-xs mdHalf:hidden block mx-2 mb-4 ">
          عدد الطلبات
          <span> ( {ordersValues.length} ) </span>
        </p>

        <div ref={divRefForScroll} className="overflow-y-auto mdHalf:h-[60vh] ">
          {ordersValues?.map((order, index) => (
            <SpecialOrderFormCard
              orderKey={order?.orderKey}
              key={order?.orderKey}
              orderslength={ordersValues?.length}
              ordersNumber={ordersValues?.length}
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
              onOrderDelete={(key) => {
                setOrdersValues(ordersValues.filter((i) => i.orderKey != key));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOrderForm;
