import Link from "next/link";
import PhoneValidation from "./components/PhoneValidation";
import BreadCrumb from "@/components/BreadCrumb";
const forgetPass = () => {
  return (
    <>
      <BreadCrumb
        SecondName="حساب المستخدم"
        SecondDir=""
        ThirdName="تسجيل الدخول"
        ThirdDir="/auth"
        ForthName="نسيت كلمة المرور"
        ForthDir=""
      />
      <div className="m-auto my-24 min-w-[100px] max-w-[424px] min-h-[50px] p-[32px] rounded-[4px] border-solid border-[1px] border-[#E4E7E9] shadow-lg drop-shadow-sm shadow-[#0000001F]">
        <div className="m-auto">
          <h1 className="text-[28px] text-center font-bold mt-2">
            نسيت كلمة المرور
          </h1>
          <p className="text-[20px] text-center text-[#5F6C72] mt-2">
            أدخل رقم الهاتف المحمول المرتبط بحسابك
          </p>
        </div>
        <div className="m-auto mt-[30px]">
          <PhoneValidation />
        </div>
        <div className="text-start my-5 text-[15px] text-[#5F6C72]">
          <p>
            لديك حساب بالفعل؟
            <Link className="mr-1 text-[#2DA5F3]" href={"/auth"}>
              تسجيل الدخول
            </Link>
          </p>
          <p>
            ليس لديك حساب؟
            <Link className="mr-2 text-[#2DA5F3]" href={"/auth"}>
              حساب جديد
            </Link>
          </p>
        </div>
        <hr />
        <p className="text-start text-[#475156] mt-6">
          يمكنك الإتصال
          <Link className="text-[#F58634] mx-1" href={""}>
            بخدمة العملاء
          </Link>
          للحصول على المساعدة في استعادة الوصول إلى حسابك
        </p>
      </div>
    </>
  );
};

export default forgetPass;
