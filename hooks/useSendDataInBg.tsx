import { BgHandlerDataItemType } from "@/Data/cachingAndBgData/type";
import { db } from "@/Data/database/db";
import { getApi, patchApi, postApi } from "@/lib/http"; 
import { useMutation } from "@tanstack/react-query";

function useSendDataInBg() {
  const mutation = useMutation({
    mutationFn: async (data: BgHandlerDataItemType[]) => {
      const body = data.map((ele) => ({
        productId: isNaN(+ele.Id) ? 0 : ele.Id,
        reqType: ele.reqType,
        reqValue: ele.reqValue,
        reviewText: ele.reviewText || "",
      }));
      await patchApi("Customers", {
        body: {
          data: body,
        },
      });
      return body as any;
    },
    onSuccess: async (
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
       const senedData:any = body.map(item => [+item.reqType, item.productId || item.reviewText] );
       console.log(senedData);
       await db.bgData.bulkDelete(senedData);


    },
    onError: (error) => {
      // هنا يمكنك التعامل مع الأخطاء
      console.error("Error sending data:", error);
    },
  });
  return mutation;
}

export default useSendDataInBg;
