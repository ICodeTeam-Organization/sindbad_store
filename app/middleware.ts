// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // منطق التوجيه بناءً على حالة المصادقة
  function middleware(req) {
    const token = req.nextauth.token;

    // إذا لم يكن المستخدم مسجلاً دخوله، يتم إعادة توجيهه إلى صفحة تسجيل الدخول
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // إذا كان المستخدم لديه الصلاحية للوصول
    return NextResponse.next();
  },
  {
    callbacks: {
      // تأكيد السماح فقط للمستخدمين المصادقين
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/protected/:path*"], // حماية صفحات معينة
};
