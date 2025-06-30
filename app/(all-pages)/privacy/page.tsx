'use client';

import React from 'react';

const Policies = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 leading-relaxed">
      {/* روابط التنقل */}
      <nav className="flex flex-wrap gap-6 justify-center mb-12 text-blue-600 font-medium text-lg">
        <a href="#terms" className="hover:underline">الشروط والأحكام</a>
        <a href="#privacy" className="hover:underline">سياسة الخصوصية</a>
        <a href="#return-policy" className="hover:underline">سياسة الاستبدال والاسترجاع</a>
        <a href="#user-agreement" className="hover:underline">اتفاقية المستخدم</a>
      </nav>

      {/* الشروط والأحكام */}
      <section id="terms" className="mb-20 scroll-mt-28">
        <h2 className="text-3xl font-bold mb-4">أولاً: الشروط والأحكام</h2>
        <p>
          باستخدامك لهذا الموقع فإنك توافق على الالتزام بكافة الشروط التالية:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>يُمنع استخدام الموقع لأي أغراض غير قانونية أو تنتهك الحقوق الفكرية أو الأخلاقية.</li>
          <li>نحتفظ بحق تعديل أو تعليق أو إنهاء أي جزء من الخدمة في أي وقت دون إشعار مسبق.</li>
          <li>جميع المحتويات مملوكة لـ <span className="font-semibold">[اسم المتجر]</span> ويحظر إعادة استخدامها دون إذن.</li>
          <li>عند إجراء طلب، يلتزم المستخدم بتوفير معلومات صحيحة وكاملة.</li>
        </ul>
      </section>

      {/* سياسة الخصوصية */}
      <section id="privacy" className="mb-20 scroll-mt-28">
        <h2 className="text-3xl font-bold mb-4">ثانياً: سياسة الخصوصية</h2>
        <p>
          نحترم خصوصيتك ونتعهد بحماية معلوماتك الشخصية، وتتم المعالجة كما يلي:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>نجمع بيانات مثل الاسم والبريد الإلكتروني والعنوان لأغراض تنفيذ الطلبات فقط.</li>
          <li>لا نشارك معلوماتك مع أي طرف ثالث خارج شركاء الشحن والدفع المعتمدين.</li>
          <li>نستخدم تقنيات حماية حديثة لتأمين بياناتك ومنع الوصول غير المصرح به.</li>
          <li>يحق لك طلب تعديل أو حذف بياناتك في أي وقت عبر التواصل معنا.</li>
        </ul>
      </section>

      {/* سياسة الاستبدال والاسترجاع */}
      <section id="return-policy" className="mb-20 scroll-mt-28">
        <h2 className="text-3xl font-bold mb-4">ثالثاً: سياسة الاستبدال والاسترجاع</h2>
        <p>
          نحن نضمن رضا العميل من خلال سياسة استبدال واسترجاع واضحة:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>يُمكن استرجاع المنتجات خلال 7 أيام من تاريخ الاستلام في حال عدم استخدامها.</li>
          <li>في حال وجود خلل مصنعي، نقبل الاستبدال خلال 3 أيام مع تقديم إثبات.</li>
          <li>يجب إعادة المنتج في حالته الأصلية مع الفاتورة والإكسسوارات المرفقة.</li>
          <li>المنتجات الشخصية أو المصنوعة حسب الطلب غير قابلة للاسترجاع.</li>
        </ul>
      </section>

      {/* اتفاقية المستخدم */}
      <section id="user-agreement" className="mb-20 scroll-mt-28">
        <h2 className="text-3xl font-bold mb-4">رابعاً: اتفاقية المستخدم</h2>
        <p>
          توضح هذه الاتفاقية العلاقة بين المستخدم ومتجر <span className="font-semibold">[اسم المتجر]</span>:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>يجب على المستخدم تقديم معلومات دقيقة وصحيحة عند التسجيل أو الشراء.</li>
          <li>المستخدم مسؤول عن حفظ بيانات الدخول وعدم مشاركتها مع أي طرف آخر.</li>
          <li>نحتفظ بحق تعليق الحساب في حال مخالفة الشروط أو إساءة الاستخدام.</li>
          <li>باستخدامك للموقع، فإنك توافق على كافة السياسات والبنود المذكورة.</li>
        </ul>
      </section>

      {/* التاريخ */}
      <p className="text-center text-sm text-gray-500">تاريخ آخر تحديث: 30 يونيو 2025</p>
    </div>
  );
};

export default Policies;
