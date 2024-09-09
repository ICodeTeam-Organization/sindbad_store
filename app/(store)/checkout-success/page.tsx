const page = () => {
  const code: number = 564846874;
  const requestNumber: number = 565456;
  return (
    <div className="container  mx-auto mb-14 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 pt-8 h-60">
      <div className="mb-10 ">
        <p className="lg:text-2xl text-lg font-semibold lg:font-bold mb-3">
          تم تسجيل طلبكم بالرقم ({requestNumber}) بكود استلام ({code})
        </p>
        <p className="lg:text-2xl text-lg font-semibold lg:font-bold ">
          تابع طلبك عبر الموقع او التطبيق وستصلك رسالة نصية بحالة الطلب يسعدنا
          خدمتكم
        </p>
      </div>
      <span className="mb-2 text-sm lg:text-lg font-semibold  block">
        في حال وجود اي ملاحظات سيتواصل معكم خدمة العملاء
      </span>
      <span className="text-sm lg:text-lg font-semibold   block">
        في حال وجود اي ملاحظات ليديكم نرجو التواصل مع خدمة العملاء على رقم
        الواتس ( 777777777)
      </span>
    </div>
  );
};

export default page;
