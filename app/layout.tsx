import "./globals.css";
import type { Metadata } from "next";
import ClientProviders from "@/components/client-providers";
import { Cairo } from "next/font/google";
import { NextAuthProvider } from "@/components/session-providers";
import { Toaster } from "@/components/ui/toaster";
import ProgressBarProvider from "@/components/progress-bar-providers";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import SpecialOrderDialogsViewer from "@/components/SpecialOrderDialogsViewer";
import { ToastContainer } from 'react-toastify';
import GetInitialData from "./GetInitialData";
import SendDataInBG from "@/components/DataHandler/SendDataInBG";
import Footer from "@/components/footer/Footer";
import MainHeader from "@/components/MainHeader/MainHeader";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";
import { getCookie } from "@/lib/coockie-utls";


const cairo = Cairo({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-main",
});
export const metadata: Metadata = {
  title: "متجر سندباد",
  description:
    "متجر سندباد هو منصة تجارة إلكترونية متعددة البائعين تقدم مجموعة واسعة من المنتجات المتنوعة. يمكن للمستخدمين تقديم الطلبات الخاصة واستلام المنتجات بسهولة من أي بلد في العالم. بالإضافة إلى ذلك، يتيح المتجر للمستخدمين إمكانية طلب أي منتج من متاجر عالمية مثل علي بابا وأمازون، مما يوفر تجربة تسوق شاملة ومرنة تلبي جميع الاحتياجات.",
  keywords: [
    "متجر سندباد",
    "تجارة إلكترونية",
    "طلبات خاصة",
    "أمازون",
    "علي بابا",
    "شراء من الخارج",
    "متاجر عالمية",
    "منتجات متنوعة",
  ],
  // viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "متجر سندباد",
    description:
      "منصة إلكترونية متعددة البائعين لطلب المنتجات من مختلف أنحاء العالم، بما في ذلك المتاجر العالمية مثل أمازون وعلي بابا.",
    url: "https://sindbad-store.vercel.app",
    siteName: "متجر سندباد",
    locale: "ar",
    type: "website",

  },

};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOption);
  const defaultCountry = getCookie("country");

  // const pathname

  return (
    <html lang="en">
      <body className={`${cairo.variable} font-bold `} dir="rtl">
        <ProgressBarProvider>
          <NextAuthProvider>
            <main>
              <ClientProviders>
                {/* this to get init data like categories , favorites */}
                <GetInitialData />
                <SendDataInBG />
                <NuqsAdapter>
                  <SpecialOrderDialogsViewer />
                  <MainHeader  isAuth={!!session} defaultCountry={defaultCountry ?? "1"} />
                  {children}
                  <Footer />
                  {/* <About />
                  <Footer /> */}
                </NuqsAdapter>
              </ClientProviders>
            </main>
            {/* <Subscribe /> */}
          </NextAuthProvider>

          {/* to show toaster messages */}
          <Toaster />
          {/* <SonanerToaster richColors /> */}
          <ToastContainer position="bottom-right" />
        </ProgressBarProvider>
      </body>
    </html>
  );
}
