import React from "react";
import { ReviewProps } from '../types';
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";

const ReviewComment: React.FC<ReviewProps> = ({ reviewer, date, rating, comment, customerImage }) => {
  
  // Function to generate star icons based on the rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AiFillStar
          key={i}
          className={i <= rating ? "text-yellow-500" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {customerImage ? (
            <Image
              src={customerImage}
              alt={`${reviewer}'s avatar`}
              className="w-10 h-10 rounded-full mr-2"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ml-2">
              <span className="text-gray-500">👤</span>
            </div>
          )}
          <div>
            <h4 className="font-semibold">{reviewer}</h4>
            <div className="flex items-center">
              {renderStars()} 
              <span className="ml-1 text-sm text-yellow-500">{rating}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-sm">{date}</p>
      </div>

      <p className="text-gray-700 mt-2 mr-[52px]">{comment}</p>
    </div>
  );
};

export default ReviewComment;
