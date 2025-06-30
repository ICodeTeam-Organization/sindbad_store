import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/client-providers";
import { Almarai, Cairo, Tajawal } from "next/font/google";
import { NextAuthProvider } from "@/components/session-providers";
import { Toaster } from "@/components/ui/toaster";
import ProgressBarProvider from "@/components/progress-bar-providers";
import { Toaster as SonanerToaster } from "sonner";
// import Footer from "@/components/Footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import SpecialOrderDialogsViewer from "@/components/SpecialOrderDialogsViewer";
import { ToastContainer } from 'react-toastify';
import GetInitialData from "./GetInitialData";
import SendDataInBG from "@/components/DataHandler/SendDataInBG";
import Footer from "@/components/footer/Footer";

// const Noto_Kufi = Almarai({
//   weight: ["400", "700"],
//   subsets: ["arabic"],
//   display: "swap",
//   variable: "--font-noto",
// });
// const tajawal = Tajawal({
//   weight: ["400", "700"],
//   subsets: ["arabic"],
//   display: "swap",
//   variable: "--font-tajawal",
// });
const cairo = Cairo({
  weight: ["400", "700", "500","600","800","300"],
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
  return (
    <html lang="en">
      <body className={`${cairo.variable} `} dir="rtl">
        <ProgressBarProvider>
          <NextAuthProvider>
            <main>
              <ClientProviders>
                {/* this to get init data like categories , favorites */}
                <GetInitialData />
                <SendDataInBG/>
                <NuqsAdapter>
                  <SpecialOrderDialogsViewer/>
                  {children}
                  <Footer/>
                   {/* <About />
                  <Footer /> */}
                </NuqsAdapter>
              </ClientProviders>
            </main>
            {/* <Subscribe /> */}
          </NextAuthProvider>

          {/* to show toaster messages */}
          <Toaster  />
          <SonanerToaster richColors />
          <ToastContainer position="bottom-right" />
        </ProgressBarProvider>
      </body>
    </html>
  );
}
