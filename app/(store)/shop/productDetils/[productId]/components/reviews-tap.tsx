'use client';

import React, { useEffect, useState } from "react";
import ReviewForm from "./review-form";
import ReviewComment from "./review-comment";
import { ReviewProps } from "../types";
import { getApi } from "@/lib/http";

type ProductReviewsTapProps = {
  productId: string | number;
};

const ProductReviewsTap: React.FC<ProductReviewsTapProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalRating, setTotalRating] = useState<number>(0);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState<number>(3); // Initially show 3 reviews

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getApi<any>(
          `CommentsAndRates/GetReviewsOfProduct?productId=${productId}&sort=1&pageNumber=1&pageSize=20`
        );

        if (response?.success) {
          setReviews(response.data);
        } else {
          setError("Failed to fetch reviews");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("An error occurred while fetching reviews.");
      } finally {
        setLoading(false);
      }
    };

    // تم حذف الدالة من قبل الباك اند
    // const fetchTotalRating = async () => {
    //   try {
    //     const response = await getApi<any>(
    //       `CommentsAndRates/GetTotalRateOfProduct/productId?productId=${productId}`
    //     );

    //     if (response?.success) {
    //       setTotalRating(response.data);
    //     } else {
    //       setError("Failed to fetch total rating");
    //     }
    //   } catch (err) {
    //     console.error("Error fetching total rating:", err);
    //     setError("An error occurred while fetching total rating.");
    //   }
    // };

    if (productId) {
      fetchReviews();
      // fetchTotalRating();
    }
  }, [productId]);

  const handleShowMore = () => {
    setVisibleReviewsCount((prevCount) => prevCount + 3);
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  const shouldShowMoreButton = visibleReviewsCount < reviews.length;

  return (
    <div className="grid grid-cols-3 gap-6" dir="rtl">
      <div className="bg-gray-50 border border-gray-300 rounded-md p-4">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold">{totalRating} من 5</div>
          <p className="text-gray-500">{reviews.length} تقييم على المنتج</p>
        </div>
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

        {reviews.length === 0 ? (
          <div className="text-center text-gray-500">
            لا توجد تعليقات
          </div>
        ) : (
          <>
            {reviews.map((review, index) => (
              <ReviewComment
                key={index}
                reviewer={review.customerName}
                date={new Date(review.reviewDate).toLocaleDateString()}
                rating={`⭐`.repeat(review.numOfRate)}
                comment={review.reviewText}
              />
            ))}

            {shouldShowMoreButton && (
              <div className="flex justify-center mt-4">
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-md"
                  onClick={handleShowMore}
                >
                  عرض المزيد
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductReviewsTap;
