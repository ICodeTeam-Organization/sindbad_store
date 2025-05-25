import React, { useState } from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { cn, storeInBgcache } from "@/lib/utils";
import EditCommentDialog from "./EditCommentDialog";
import { AiFillStar } from "react-icons/ai";
import AlertRemoveReview from "@/app/(store)/shop/productDetils/[productId]/components/AlertRemoveReview";

export interface ReviewCommentProps {
  reviewer: string;
  date: string;
  rating: number;
  comment: string;
  customerImage?: string;
  productId: number;
  isMe?: boolean;
  reviewId?: string;
  onEditingEnd?: (updated: {
    rating: number;
    comment: string | null;
    productId: number;
  }) => void;
    onDeletingEnd: (
    productId: number
  ) => void;
}


const ReviewComment: React.FC<ReviewCommentProps> = ({
  reviewer,
  date,
  rating,
  comment,
  customerImage,
  productId,
  isMe = false,
  reviewId,
  onEditingEnd = () => {},
  onDeletingEnd = () => {},
  
}) => {
  const [commentText, setcommentText] = useState(comment || "");
  const [ratingValue, setRatingValue] = useState(rating || 0);
  const [showAll, setshowAll] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDelDialog, setshowDelDialog] = useState(false)


  return (
    <>
      <AlertRemoveReview open={showDelDialog} onClose={setshowDelDialog}  onDeletingEnd={()=>{
              storeInBgcache({
                Id: productId,
                reqType: 2,
                reqValue: 0,
              });
        onDeletingEnd(productId)
        }} reviewId={reviewId} />
      <EditCommentDialog
        initialText={comment}
        rating={rating}
        productId={productId}
        onEditEnd={(_, newComment, newRate) => {
          setcommentText(newComment || "");
          setRatingValue(newRate);
          onEditingEnd({
            rating: newRate,
            comment: newComment,
            productId,
          });
        }}
        open={isOpen}
        onClose={setIsOpen}
      />

      <div className="border border-gray-300 rounded-md p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            {customerImage ? (
              <Image
                src={customerImage}
                alt={`${reviewer}'s avatar`}
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ml-2">
                <span className="text-gray-500">👤</span>
              </div>
            )}
            <div>
              <h4 className="font-semibold">{reviewer}</h4>
              <div className="flex items-center">
                <span className="ml-1 text-sm text-yellow-500 flex items-center m-1">
                  {[...Array(Math.round(ratingValue))].map((_, index) => (
                    <AiFillStar key={index} className="text-[#FFC62A] text-[10px]" />
                  ))}
                  {[...Array(Math.round(5 - ratingValue))].map((_, index) => (
                    <AiFillStar key={index} className="text-[#dfdfdf] text-[10px]" />
                  ))}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>

        <p
          className={cn(
            "text-gray-700 mt-2 mr-[52px] cursor-pointer",
            showAll ? "line-clamp-none" : "line-clamp-3"
          )}
          onClick={() => setshowAll((p) => !p)}
        >
          {commentText}
        </p>

        {isMe && (
          <div className="flex justify-end mt-2">
            <button className="text-blue-500 hover:underline" onClick={() => setshowDelDialog(true)}>
              <MdDelete className="text-xl text-red-500" />
            </button>
            <span className="mx-2">|</span>
            <button
              className="text-red-500 hover:underline"
              onClick={() => setIsOpen(true)}
            >
              <BiEdit className="text-xl text-blue-950" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewComment;
