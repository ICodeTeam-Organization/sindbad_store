import { Card } from "@/components/ui/card";
import { BsCheck2Circle } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";

const page = ({}) => {
  const code: number = 564846874;
  const requestNumber: number = 565456;
  return (
    <div className="my-10 text-center" >
      <Card className="container mx-auto mb-40 shadow-none py-20  border-none  px-1 h-fit w-fit ">
      <div className="flex items-center justify-center mb-4 text-primary-background" >
      <BsCheck2Circle size={100} />
      </div>
      <div className="mb-10  ">
        <p className="lg:text-lg text-base font-bold mb-3">
         <span> تم تسجيل طلبكم بالرقم ({requestNumber})</span> 
         {/* <span> بكود استلام ({code}) </span> */}
        </p>
        <p className="lg:text-lg text-base font-semibold lg:font-bold ">
          تابع طلبك عبر الموقع او التطبيق وستصلك رسالة نصية بحالة الطلب يسعدنا
          خدمتكم
        </p>
      </div>
      <span className="mb-2 text-sm lg:text-base   block">
        في حال وجود اي ملاحظات ستتواصل معكم خدمة العملاء
      </span>
      <span className="text-sm lg:text-base    block">
        في حال وجود اي ملاحظات ليديكم نرجو التواصل مع خدمة العملاء على رقم
        الواتس (777777777)
      </span>
    </Card>
    </div>
  );
};

export default page;
