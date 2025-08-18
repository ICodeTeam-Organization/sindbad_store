import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


const countrys: { [key: string]: string } = {
  "1": "KSA",
  "2": "UAE",
};

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
    response.headers.set('x-pathname', pathname);

    let countryFromPath = Object.values(countrys).find(path => pathname.startsWith("/" + path));
    let country = "1";

    if (countryFromPath) {
      const found = Object.entries(countrys).find(([, val]) => val === countryFromPath);
      if (found) country = found[0];
    } else if (countryCookie && Object.keys(countrys).includes(countryCookie)) {
      country = countryCookie;
    }

    response.cookies.set("country", country, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });
    // ✅ تحقق قبل redirect إذا URL ما يبدأ بالدولة

    const url = request.nextUrl.clone();
    const countryCode = countrys[country];
    if (
      pathname == "/" 
    ) {
      url.pathname = `/${countryCode}`;
      return NextResponse.redirect(url);
    } else if (
      !pathname.startsWith(`/${countryCode}`) &&
      !pathname.startsWith("/images") &&
      !pathname.startsWith("/favicon.ico") &&
      !pathname.startsWith("/_next")
    ) {
      url.pathname = `/${countryCode}${pathname}`;
      return NextResponse.rewrite(url);
    }



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
      "/detail",
      "/track",
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
  matcher: [
    '/((?!_next|api|images|favicon.ico).*)',
  ],
};