 
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16 text-gray-800  relative  ">
 <div
    className="fixed top-20 right-20 inset-0 z-0 bg-center bg-no-repeat bg-contain opacity-10 pointer-events-none bg-[url('/images/bg_about_page.svg')]"
    
  />
      {/* القسم 1: عن متجر سندباد */}
      <section>
        <h1 className="text-4xl font-bold mb-4">عن متجر سندباد</h1>
        <p className="leading-relaxed text-lg">
          متجر سندباد هو متجر إلكتروني متخصص في تقديم منتجات مبتكرة وجودة عالية بأسعار مناسبة. نؤمن بأن تجربة التسوق يجب أن تكون سهلة وآمنة وممتعة، ونسعى لتقديم أفضل تجربة ممكنة لكل عميل من خلال خدمات احترافية وشحن سريع ودعم فني مميز.
        </p>
      </section>

      {/* القسم 2: ما هو الطلب الخاص؟ */}
      <section>
        <h2 className="text-3xl font-bold mb-4">ما هو الطلب الخاص؟</h2>
        <p className="leading-relaxed text-lg">
          "الطلب الخاص" هو خدمة حصرية يقدمها متجر سندباد لعملائه المميزين، حيث يتم تخصيص عروض ومنتجات حسب الاهتمام والسلوك الشرائي. كما تشمل الخدمة شحن مجاني، خصومات موسمية، وتنبيهات مبكرة حول المنتجات المحدودة.
        </p>
      </section>

      {/* القسم 3: الأسئلة الشائعة */}
      <section>
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
    </div>
  );
}

const faqList = [
  {
    question: 'كيف أطلب من متجر سندباد؟',
    answer: 'ببساطة، تصفح المنتجات وأضفها إلى سلة الشراء، ثم انتقل لإتمام الطلب.',
  },
  {
    question: 'هل الشحن متوفر لجميع مناطق المملكة؟',
    answer: 'نعم، نوفر الشحن لجميع مناطق المملكة العربية السعودية.',
  },
  {
    question: 'ما هي مدة التوصيل المتوقعة؟',
    answer: 'عادةً من 2 إلى 5 أيام عمل داخل المملكة.',
  },
  {
    question: 'هل يمكنني استرجاع المنتج إذا لم يعجبني؟',
    answer: 'نعم، يمكنك طلب الاسترجاع خلال 7 أيام من تاريخ الاستلام وفقاً للسياسة.',
  },
  {
    question: 'كيف يمكنني التواصل مع خدمة العملاء؟',
    answer: 'عن طريق نموذج التواصل في الموقع أو عبر واتساب وخدمة البريد الإلكتروني.',
  },
  {
    question: 'هل المنتجات أصلية؟',
    answer: 'نعم، جميع منتجاتنا أصلية ومضمونة 100%.',
  },
  {
    question: 'هل أحتاج إلى إنشاء حساب لإتمام الطلب؟',
    answer: 'يمكنك الطلب كزائر، لكن الحساب يساعدك على تتبع الطلبات بسرعة.',
  },
  {
    question: 'هل توجد خصومات أو كوبونات؟',
    answer: 'نعم، نقدم عروض موسمية وكوبونات بشكل دوري عبر النشرة البريدية.',
  },
  {
    question: 'هل يوجد شحن دولي؟',
    answer: 'حالياً نخدم فقط داخل السعودية، لكن نخطط للتوسع قريباً.',
  },
  {
    question: 'ما هي طرق الدفع المتاحة؟',
    answer: 'نقبل مدى، فيزا، ماستركارد، و Apple Pay و STC Pay.',
  },
];
