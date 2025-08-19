import Link from "next/link";
import PhoneValidation from "./components/phone-validation";
const forgetPass = () => {
  return (
    <>
      {/* <BreadCrumb
        SecondName="حساب المستخدم"
        SecondDir=""
        ThirdName="تسجيل الدخول"
        ThirdDir="/auth"
        ForthName="نسيت كلمة المرور"
        ForthDir=""
      /> */}
      <div className="m-auto mdHalf:my-24 my-10 min-w-[100px] max-w-[424px] min-h-[50px] p-[32px] rounded-[4px] border-solid border-[1px] border-[#E4E7E9] shadow-lg drop-shadow-sm shadow-[#0000001F]">
        <div className="m-auto">
          <h1 className="text-base  font-bold mt-2">
            نسيت كلمة المرور
          </h1>
          <p className="text-sm  text-[#5F6C72] mt-2">
            أدخل رقم الهاتف المحمول المرتبط بحسابك
          </p>
        </div>
        <div className="m-auto mt-[30px]">
          <PhoneValidation />
        </div>
         
        <hr />
        <p className="text-center text-sm text-[#475156] mt-6">
          يمكنك الإتصال
          <Link className="text-[#F58634] mx-1" href={""} target="_blank">
            بخدمة العملاء
          </Link>
          للحصول على المساعدة في استعادة الوصول إلى حسابك
        </p>
      </div>
    </>
  );
};

export default forgetPass;
