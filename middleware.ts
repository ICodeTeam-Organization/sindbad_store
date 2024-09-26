import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(request: NextRequest) {
    const isAuth = await getToken({ req: request });
    const pathName = request.nextUrl.pathname;
    const paths = ["/shopping-card"];
    const isProtected = paths.some((d) => pathName.startsWith(d));
    if (!isAuth && isProtected) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/shopping-card/:path"],
};
