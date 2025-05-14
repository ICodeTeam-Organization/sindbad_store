"use client";
import { BgHandlerDataItemType } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const SendDataInBG = () => {
  const { data: session } = useSession();

  const { mutate } = useMutation({
    mutationFn: async (data: BgHandlerDataItemType[]) => {
      const body = data.map((ele) => ({
        productId: ele.Id,
        reqType: ele.reqType,
        reqValue: ele.reqValue,
        reviewText: ele.reviewText || "",
      }));

      const responsive = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "Bulk/applyChanges",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.data.token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!responsive.ok) {
        const errData = await responsive.json();
        throw new Error(
          (errData && errData?.message) ||
            responsive.statusText ||
            "Network response was not ok"
        );
      }
      return body as any;
    },
    onSuccess: (
      body: {
        productId: string | number;
        reqType: string;
        reqValue: string | number;
        reviewText: string;
      }[]
    ) => {

       // بعد إرسال البيانات، يمكنك مسحها من localStorage
        // أو تركها إذا كنت بحاجة إلى إبقائها:
        // هنا عاده بيكون فيه شرط قبل الحذف من الوكل ستوراج بعد الارسال
        // عشان نتأكد اذا اليوزر مثلا زود في الكمية حق منتج وبعدين الركوست حق تحديث الكمية قيد الإرسال وزود وهو قيد الارسال مفروض نخليه يبقي الحاجات الجديده ويرسلها مره ثانية يعني باختصار مايحذف الحاجات الي انضافت اثناء عمل الركوست حق الارسال
        // استدعاء الدالة لإرسال البيانات

      const bgHandlerData = localStorage.getItem("backgroundHandlerData");

      if (bgHandlerData) {
        const bgData: BgHandlerDataItemType[] = JSON.parse(bgHandlerData);

        const sentMap = new Map(
          body.map((item) => [
            item.productId,
            {
              reqType: item.reqType,
              reqValue: item.reqValue,
              reviewText: item.reviewText,
            },
          ])
        );

        const remainingData = bgData.filter((item) => {
          const sentItem = sentMap.get(item.Id);
          if (!sentItem) return true;
          return (
            sentItem.reqValue !== item.reqValue ||
            sentItem.reviewText !== (item.reviewText || "")
          );
        });
 
        if (remainingData.length > 0) {
          localStorage.setItem(
            "backgroundHandlerData",
            JSON.stringify(remainingData)
          );
        } else {
          localStorage.removeItem("backgroundHandlerData");
        }
      }
    },
    onError: (error) => {
      // هنا يمكنك التعامل مع الأخطاء
      console.error("Error sending data:", error);
    },
  });

  useEffect(() => { 
    const interval = setInterval(() => {
      const bgHandlerData = localStorage.getItem("backgroundHandlerData");
      if (bgHandlerData) {
        const dataToSend: BgHandlerDataItemType[] = bgHandlerData
          ? JSON.parse(bgHandlerData)
          : null; 
        if (dataToSend && dataToSend.length != 0) {
          mutate(dataToSend);
        }
      }
    }, 10000);  
    console.log("interval set"); 
    return () => clearInterval(interval);
  }, []);  

  return null;  
};

export default SendDataInBG;
