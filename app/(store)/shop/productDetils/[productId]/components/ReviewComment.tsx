
import React from "react";
import Image from "next/image";
import ReviewerProfile from '../../../../../../public/images/review.svg';
import  { ReviewProps } from '../types';

const ReviewComment: React.FC<ReviewProps> = ({ reviewer, date, rating, comment }) => {
    return (
    <div className="border-b border-gray-300 pb-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <Image
            src={ReviewerProfile}
            alt="user avatar"
            width={50}
            height={50}
            className="w-10 h-10 rounded-full ml-3"
          />
          <div>
            <h4 className="font-semibold text-sm">{reviewer}</h4>
            <span className="text-yellow-500 text-sm">{rating}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <p className="text-sm text-gray-700">{comment}</p>
    </div>
  );
};

export default ReviewComment;