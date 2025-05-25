"use client";
//TODO تصليح الركوستات حق جلب التعليقات واضافة تعديل وحذف للتعليق
import React, { useEffect, useState } from "react";
import ReviewForm from "./review-form";
import ReviewComment from "./review-comment";
import { ReviewProps } from "../types";
import { getApi } from "@/lib/http";
import { Product } from "./../types";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { useInfiniteQuery } from "@tanstack/react-query";
import CommentSkeleton from "./CommentSkeleton";
import { getCachedDataInBg } from "@/hooks/useSendDataInBg";
// import { useSession } from "next-auth/react";

type ProductReviewsTapProps = {
  productId: string | number;
  product: Product;
};

const ProductReviewsTap: React.FC<ProductReviewsTapProps> = ({ productId }) => {
  const [reviewsList, setReviewsList] = useState<ReviewProps[]>([]);
  // const { data:session } = useSession();
  const {
    data,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["reviews", productId],
    queryFn: async ({ pageParam = 1 }) => {
      const cachedReviews = getCachedDataInBg(2);
      const response = await getApi<{
        data: { items: ReviewProps[]; currentPage: number; totalPages: number };
      }>(
        `CommentsAndRates/GetReviewsOfProduct?productId=${productId}&sort=1&pageNumber=${pageParam}&pageSize=20`
      );
      let myReviews;
      if (pageParam === 1) {
  myReviews = await getApi<{ data: ReviewProps }>(
    `CommentsAndRates/GetCommentsAndRates?productId=${productId}`
  );

  if (cachedReviews.length > 0) {
    const cachedReview = cachedReviews.find((item) => item.Id == productId);

    if (cachedReview) {
      if (myReviews?.data) {
        myReviews.data = {
          ...myReviews.data,
          numOfRate: cachedReview.reqValue,
          reviewText: cachedReview.reviewText || "",
        };
      } else {
       myReviews = {
        data: {
          id: "0",
          numOfRate: cachedReview.reqValue,
          reviewText: cachedReview.reviewText || "",
          customerName: "انت",
          reviewDate: cachedReview.date || new Date().toISOString(),
          isMe: true,
          customerImage: "",
          productId: Number(productId), // ✅ تحويله إلى number
          isDeleted: false,
        },
      } as { data: ReviewProps };
      }
    }
  } else {
    if (myReviews?.data) {
      myReviews.data = { ...myReviews.data, isMe: true };
    }
  }
}


      return {
        data: myReviews?.data
          ? [myReviews?.data, ...response.data.items]
          : response.data.items,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    retry: 0,
  });

  useEffect(() => {
    if (data) {
      const allReviews = data.pages.flatMap((page) => page.data);
      console.log("allReviews", allReviews);

      setReviewsList(allReviews);
    }
  }, [data]);

  const totalRating = reviewsList.reduce(
    (acc, review) => acc + review.numOfRate,
    0
  );
  const averageRating =
    reviewsList.length > 0
      ? (totalRating / reviewsList.length).toFixed(1)
      : "0";

  return (
    <div className="mdHalf:grid grid-cols-3 gap-6" dir="rtl">
      <div className="bg-gray-50 border border-gray-300 rounded-md p-3 mb-4">
        <div className="bg-white border border-gray-300 rounded-md p-3 mb-4">
          <h3 className="mx-4 text-center text-base font-semibold mb-2">
            التقييم والمراجعات
          </h3>
          <div className="flex">
            <div className="flex flex-col w-[35%] py-0 justify-center items-center mb-3">
              <span className="text-3xl font-bold mb-1">{averageRating}</span>

              <Rating
                style={{ maxWidth: 100 }}
                halfFillMode="svg"
                itemStyles={{
                  itemShapes: RoundedStar,
                  activeFillColor: "#ffb700",
                  inactiveFillColor: "#eee",
                }}
                readOnly
                value={Number(averageRating)}
              />
              <div className="flex items-center justify-center mt-2">
                <span className="text-gray-500 text-xs">
                  {reviewsList.length} تقييم
                </span>
              </div>
            </div>

            {/* شريط التقييم */}
            <div className="flex flex-col justify-center w-[65%]">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviewsList.filter(
                  (review: ReviewProps) => review.numOfRate === rating
                ).length;
                const percentage =
                  reviewsList.length > 0
                    ? (count / reviewsList.length) * 100
                    : 0;

                return (
                  <div key={rating} className="flex items-center mb-1">
                    <span className="w-6 text-center text-xs">{rating}</span>
                    <div className="relative w-full h-[6px] bg-gray-200 rounded-full">
                      <div
                        className="absolute h-[6px] bg-black"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <ReviewForm
          productId={Number(productId)}
          hasReview={reviewsList.some(
            (review) => review.isMe && review.numOfRate > 0
          )}
          onReviewAdded={(newReview) => {
            setReviewsList((prevReviews) =>
              prevReviews.map((review) =>
                review.isMe && review.numOfRate == 0
                  ? { ...review, ...newReview, isMe: true }
                  : newReview
              )
            ); 
          }}
        />
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

        {error ? (
          <div>{error.message || "حدث خطاء أثناء جلب التعليقات"}</div>
        ) : isPending ? (
          <div className="flex flex-col justify-center items-center">
            {[...Array(5)].map((_, index) => (
              <CommentSkeleton key={index} />
            ))}
          </div>
        ) : reviewsList.filter((e) => e.numOfRate > 0).length == 0 ? (
          <div className="text-center text-gray-500">لا توجد تعليقات</div>
        ) : (
          <>
            {reviewsList.map((review, index) => (
              <ReviewComment
                key={index}
                reviewer={review.customerName}
                date={new Date(review.reviewDate).toLocaleDateString()}
                rating={review.numOfRate}
                comment={review.reviewText}
                isMe={review.isMe}
                productId={+productId}
                reviewId={review.id}
                onEditingEnd={(updatedData) => {
                  setReviewsList(() =>
                    reviewsList.map((r) =>
                      r.isMe
                        ? {
                            ...r,
                            reviewText: updatedData.comment || r.reviewText,
                            numOfRate: updatedData.rating || r.numOfRate,
                          }
                        : r
                    )
                  );
                }}
                onDeletingEnd={(productId) => {
                  if (!productId) return;
                  setReviewsList((prevReviews) =>
                    prevReviews.map((r) => ({ ...r, numOfRate: 0 }))
                  );
                }}
              />
            ))}

            {hasNextPage && (
              <div className="flex justify-center mt-4">
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "جاري التحميل..." : "عرض المزيد"}
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
