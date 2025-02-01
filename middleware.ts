import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";




export default withAuth(
  async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const { pathname } = request.nextUrl;
    const protectedPaths = [
      "/shopping-card",
      "/my-notifications",
      "/my-orders",
      "/my-special-orders",
      "/profile",
      "/user-addresses",
      "/Favorites",
      "/checkout",
      "/checkout-success",
      "/Orderdetail",
      "/OrderTrack",
    ];
    const isProtected = protectedPaths.some((path) =>
      pathname.startsWith(path)
    );

    if (isProtected && !token) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    return NextResponse.next();
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
  matcher:  [
    "/shopping-card/:path*",
    "/my-notifications/:path*",
    "/my-orders/:path*",
    "/my-special-orders/:path*",
    "/profile/:path*",
    "/user-addresses/:path*",
    "/Favorites/:path*",
    "/checkout/:path*",
    "/checkout-success/:path*",
    "/Orderdetail/:path*",
    "/OrderTrack/:path*",
  ],
};
