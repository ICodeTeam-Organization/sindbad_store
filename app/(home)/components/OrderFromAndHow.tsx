import DropdownMenu from "@/components/DropDownMenu";
import DropDownMenuOrderFrom from "@/components/DropDownMenuOrderFrom";
import HowDialog from "@/components/HowDialog";
import { getApi } from "@/lib/http";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";

// const questions = [
//     {
//         "id": 1,
//         "title": "كيف اشتري من الموقع؟",
//         "images": [
//             {
//                 "url": "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
//                 "description": "متسوق يتصفح مجموعة من العناصر المتنوعة في السوق، يبحث عن المنتجات المناسبة التي يحتاجها."
//             },
//             {
//                 "url": "https://images.unsplash.com/photo-1514996937319-344454492b37",
//                 "description": "عربة تسوق مليئة بالمستلزمات المنزلية والمواد الغذائية التي تم اختيارها من السوق عبر الإنترنت."
//             }
//         ],
//         "description": "تعرف على خطوات اختيار المنتجات وإضافتها إلى عربة التسوق ثم متابعة إجراءات الدفع بسهولة لإتمام الشراء."
//     },
//     {
//         "id": 2,
//         "title": "كيف اطلب من سوق الكتروني آخر؟",
//         "images": [
//             {
//                 "url": "https://images.unsplash.com/photo-1600877750936-0f5b9c450865",
//                 "description": "ساعة تشير إلى أوقات التسليم المحددة والتي يمكنك اختيارها عند إجراء طلبك عبر الإنترنت."
//             }
//         ],
//         "description": "اكتشف كيفية البحث عن الأسواق الإلكترونية المختلفة والاختيار من بينها لتقديم طلب يناسب احتياجاتك."
//     },
//     {
//         "id": 3,
//         "title": "كيف اطلب طلب خاص من السعودية؟",
//         "images": [
//             {
//                 "url": "https://images.unsplash.com/photo-1518183214770-9cffbec72538",
//                 "description": "محفظة تحتوي على نقود ورقية وبطاقات ائتمان، مما يعكس تنوع خيارات الدفع المتاحة للمشتريات."
//             }
//         ],
//         "description": "تعرف على طريقة طلب منتجات خاصة من السوق السعودي مع مراعاة الإجراءات اللازمة لتلبية متطلباتك."
//     },
//     {
//         "id": 4,
//         "title": "كيف ادفع قيمة مشتريات؟",
//         "images": [
//             {
//                 "url": "https://images.unsplash.com/photo-1516557070064-5a3e3ab0f9a0",
//                 "description": "خريطة توضح موقع الشحنة وتتبع مسارها منذ مغادرتها من المتجر وحتى وصولها إلى باب منزلك."
//             }
//         ],
//         "description": "استعرض طرق الدفع المتاحة مثل البطاقات الائتمانية أو الدفع عند الاستلام لضمان تجربة شراء مريحة."
//     },
//     {
//         "id": 5,
//         "title": "كيف اسجل معلوماتي وعناوين الشحن؟",
//         "images": [
//             {
//                 "url": "https://images.unsplash.com/photo-1591987012615-c3481d67edbc",
//                 "description": "قائمة تحتوي على عناصر غير محددة، مما يشير إلى وجود منتجات مفقودة من الطلب."
//             }
//         ],
//         "description": "تعلم كيفية إدخال بياناتك الشخصية وعناوين الشحن بدقة لضمان وصول الطلبات بسهولة وسرعة."
//     },
//     {
//         "id": 6,
//         "title": "كم مدة وصول الطلب؟",
//         "images": [
//             {
//                 "url": "https://images.unsplash.com/photo-1580910051070-d2eab0c5084b",
//                 "description": "زر إلغاء يظهر في تطبيق الهاتف المحمول، مما يتيح لك إلغاء الطلب قبل أن يتم شحنه."
//             }
//         ],
//         "description": "احصل على معلومات دقيقة حول المدة الزمنية لوصول الطلبات بناءً على موقعك وتفاصيل الشحن."
//     },
//     {
//         "id": 7,
//         "title": "كيف اراقب مسار شحناتي؟",
//         "images": [
//             {
//                 "url": "https://images.unsplash.com/photo-1594633314748-916d51a4e2a0",
//                 "description": "بانر يظهر خصومات مميزة على المنتجات والعروض الخاصة التي يمكن للمستخدمين الاستفادة منها."
//             }
//         ],
//         "description": "تعلم كيفية تتبع شحناتك باستخدام خاصية التتبع المتوفرة لتعرف موقع طلبك في أي لحظة."
//     },
//     {
//         "id": 8,
//         "title": "كيف اعلم بوصول طلبي؟",
//         "images": [
//             {
//                 "url": "https://images.unsplash.com/photo-1578926371549-35d0617d4ab6",
//                 "description": "عربة ضخمة مليئة بالمنتجات تشير إلى حجم الطلبات الكبيرة أو الجملة."
//             }
//         ],
//         "description": "اكتشف الطرق التي يمكنك من خلالها تلقي إشعارات بوصول الطلب سواء عبر التطبيق أو البريد الإلكتروني."
//     },
//     {
//         "id": 9,
//         "title": "كيف اتواصل مع ادارة الموقع؟",
//         "images": [
//             {
//                 "url": "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
//                 "description": "تقويم يحتوي على أوقات محددة للتسليم، مما يساعدك في اختيار الوقت الأنسب لك."
//             }
//         ],
//         "description": "تعرف على وسائل الاتصال المختلفة مثل الهاتف أو البريد الإلكتروني للحصول على الدعم من إدارة الموقع."
//     }
// ]

const Loader = () => (
  <div className="flex items-center justify-center my-4 ">
    <div className="w-7 h-7 border-4 border-primary-background border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function OrderFromAndHow() {
  const [showHowDialog, setshowHowDialog] = useState<number | null>(null);

  const { data: questions, isFetching } = useQuery<{
    data: { items: { id: number; question: string }[] };
  }>({
    queryKey: ["how-FAQs"],
    queryFn: () => getApi("FAQs/QuestionsWithIds?pageNumber=1&pageSize=10"),
  });

  console.log(questions,"dddddddddddd");
  

  return (
    <>
      <div className="flex mdHalf:flex-row flex-col-reverse xl:gap-6 gap-4 mdHalf:items-center  mdHalf:p-0">
        <div className="mdHalf:flex flex-row items-center mdHalf:justify-center mdHalf:p-0 px-6 ">
          <DropDownMenuOrderFrom />
        </div>
        <div className="w-[1.5px] rounded-full h-4 bg-[#AAA7A7] hidden mdHalf:block" />
        <div className="mdHalf:block hidden">
          <div className="  group cursor-pointer relative mdHalf:p-0  mdHalf:m-0  mdHalf:hover:bg-transparent hover:bg-[#FF8F7E22] py-3 ">
            <div className="flex gap-2 items-center mdHalf:justify-center justify-between mdHalf:p-0 px-6 ">
              <p className="text-[13px] mdHalf:m-0 "> طلباتي </p>
            </div>
          </div>
        </div>
        <div className="w-[1.5px] rounded-full h-4 bg-[#AAA7A7] hidden mdHalf:block" />
        <div className="  group cursor-pointer relative mdHalf:p-0  mdHalf:m-0 mt-2 mdHalf:hover:bg-transparent hover:bg-[#FF8F7E22] pt-3 ">
          <div className="flex gap-2 items-center mdHalf:justify-center justify-between mdHalf:p-0 px-6 ">
            <p className="text-[13px] mdHalf:m-0 "> كيف ؟ </p>
            <IoChevronDownOutline className="group-hover:rotate-180 transition-transform text-[14px]" />
          </div>

          {/* web */}
          <div className="hidden mdHalf:block ">
            <ul
              role="menu"
              className={cn(
                "mdHalf:absolute mdHalf:opacity-0 mdHalf:invisible  group-hover:visible group-hover:opacity-100 transition-all top-12 z-[999999] mdHalf:min-w-[180px] mdHalf:w-auto w-full overflow-auto rounded-lg mdHalf:border border-slate-200 bg-white p-1.5 mdHalf:shadow-lg focus:outline-none ",
                "right-0"
              )}
            >
              {isFetching ? (
                <Loader />
              ) : (
                questions?.data?.items?.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <li
                      role="menuitem"
                      className="cursor-pointer text-slate-800 flex w-full gap-x-2 text-sm items-center rounded-md p-3 transition-all hover:bg-[#FF8F7E22]"
                      onClick={() => setshowHowDialog(item.id)}
                    >
                      <FaQuestionCircle />
                      <p className="text-slate-800  ml-2 whitespace-nowrap  text-[12px]">
                        {item.question}
                      </p>
                    </li>
                  </React.Fragment>
                ))
              )}
            </ul>
          </div>
          {/* mobile */}
          <div className="mdHalf:hidden block">
            <ul
              role="menu"
              className={cn(
                " mt-2 opacity-0 invisible  group-hover:visible group-hover:opacity-100 hidden group-hover:block transition-all top-12 z-[999999] min-w-[180px] overflow-y-scroll overflow-x-hidden  bg-white focus:outline-none border-b p-2"
              )}
            >
              {isFetching ? (
                <Loader />
              ) : (
                questions?.data?.items?.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <li
                      className="cursor-pointer text-slate-800 flex w-full gap-x-2 text-sm items-center rounded-md p-2 transition-all hover:bg-[#FF8F7E22]  mr-4 "
                      onClick={() => setshowHowDialog(item.id)}
                    >
                      <FaQuestionCircle />
                      <p className="text-slate-800 font-medium ml-2 whitespace-nowrap text-[11px] ">
                        {item.question}
                      </p>
                    </li>
                  </React.Fragment>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
      <HowDialog
        open={showHowDialog}
        id={showHowDialog || 0}
        onOpenChange={(e) => {
          setshowHowDialog(null);
        }}
      />
    </>
  );
}

export default OrderFromAndHow;
