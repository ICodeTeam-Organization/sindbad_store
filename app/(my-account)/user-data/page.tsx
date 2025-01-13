import React from "react";
import HeadTitle from "./components/HeadTitle";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import Button from "./components/Button";
const UserForm = () => {
  return (
    <div>
      <div className="bg-[#FFF9F2] h-[44rem]">
        <div className="p-8 w-full max-w-4xl">
          <h1 className="text-2xl font-semibold text-right text-gray-800 mb-6">
            بيانات المستخدم
          </h1>
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-white shadow-lg rounded-lg p-8">
            <HeadTitle
              title="معلومات الشخصية"
              description="كل معلوماتك الشخصية لا يطلع عليها احد غيرك"
            />
            <InputField
              label="اسم المستخدم"
              input_type="text"
              input_placeholder="سالم علي سالم بافضل"
            />
            <InputField
              label="البريد الاإلكتروني"
              input_type="email"
              input_placeholder=""
            />
            <InputField
              label="رقم الجوال"
              input_type="text"
              input_placeholder="967739660487"
            />
            <InputField
              label="رقم الهاتف (الثابت)"
              input_type="text"
              input_placeholder=""
            />
          </div>
          {/* Location Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-white shadow-lg rounded-lg p-8">
            <HeadTitle
              title="مكان الإقامة"
              description="أخبرنا اين يقع مكان عملك التجاري؟"
            />
            <SelectField
              label="الدولة"
              options={["اختر الدولة", "اليمن", "السعودية"]}
            />
            <SelectField
              label="المدينة"
              options={[
                "اختر المدينة",
                "جدة",
                "الرياض",
                "الدمام",
                "مكة",
                "المدينة المنورة",
              ]}
            />
          </div>
          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Button
              text="تجاهل"
              type="button"
              className="text-gray-600 bg-gray-100 border border-gray-300 hover:bg-gray-200"
            />
            <Button
              text="حفظ التعديلات"
              type="submit"
              className="text-white bg-orange-500 hover:bg-orange-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
