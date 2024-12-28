import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const questions = [
  {
    id: 1,
    title: "كيف اشتري من الموقع؟",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
        description:
          "متسوق يتصفح مجموعة من العناصر المتنوعة في السوق، يبحث عن المنتجات المناسبة التي يحتاجها.",
      },
      {
        url: "https://images.unsplash.com/photo-1514996937319-344454492b37",
        description:
          "عربة تسوق مليئة بالمستلزمات المنزلية والمواد الغذائية التي تم اختيارها من السوق عبر الإنترنت.",
      },
    ],
    description:
      "تعرف على خطوات اختيار المنتجات وإضافتها إلى عربة التسوق ثم متابعة إجراءات الدفع بسهولة لإتمام الشراء.",
  },
  {
    id: 2,
    title: "كيف اطلب من سوق الكتروني آخر؟",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600877750936-0f5b9c450865",
        description:
          "ساعة تشير إلى أوقات التسليم المحددة والتي يمكنك اختيارها عند إجراء طلبك عبر الإنترنت.",
      },
    ],
    description:
      "اكتشف كيفية البحث عن الأسواق الإلكترونية المختلفة والاختيار من بينها لتقديم طلب يناسب احتياجاتك.",
  },
  {
    id: 3,
    title: "كيف اطلب طلب خاص من السعودية؟",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518183214770-9cffbec72538",
        description:
          "محفظة تحتوي على نقود ورقية وبطاقات ائتمان، مما يعكس تنوع خيارات الدفع المتاحة للمشتريات.",
      },
    ],
    description:
      "تعرف على طريقة طلب منتجات خاصة من السوق السعودي مع مراعاة الإجراءات اللازمة لتلبية متطلباتك.",
  },
  {
    id: 4,
    title: "كيف ادفع قيمة مشتريات؟",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516557070064-5a3e3ab0f9a0",
        description:
          "خريطة توضح موقع الشحنة وتتبع مسارها منذ مغادرتها من المتجر وحتى وصولها إلى باب منزلك.",
      },
    ],
    description:
      "استعرض طرق الدفع المتاحة مثل البطاقات الائتمانية أو الدفع عند الاستلام لضمان تجربة شراء مريحة.",
  },
  {
    id: 5,
    title: "كيف اسجل معلوماتي وعناوين الشحن؟",
    images: [
      {
        url: "https://images.unsplash.com/photo-1591987012615-c3481d67edbc",
        description:
          "قائمة تحتوي على عناصر غير محددة، مما يشير إلى وجود منتجات مفقودة من الطلب.",
      },
    ],
    description:
      "تعلم كيفية إدخال بياناتك الشخصية وعناوين الشحن بدقة لضمان وصول الطلبات بسهولة وسرعة.",
  },
  {
    id: 6,
    title: "كم مدة وصول الطلب؟",
    images: [
      {
        url: "https://images.unsplash.com/photo-1580910051070-d2eab0c5084b",
        description:
          "زر إلغاء يظهر في تطبيق الهاتف المحمول، مما يتيح لك إلغاء الطلب قبل أن يتم شحنه.",
      },
    ],
    description:
      "احصل على معلومات دقيقة حول المدة الزمنية لوصول الطلبات بناءً على موقعك وتفاصيل الشحن.",
  },
  {
    id: 7,
    title: "كيف اراقب مسار شحناتي؟",
    images: [
      {
        url: "https://images.unsplash.com/photo-1594633314748-916d51a4e2a0",
        description:
          "بانر يظهر خصومات مميزة على المنتجات والعروض الخاصة التي يمكن للمستخدمين الاستفادة منها.",
      },
    ],
    description:
      "تعلم كيفية تتبع شحناتك باستخدام خاصية التتبع المتوفرة لتعرف موقع طلبك في أي لحظة.",
  },
  {
    id: 8,
    title: "كيف اعلم بوصول طلبي؟",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578926371549-35d0617d4ab6",
        description:
          "عربة ضخمة مليئة بالمنتجات تشير إلى حجم الطلبات الكبيرة أو الجملة.",
      },
    ],
    description:
      "اكتشف الطرق التي يمكنك من خلالها تلقي إشعارات بوصول الطلب سواء عبر التطبيق أو البريد الإلكتروني.",
  },
  {
    id: 9,
    title: "كيف اتواصل مع ادارة الموقع؟",
    images: [
      {
        url: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
        description:
          "تقويم يحتوي على أوقات محددة للتسليم، مما يساعدك في اختيار الوقت الأنسب لك.",
      },
    ],
    description:
      "تعرف على وسائل الاتصال المختلفة مثل الهاتف أو البريد الإلكتروني للحصول على الدعم من إدارة الموقع.",
  },
];

function HowDialog({
  open = false,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (status: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center pt-14 overflow-y-auto mdHalf:max-h-[85vh] max-h-[99vh] z-[999999999]  ">
        <DialogHeader>
          <DialogTitle className="text-right mb-4">
            {" "}
            كيف أطلب من السعودية ?{" "}
          </DialogTitle>

          <DialogDescription className="text-right">
            <p className="text-black">
              الشحن الدولي** 2. ** البحث عن المنتجات المطلوبة** - استخدم شريط
              البحث لكتابة اسم المنتج الذي تحتاجه. - استعرض الخيارات المتاحة
              وقارن
            </p>
            <h1 className="text-black font-bold my-8"> الخطوات : </h1>
            {/*  */}
            <Carousel opts={{ direction: "rtl" }}   >
            <div className="absolute rotate-180 left-16 -top-10 flex items-center justify-center z-10">
              <CarouselPrevious className=" -left-6 text-[#F58634]" />
              <CarouselNext className=" text-[#F58634]" />
            </div>
              <CarouselContent dir="rtl" >
                  {[1,2,3,4].map((item,index)=>(
                <CarouselItem className="w-full">
                    <div>
                    <div className="">
                      <h1 className="text-lg text-primary-background bg-zinc-100 w-10 h-10 flex items-center justify-center  rounded-full ">
                        
                        {index+1}
                      </h1>
                    </div>
                    <div className="flex items-center justify-center overflow-hidden w-full my-5">
                      <img
                        alt="iamge"
                        src={"/images/codingtest.png"}
                        className="object-contain rounded-sm"
                      />
                    </div>
                    <div>
                      <p className="text-black">
                        {`
                للطلب من السعودية عبر الإنترنت، يمكنك اتباع الخطوات التالية: 1.
            **اختيار الموقع أو التطبيق المناسب** اختر منصة موثوقة توفر شحن
            المنتجات داخل السعودية أو من السعودية إلى دولتك. بعض المنصات الشهيرة
            تشمل: - **أمازون السعودية** - **نون** - **طلبات خاصة عبر تطبيقات

           
            الأسعار والمواصفات. 3. **
            إضافة المنتجات إلى السلة** - اضغط على
            المنتج الذي ترغب بشرائه. - تحقق من التفاصيل مثل الحجم، اللون،
            والمواصفات. - اضغط على **"إضافة إلى السلة"**.
            للطلب من السعودية عبر الإنترنت، يمكنك اتباع الخطوات التالية: 1.
            **اختيار الموقع أو التطبيق المناسب** اختر منصة موثوقة توفر شحن
            المنتجات داخل السعودية أو من السعودية إلى دولتك. بعض المنصات الشهيرة
            تشمل: - **أمازون السعودية** - **نون** - **طلبات خاصة عبر تطبيقات
            الشحن الدولي** 2. **
            البحث عن المنتجات المطلوبة** - استخدم شريط البحث
            لكتابة اسم المنتج الذي تحتاجه. - استعرض الخيارات المتاحة وقارن
            الأسعار والمواصفات. 3. **إضافة المنتجات إلى السلة** - اضغط على
            المنتج الذي ترغب بشرائه. - تحقق من التفاصيل مثل الحجم، اللون،
            والمواصفات. - اضغط على **"إضافة إلى السلة"**.
            للطلب من السعودية عبر الإنترنت، يمكنك اتباع الخطوات التالية: 1.
            **اختيار الموقع أو التطبيق المناسب** اختر منصة موثوقة توفر شحن
            المنتجات داخل السعودية أو من السعودية إلى دولتك. بعض المنصات الشهيرة
            تشمل: - **أمازون السعودية** - **نون** - **طلبات خاصة عبر تطبيقات
            الشحن الدولي** 2. **البحث عن المنتجات المطلوبة** - استخدم شريط البحث
            لكتابة اسم المنتج الذي تحتاجه. - استعرض الخيارات المتاحة وقارن
            الأسعار والمواصفات. 3. **إضافة المنتجات إلى السلة** - اضغط على
            المنتج الذي ترغب بشرائه. - تحقق من التفاصيل مثل الحجم، اللون،
            والمواصفات. - اضغط على **"إضافة إلى السلة"**.
                 `}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
                  ))}
               
              </CarouselContent>
            </Carousel>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default HowDialog;
