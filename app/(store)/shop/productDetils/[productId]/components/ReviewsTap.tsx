import React from "react";
import ReviewForm from './ReviewForm';
import ReviewComment from './ReviewComment';
import  { ReviewProps } from '../types';

const ProductReviewsTap: React.FC = () => {
  const reviews: ReviewProps[] = [
    {
      reviewer: "محمد خالد",
      date: "13/10/2020",
      rating: "⭐⭐⭐⭐⭐",
      comment:
        "استخدمنا سلة قبل أربع سنوات ثم غادرناها قبل أن يكون فيها خيارات ترقية مدفوعة. خسرنا مبالغ كبيرة جداً في عمل متجر وتوزيع جداً في التعامل مع المبرمجين. ثم عدنا لمنصة سلة ووجدنا تطورا هائلاً",
    },
    {
      reviewer: "علي أحمد",
      date: "05/11/2021",
      rating: "⭐⭐⭐⭐",
      comment:
        "تجربة جيدة مع منصة سلة، خدمة العملاء رائعة لكن هناك بعض المميزات التي لا تزال بحاجة إلى تحسين.",
    },
    {
      reviewer: "سارة محمد",
      date: "22/07/2022",
      rating: "⭐⭐⭐⭐⭐",
      comment:
        "منصة ممتازة، سهلة الاستخدام وتوفر الكثير من المميزات التي ساعدتني على تطوير متجري.",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6" dir="rtl">
      <div className="bg-gray-50 border border-gray-300 rounded-md p-4">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold">4.5 من 5</div>
          <p className="text-gray-500">60 تقييم على المنتج</p>
        </div>
        <ReviewForm />
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
            reviewer={review.reviewer}
            date={review.date}
            rating={review.rating}
            comment={review.comment}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductReviewsTap;
