import { postApi } from '@/lib/http';
import { BgHandlerDataItemType, SEND_DATA_IN_BG_LOCALSTORAGE_KEY } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query'; 

export const getCachedDataInBg = (type ?: number) => { 
  
  const bgHandlerData = localStorage.getItem(SEND_DATA_IN_BG_LOCALSTORAGE_KEY);
  if (bgHandlerData) {
    const bgData: BgHandlerDataItemType[] = JSON.parse(bgHandlerData);
    if (!type) return bgData;
    return bgData.filter((item) => item.reqType === type);
  }
  return [] ;
 }

 function useSendDataInBg() {
     const mutation = useMutation({
    mutationFn: async (data: BgHandlerDataItemType[]) => {
      const body = data.map((ele) => ({
        productId: ele.Id,
        reqType: ele.reqType,
        reqValue: ele.reqValue,
        reviewText: ele.reviewText || "",
      }));
      await postApi("Customer/applyChanges", {
        body: {

          data: body,
        }, 
      });
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

      const bgHandlerData = localStorage.getItem(SEND_DATA_IN_BG_LOCALSTORAGE_KEY);

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
            SEND_DATA_IN_BG_LOCALSTORAGE_KEY,
            JSON.stringify(remainingData)
          );
        } else {
          localStorage.removeItem(SEND_DATA_IN_BG_LOCALSTORAGE_KEY);
        }
      }
    },
    onError: (error) => {
      // هنا يمكنك التعامل مع الأخطاء
      console.error("Error sending data:", error);
    },
  });
  return mutation
}

export default useSendDataInBg