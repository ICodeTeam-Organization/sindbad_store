import React from "react";
import Image from "next/image";
import ReviewerProfile from '../../../../../../public/images/review.svg'
const ProductReviewsTap = () => {
  return (
    <div className="grid grid-cols-3 gap-6" dir="rtl">
      {/* Right section - Review summary & add a review */}
      <div className="bg-gray-50 border border-gray-300 rounded-md p-4">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold">4.5 من 5</div>
          <p className="text-gray-500">60 تقييم على المنتج</p>
        </div>

        {/* Add a Review Form */}
        <form className="space-y-4 text-start">
          <div className="text-gray-600">أضف تعليقك</div>
          <textarea
            className="w-full border border-gray-300 p-2 rounded-md text-sm"
            rows={4}
            placeholder="يرجى إضافة تعليقك .."
          ></textarea>
          <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600">
            نشر تعليقك
          </button>
        </form>
      </div>
      {/* Left section - User reviews */}
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

        {/* Reviews list */}
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="border-b border-gray-300 pb-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Image
                  src={ReviewerProfile}
                  alt="user avatar"
                  width={50}
                  height={50}
                  className="w-10 h-10 rounded-full ml-3" // "ml-3" instead of "mr-3" for RTL
                />
                <div>
                  <h4 className="font-semibold text-sm">محمد خالد</h4>
                  {/* The way star ratings are displayed is only for static data and will change. */}
                  <span className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</span>

                </div>
              </div>
              <div className="flex items-center">
              <p className="text-xs text-gray-500">13/10/2020</p>

              </div>
            </div>
            <p className="text-sm text-gray-700">
              استخدمنا سلة قبل أربع سنوات ثم غادرناها قبل أن يكون فيها خيارات
              ترقية مدفوعة. خسرنا مبالغ كبيرة جداً في عمل متجر وتوزيع جداً في
              التعامل مع المبرمجين. ثم عدنا لمنصة سلة ووجدنا تطورا هائلاً
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewsTap;
