import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
const faqList = [
  {
    question: "كيف أطلب من متجر سندباد؟",
    answer:
      "ببساطة، تصفح المنتجات وأضفها إلى سلة الشراء، ثم انتقل لإتمام الطلب.",
  },
  {
    question: "هل الشحن متوفر لجميع مناطق المملكة؟",
    answer: "نعم، نوفر الشحن لجميع مناطق المملكة العربية السعودية.",
  },
  {
    question: "ما هي مدة التوصيل المتوقعة؟",
    answer: "عادةً من 2 إلى 5 أيام عمل داخل المملكة.",
  },
  {
    question: "هل يمكنني استرجاع المنتج إذا لم يعجبني؟",
    answer:
      "نعم، يمكنك طلب الاسترجاع خلال 7 أيام من تاريخ الاستلام وفقاً للسياسة.",
  },
  {
    question: "كيف يمكنني التواصل مع خدمة العملاء؟",
    answer:
      "عن طريق نموذج التواصل في الموقع أو عبر واتساب وخدمة البريد الإلكتروني.",
  },
  {
    question: "هل المنتجات أصلية؟",
    answer: "نعم، جميع منتجاتنا أصلية ومضمونة 100%.",
  },
  {
    question: "هل أحتاج إلى إنشاء حساب لإتمام الطلب؟",
    answer: "يمكنك الطلب كزائر، لكن الحساب يساعدك على تتبع الطلبات بسرعة.",
  },
  {
    question: "هل توجد خصومات أو كوبونات؟",
    answer: "نعم، نقدم عروض موسمية وكوبونات بشكل دوري عبر النشرة البريدية.",
  },
  {
    question: "هل يوجد شحن دولي؟",
    answer: "حالياً نخدم فقط داخل السعودية، لكن نخطط للتوسع قريباً.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نقبل مدى، فيزا، ماستركارد، و Apple Pay و STC Pay.",
  },
];

function FAQs() {
  return (
    <section id="FAQs" className="scroll-mt-28">
      <h2 className="text-3xl font-bold mb-6">الأسئلة الشائعة</h2>
      <div>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqList.map(({ question, answer }, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FAQs;
