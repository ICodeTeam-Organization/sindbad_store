import React, { useState } from "react";
import axios from "axios";
import { ReviewFormProps } from "../types";

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const [reviewText, setReviewText] = useState(""); 
  const [rate, setRate] = useState(3);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://icode-sendbad-store.runasp.net/api/CommentsAndRates/AddReviewToProduct",
        {
          productId: productId,
          rate: rate,
          reviewText: reviewText,
        }
      );

      console.log("Review added successfully", response.data);
      setReviewText("");
      setRate(5);       
      alert("تم نشر تعليقك بنجاح!");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("حدث خطأ أثناء إضافة تعليقك. حاول مرة أخرى.");
      }
      console.error("Failed to add review", error);
    } finally {
      setLoading(false);
    }
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
      <button
        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
        type="submit"
        disabled={loading}
      >
        {loading ? "جارٍ نشر تعليقك..." : "نشر تعليقك"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default ReviewForm;
