import BreadCrumb from "@/components/BreadCrumb";
import MobileValidation from "./components/MobileValidation";

const verifiCode = () => {
  return (
    <>
      <BreadCrumb
        SecondName="حساب المستخدم"
        SecondDir=""
        ThirdName="تسجيل الدخول"
        ThirdDir=""
        ForthName="نسيت كلمة المرور"
        ForthDir=""
        FifthName="إعادة تعيين كلمة المرور"
        FifthDir=""
      />
      <div className="m-auto my-24 min-w-[100px] max-w-[424px] min-h-[50px] p-[32px] rounded-[4px] border-solid border-[1px] border-[#E4E7E9] shadow-lg drop-shadow-sm shadow-[#0000001F]">
        <div className="m-auto">
          <h1 className="text-[28px] text-center font-bold mt-2">
            تأكيد رقم الجوال
          </h1>
        </div>
        <div className="m-auto mt-[30px]">
          <MobileValidation />
        </div>
      </div>
    </>
  );
};

export default verifiCode;
