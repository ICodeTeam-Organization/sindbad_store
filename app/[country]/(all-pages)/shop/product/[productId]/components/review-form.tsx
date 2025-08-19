import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";  
import { useSession } from "next-auth/react";
import { postApi } from "@/lib/http";
import { ReviewProps } from "../types"; 
import { savebackgroundDataInCache } from "@/Data/cachingAndBgData/backgroundData";

export interface ReviewFormProps {
  productId: number;
  onReviewAdded: (review: ReviewProps) => void;  
  hasReview?: boolean; // هذا الحقل اختياري، يمكن استخدامه لتحديد ما إذا كان المستخدم قد قام بمراجعة المنتج بالفعل\
  isAuth?:boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId , onReviewAdded , hasReview , isAuth}) => {
  
  const [reviewText, setReviewText] = useState("");
  const [rate, setRate] = useState(3);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { toast } = useToast();
  const { data: session } = useSession();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!session) {
        throw new Error("لا يوجد جلسة نشطة");
      }
      const res = await postApi(
        "CommentsAndRates/AddReviewToProduct",
       
        {
          headers: {
            "Accept-Language": "ar",
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user?.data?.token}`,
          },
          body:{
            productId,
            rate,
            reviewText,
            reviewImageUrl: "string", // يمكن تغيير هذا لاحقًا ليكون حقلًا اختياريًا
          },
        }
      );
      return res;
    },
    onSuccess: () => {
      setReviewText("");
      setRate(3);
      setValidationError(null);

      toast({
        variant: "default",
        description: "تم نشر تعليقك بنجاح!",
        style: {
          backgroundColor: "green",
        },
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || "حدث خطأ أثناء إضافة تعليقك.";
      
      toast({
        variant: "destructive",
        description: errorMessage,
        // action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });

      console.log(JSON.stringify(error));
      console.log(error);
      console.log(error?.message);

    },
  });

  const { isPending } = mutation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    if (!isAuth) {
      return setValidationError(" يجب تسجيل الدخول اولا ")
    }

    if (hasReview) return setValidationError("لقد قمت بالفعل بنشر مراجعة لهذا المنتج.");

    // if (reviewText.trim() === "") {
    //   setValidationError("يرجى إضافة تعليق قبل النشر.");
    //   return;
    // }

    if (rate < 1 || rate > 5) {
      setValidationError("يرجى اختيار تقييم بين 1 و 5.");
      return;
    }

    setValidationError(null);
    const data  = {
      reqType: 2,
      reqValue: rate,
      Id: productId,
      reviewText: reviewText,
      date: new Date().toISOString(), 
      primaryReviewText: "",
      primaryValue : 0
    }
    savebackgroundDataInCache(data)
    onReviewAdded({
      customerImage:"",
      customerName: session?.user.data.name || "انت",
      reviewText,
      reviewDate: data.date,
      numOfRate: rate,
      isDeleted: false,
      isMe: true,
      id:'0',
    })

    setReviewText("");
    setRate(3);
    // mutation.mutate();
  };

  return (
    <form className="space-y-4 text-start " onSubmit={handleSubmit}>
      <div>
        <p className="text-secondary p-2">أضف تعليقك</p>
        <p className="text-gray-600 p-2 text-sm"> لا يمكنك كتابة مراجعة إلا بعد شراء المنتج. </p>
      </div>

      <textarea
        className="w-full border border-gray-200 bg-[#fafafa] p-2 rounded-md text-sm"
        rows={4}
        placeholder="يرجى إضافة تعليقك .."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>

      <div>
        <label className="text-gray-600">  </label>
        <select
          className="border border-gray-200 p-2 py-1 rounded-md w-full"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        >
          <option value={1}>⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={5}>⭐⭐⭐⭐⭐</option>
        </select>
      </div>

      {validationError && <p className="text-red-500 text-sm">{validationError}</p>}

      <button
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "جارٍ نشر تعليقك..." : "نشر تعليقك"}
      </button>
    </form>
  );
};

export default ReviewForm;