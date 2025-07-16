import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(request) {
    // Debug: log the request URL
    // console.log('[Middleware] Request URL:', request.url);

    // Get country cookie and token
    const countryCookie = request.cookies.get("country")?.value;
    const token = await getToken({ req: request });
    const { pathname } = request.nextUrl;

    // // Debug: log current cookie and token
    // console.log('[Middleware] Current country cookie:', countryCookie);
    // console.log('[Middleware] User token:', token ? 'Exists' : 'None');

    // Initialize response
    let response = NextResponse.next();
 
    // Set country cookie if not exists
    // if (!countryCookie) {
    //   // console.log('[Middleware] Setting country cookie');
    //   response.cookies.set("country", "1", {
    //     path: "/",
    //     httpOnly: false,
    //     sameSite: "lax",
    //     maxAge: 60 * 60 * 24 * 365,
    //   });
    // }

    // Protected paths
    const protectedPaths = [
      "/cart",
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

    // Check if current path is protected
    const isProtected = protectedPaths.some((path) =>
      pathname.startsWith(path)
    );

    // Redirect to auth if protected path and no token
    if (isProtected && !token) {
      // console.log('[Middleware] Redirecting to auth page');
      const loginUrl = new URL("/auth", request.url);
      const redirectResponse = NextResponse.redirect(loginUrl);
      
      // Set cookie if not exists in redirect response
      
      
      return redirectResponse;
    }

    return response;
  },
  {
    callbacks: {
      authorized: async ({ token }) => {
        // Debug: log the token in authorized callback
        // console.log('[Auth Callback] Token:', token ? 'Exists' : 'None');
        
        // Bypass protection to handle it in the middleware function
        return true;
      },
    },
  }
);

export const config = {
  // المسارت الي بيشتغل فيها المدل وير
  matcher: [
    // "/cart/:path*",
    // "/my-notifications/:path*",
    // "/my-orders/:path*",
    // "/my-special-orders/:path*",
    // "/profile/:path*",
    // "/user-addresses/:path*",
    // "/Favorites/:path*",
    // "/checkout/:path*",
    // "/checkout-success/:path*",
    // "/Orderdetail/:path*",
    // "/OrderTrack/:path*",
    '/:path*'
    // Add more paths as needed
  ],
};