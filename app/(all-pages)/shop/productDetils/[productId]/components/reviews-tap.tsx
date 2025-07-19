"use client";
import React, { useEffect, useState } from "react";
import ReviewForm from "./review-form";
import ReviewComment from "./review-comment";
import { ReviewProps } from "../types";
import { getApi } from "@/lib/http";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { useInfiniteQuery } from "@tanstack/react-query";
import CommentSkeleton from "./CommentSkeleton";
import AlertRemoveReview from "./AlertRemoveReview";
import EditCommentDialog from "./EditCommentDialog";
import { NormalizedProductType } from "@/Data/normalizTypes";
import {
  getbackgroundData,
  savebackgroundDataInCache,
} from "@/Data/cachingAndBgData/backgroundData";
import CircularProgress from "./CircleSlider";
// import { useSession } from "next-auth/react";
type ProductReviewsTapProps = {
  productId: string | number;
  product: NormalizedProductType;
};

const ProductReviewsTap: React.FC<ProductReviewsTapProps> = ({
  productId,
  product,
}) => {
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
      const cachedReviews = await getbackgroundData(2);
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
    <div>
      <div className="bg-white border border-gray-300 rounded-md p-3 pb-4 mb-4">
        <h3 className="mx-4 text-center text-base font-semibold mb-2">
          التقييم والمراجعات
        </h3>
        <div className="flex max-smHalf:flex-col">
          <div className="flex max-2lg:flex-col  w-[30%] max-smHalf:w-full py-0 justify-center items-center mb-3 gap-x-4">
            <CircularProgress max={5} value={product.rate} color="#ffb700" strokeWidth={4}>
              <span className="text-3xl font-bold  ">
                {product.rate.toFixed(1)}
              </span>
            </CircularProgress>

            <div>
              <Rating
                style={{ maxWidth: 100 }}
                halfFillMode="svg"
                itemStyles={{
                  itemShapes: RoundedStar,
                  activeFillColor: "#ffb700",
                  inactiveFillColor: "#eee",
                }}
                readOnly
                value={product.rate}
              />
              <div className="flex items-center justify-center mt-2">
                <span className="text-secondary text-base font-bold">
                  {product.numOfReviewers} تقييم
                </span>
              </div>
            </div>
          </div>

          {/* شريط التقييم */}
          <div className="flex flex-col justify-center w-[70%] max-smHalf:w-full ml-4">
            {[5, 4, 3, 2, 1].map((ratingNum) => {
              const keys: Array<
                | "oneStarCount"
                | "twoStarCount"
                | "threeStarCount"
                | "fourStarCount"
                | "fiveStarCount"
              > = [
                "oneStarCount",
                "twoStarCount",
                "threeStarCount",
                "fourStarCount",
                "fiveStarCount",
              ];
              const count = product[keys[ratingNum - 1]] || 0;

              const percentage =
                product.numOfReviewers &&
                product.numOfReviewers > 0 &&
                +count > 0
                  ? (+count / product.numOfReviewers) * 100
                  : 0;

              return (
                <div key={ratingNum}>
                  <div className="flex items-center gap-x-4 mb-1">
                    <span className="w-6 text-center text-base font-bold">
                      {ratingNum.toFixed(1)}
                    </span>
                    <div className="relative w-full h-[10px] bg-gray-200 overflow-hidden rounded-full flex">
                      <div
                        className="absolute h-[10px] bg-secondary rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-base font-bold">{count}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mdHalf:grid grid-cols-3 gap-6" dir="rtl">
        <div className="  border border-gray-300 rounded-md p-3 mb-4">
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
          {/* <div className="flex justify-between items-center mb-4 border border-gray-300 rounded-lg p-4">
            <h3 className="font-semibold text-lg">تعليقات المستخدمين</h3>
            <div className="flex items-center space-x-reverse space-x-2">
              <span>ترتيب حسب :</span>
              <select className="border border-gray-300 px-2 py-1 rounded-md">
                <option>الأحدث</option>
                <option>الأعلى تقييماً</option>
              </select>
            </div>
          </div> */}

          <AlertRemoveReview
            open={delDialog.isOpen}
            onClose={(st) => setDelDialog((prev) => ({ ...prev, isOpen: st }))}
            onDeletingEnd={(id) => {
              setReviewsList([...reviewsList.filter((ele) => +ele.id != id)]);
              savebackgroundDataInCache({
                Id: +productId,
                reqType: 2,
                reqValue: 0,
                reviewText: "",
              });
            }}
            reviewId={delDialog.reviewId}
          />
          <EditCommentDialog
            initialText={edtDialog.data.comment}
            rating={edtDialog.data.rating}
            productId={+edtDialog.data.productId}
            onEditEnd={async (_, newComment, newRate) => {
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
              await savebackgroundDataInCache({
                Id: +productId,
                reqType: 2,
                reqValue: newRate,
                reviewText: newComment,
              });
            }}
            open={edtDialog.isOpen}
            onClose={(st) => setEdtDialog((prev) => ({ ...prev, isOpen: st }))}
          />
          {error ? (
            <div>{error?.message || "حدث خطاء أثناء جلب التعليقات"}</div>
          ) : isPending ? (
            <div className="flex flex-col justify-center items-center">
              {[...Array(5)].map((_, index) => (
                <CommentSkeleton key={index} />
              ))}
            </div>
          ) : reviewsList.filter((e) => e.numOfRate > 0).length == 0 ? (
            <div className="text-center text-gray-500 mt-10">
              لا توجد تعليقات
            </div>
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
    </div>
  );
};

export default ProductReviewsTap;
