import React from 'react'

function WhatIsSpecialProduct() {
  return (
    <section id="whatIsSpecialProduct" className="scroll-mt-28 my-16">
        <h2 className="text-3xl font-bold mb-4">ما هو الطلب الخاص؟</h2>
        <div className="  mx-auto">
          <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2 border-gray-300">
            خدمة الطلب الخاص – اطلب من العالم إلى باب بيتك!
          </h2>

          <p className="text-gray-700 mb-4">
            خدمة <strong>الطلب الخاص</strong> من متجر <strong>سندباد</strong> هي
            الحل المثالي لكل من يرغب بشراء منتجات من خارج اليمن بكل سهولة وأمان.
            تم تصميم هذه الخدمة خصيصًا لعملائنا داخل اليمن، لتمنحهم القدرة على
            الوصول إلى الأسواق والمتاجر العالمية، مثل
            <strong> نون، أمازون، علي بابا </strong>، وغيرها، دون الحاجة لأي
            وسطاء أو تعقيدات.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            كيف تعمل الخدمة؟
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>
              أدخل تفاصيل المنتج الذي ترغب في شرائه من الخارج:
              <ul className="list-disc list-inside ml-5">
                <li>الاسم</li>
                <li>رابط المنتج</li>
                <li>أو صورة واضحة له</li>
              </ul>
            </li>
            <li>
              فريق سندباد يقوم بالبحث نيابة عنك ويعرض عليك{" "}
              <strong>عدة خيارات</strong> لنفس المنتج:
              <ul className="list-disc list-inside ml-5">
                <li>
                  اختلافات في <strong>اللون</strong> أو{" "}
                  <strong>المواصفات</strong>
                </li>
                <li>
                  <strong>أسعار متنوعة</strong> تناسب مختلف الميزانيات
                </li>
                <li>
                  <strong>خيارات من عدة متاجر</strong> عالمية موثوقة
                </li>
              </ul>
            </li>
            <li>تختار المنتج الذي يناسبك وتضيفه إلى السلة.</li>
            <li>
              يتم <strong>الشراء نيابة عنك</strong>، ثم{" "}
              <strong>شحن المنتج إلى باب منزلك</strong> داخل اليمن بسرعة
              وموثوقية عالية.
            </li>
          </ol>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            مزايا الطلب الخاص:
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-5">
            <li>
              إمكانية الشراء من المتاجر العالمية مثل{" "}
              <strong>Amazon, Noon, Alibaba</strong> وغيرها.
            </li>
            <li>شحن آمن وسريع من خارج اليمن إلى باب منزلك.</li>
            <li>
              دعم كامل للطلبات <strong>الفردية</strong> و
              <strong>الطلبيات بالجملة</strong>.
            </li>
            <li>تسعيرات مرنة وخيارات متعددة لنفس المنتج.</li>
            <li>متابعة مستمرة لحالة الطلب حتى استلامه.</li>
            <li>خدمة عملاء جاهزة لخدمتك والإجابة عن استفساراتك.</li>
          </ul> 
        </div>
      </section>
  )
}

export default WhatIsSpecialProduct