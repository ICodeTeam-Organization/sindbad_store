'use client'
import React, { useEffect, useState } from "react";
import ReviewForm from './ReviewForm';
import ReviewComment from './ReviewComment';
import { ReviewProps } from '../types';
import { getApi } from "@/lib/http"; // Ensure this function is correctly implemented

type ProductReviewsTapProps = {
  productId: string;
};

const ProductReviewsTap: React.FC<ProductReviewsTapProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getApi<any>(
          `CommentsAndRates/GetReviewsOfProductForViewInProductDetailsPage/${productId}/3`
        );

        if (response?.success) {
          setReviews(response.data);
        } else {
          setError('Failed to fetch reviews');
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError('An error occurred while fetching reviews.');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-3 gap-6" dir="rtl">
      <div className="bg-gray-50 border border-gray-300 rounded-md p-4">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold">4.5 من 5</div>
          <p className="text-gray-500">{reviews.length} تقييم على المنتج</p>
        </div>
        {/* Pass productId as a prop to ReviewForm */}
        <ReviewForm productId={Number(productId)} />
      </div>

      <div className="col-span-2">
        <div className="flex justify-between items-center mb-4 border border-gray-300 rounded-lg p-4">
          <h3 className="font-semibold text-lg">تعليقات المستخدمين</h3>
          <div className="flex items-center space-x-reverse space-x-2">
            <span>ترتيب حسب :</span>
            <select className="border border-gray-300 px-2 py-1 rounded-md">
              <option>الأحدث</option>
              <option>الأعلى تقييماً</option>
            </select>
          </div>
        </div>

        {reviews.map((review, index) => (
          <ReviewComment
            key={index}
            reviewer={review.customerName}
            date={new Date(review.reviewDate).toLocaleDateString()}
            rating={`⭐`.repeat(review.numOfRate)}
            comment={review.reviewText}
          />
        ))}

        {/* Add "Load More" functionality */}
        <div className="flex justify-center mt-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md">
            عرض المزيد
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewsTap;
