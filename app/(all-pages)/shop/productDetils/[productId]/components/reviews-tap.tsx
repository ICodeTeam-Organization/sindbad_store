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
import AlertRemoveReview from "./AlertRemoveReview";
import EditCommentDialog from "./EditCommentDialog";
import { storeInBgcache } from "@/lib/utils";
// import { useSession } from "next-auth/react";

type ProductReviewsTapProps = {
  productId: string | number;
  product: Product;
};

const ProductReviewsTap: React.FC<ProductReviewsTapProps> = ({
  productId,
  product,
}) => {
  const numOfReviewers =
    (product?.oneStarCount || 0) +
    (product?.twoStarCount || 0) +
    (product?.threeStarCount || 0) +
    (product?.fourStarCount || 0) +
    (product?.fiveStarCount || 0);

  const noOfStars =
    (product?.oneStarCount || 0) * 1 +
    (product?.twoStarCount || 0) * 2 +
    (product?.threeStarCount || 0) * 3 +
    (product?.fourStarCount || 0) * 4 +
    (product?.fiveStarCount || 0) * 5;

  const rating = numOfReviewers > 0 ? noOfStars / numOfReviewers : 0;

  const [reviewsList, setReviewsList] = useState<ReviewProps[]>([]);
  const [edtDialog, setEdtDialog] = useState({
    isOpen: false,
    data: { comment: "", productId, rating: 0 },
  });
  const [delDialog, setDelDialog] = useState({ isOpen: false, reviewId: 0 });
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
          const cachedReview = cachedReviews.find(
            (item) => item.Id == productId
          );

          if (cachedReview) {
            if (myReviews?.data) {
              myReviews.data = {
                ...myReviews.data,
                numOfRate: cachedReview.reqValue,
                reviewText: cachedReview.reviewText || "",
                isMe: true,
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
      setReviewsList(allReviews);
    }
  }, [data]);

  return (
    <div className="mdHalf:grid grid-cols-3 gap-6" dir="rtl">
      <div className="bg-gray-50 border border-gray-300 rounded-md p-3 mb-4">
        <div className="bg-white border border-gray-300 rounded-md p-3 mb-4">
          <h3 className="mx-4 text-center text-base font-semibold mb-2">
            التقييم والمراجعات
          </h3>
          <div className="flex">
            <div className="flex flex-col w-[35%] py-0 justify-center items-center mb-3">
              <span className="text-3xl font-bold mb-1">
                {+(+rating).toFixed(1)}
              </span>

              <Rating
                style={{ maxWidth: 100 }}
                halfFillMode="svg"
                itemStyles={{
                  itemShapes: RoundedStar,
                  activeFillColor: "#ffb700",
                  inactiveFillColor: "#eee",
                }}
                readOnly
                value={+rating}
              />
              <div className="flex items-center justify-center mt-2">
                <span className="text-gray-500 text-xs">
                  {numOfReviewers} تقييم
                </span>
              </div>
            </div>

            {/* شريط التقييم */}
            <div className="flex flex-col justify-center w-[65%]">
              {[5, 4, 3, 2, 1].map((ratingNum) => {
                const keys: (keyof Product)[] = [
                  "oneStarCount",
                  "twoStarCount",
                  "threeStarCount",
                  "fourStarCount",
                  "fiveStarCount",
                ];
                const count = product[keys[ratingNum - 1]] || 0;

                const percentage =
                  numOfReviewers > 0 && +count > 0
                    ? (+count / numOfReviewers) * 100
                    : 0;

                return (
                  <div key={ratingNum} className="flex items-center mb-1">
                    <span className="w-6 text-center text-xs">{ratingNum}</span>
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
            setReviewsList((prevReviews) => {
              const hasMyReview = prevReviews.some((review) => review.isMe);
              if (hasMyReview) {
                return prevReviews.map((review) =>
                  review.isMe
                    ? {
                        ...review,
                        numOfRate: newReview?.numOfRate,
                        reviewText: newReview.reviewText,
                        reviewDate: newReview?.reviewDate,
                      }
                    : review
                );
              } else {
                return [
                  ...prevReviews,
                  {
                    ...newReview,
                    id: Date.now() + "", 
                    isMe: true,
                  },
                ];
              }
            });
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

        <AlertRemoveReview
          open={delDialog.isOpen}
          onClose={(st) => setDelDialog((prev) => ({ ...prev, isOpen: st }))}
          onDeletingEnd={(id) => {
            setReviewsList([...reviewsList.filter((ele) => +ele.id != id)]);
            storeInBgcache({
              Id: productId,
              reqType: 2,
              reqValue: 0,
            });
          }}
          reviewId={delDialog.reviewId}
        />
        <EditCommentDialog
          initialText={edtDialog.data.comment}
          rating={edtDialog.data.rating}
          productId={+edtDialog.data.productId}
          onEditEnd={(_, newComment, newRate) => {
            setReviewsList(
              reviewsList.map((r) =>
                r.isMe
                  ? {
                      ...r,
                      reviewText: newComment || r.reviewText,
                      numOfRate: newRate || r.numOfRate,
                    }
                  : r
              )
            );
            storeInBgcache({
              Id: productId,
              reqType: 2,
              reqValue: newRate,
              reviewText: newComment,
              prevReviewText: edtDialog.data.comment,
              prevValue: edtDialog.data.rating,
            });
          }}
          open={edtDialog.isOpen}
          onClose={(st) => setEdtDialog((prev) => ({ ...prev, isOpen: st }))}
        />
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
                key={index + review.id}
                reviewer={review.customerName}
                date={new Date(review.reviewDate).toLocaleDateString()}
                rating={review.numOfRate}
                comment={review.reviewText}
                isMe={review.isMe}
                onEditing={() => {
                  setEdtDialog({
                    isOpen: true,
                    data: {
                      comment: review.reviewText,
                      productId,
                      rating: review.numOfRate,
                    },
                  });
                }}
                onDeleting={() => {
                  setDelDialog({ isOpen: true, reviewId: +review.id });
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
