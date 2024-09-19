import BreadCrumb from "@/components/BreadCrumb";
import PasswordValidation from "./components/PasswordValidation";

const resetPass = () => {
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
        <h1 className="m-auto text-[28px] text-center font-bold mt-2">
          إعادة تعيين كلمة المرور
        </h1>
        <PasswordValidation />
      </div>
    </>
  );
};

export default resetPass;
