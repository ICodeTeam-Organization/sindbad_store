import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { ReviewFormProps } from "../types";

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const [reviewText, setReviewText] = useState("");
  const [rate, setRate] = useState(3);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        "https://icode-sendbad-store.runasp.net/api/CommentsAndRates/AddReviewToProduct",
        {
          productId: productId,
          rate: rate,
          reviewText: reviewText,
        },
        {
          headers: {
            "Accept-Language": "ar",
            "Content-Type": "application/json",
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
      const errorMessage = error?.response?.data?.message || "حدث خطأ أثناء إضافة تعليقك. حاول مرة أخرى.";
      
      toast({
        variant: "destructive",
        description: errorMessage,
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
  });

  const { isLoading } = mutation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (reviewText.trim() === "") {
      setValidationError("يرجى إضافة تعليق قبل النشر.");
      return;
    }

    if (rate < 1 || rate > 5) {
      setValidationError("يرجى اختيار تقييم بين 1 و 5.");
      return;
    }
    setValidationError(null);
    mutation.mutate();
  };

  return (
    <form className="space-y-4 text-start" onSubmit={handleSubmit}>
      <div className="text-gray-600">أضف تعليقك</div>

      <textarea
        className="w-full border border-gray-300 p-2 rounded-md text-sm"
        rows={4}
        placeholder="يرجى إضافة تعليقك .."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>

      <div>
        <label className="text-gray-600">التقييم: </label>
        <select
          className="border border-gray-300 p-2 rounded-md"
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
        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "جارٍ نشر تعليقك..." : "نشر تعليقك"}
      </button>
    </form>
  );
};

export default ReviewForm;
