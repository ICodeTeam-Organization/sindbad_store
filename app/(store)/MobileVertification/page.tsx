import BreadCrumb from "@/components/BreadCrumb";
import MobileCodeValidation from "./components/MobileCodeValidation";

const MobileVert = () => {
  return (
    <>
      <BreadCrumb
        SecondName="حساب جديد"
        SecondDir=""
        ThirdName="التحقق من البريد الإلكتروني"
        ThirdDir=""
      />
      <div className="m-auto my-24 min-w-[100px] max-w-[424px] min-h-[50px] p-[32px] rounded-[4px] border-solid border-[1px] border-[#E4E7E9] shadow-lg drop-shadow-sm shadow-[#0000001F]">
        <div className="m-auto">
          <h1 className="text-[28px] text-center font-bold mt-2">
            التحقق من بريدك الإلكتروني
          </h1>
        </div>
        <div className="m-auto mt-[30px]">
          <MobileCodeValidation />
        </div>
      </div>
    </>
  );
};

export default MobileVert;
