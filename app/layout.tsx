import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/client-providers";
import { Almarai, Tajawal } from "next/font/google";
import { NextAuthProvider } from "@/components/session-providers";
import { Toaster } from "@/components/ui/toaster";
import ProgressBarProvider from "@/components/progress-bar-providers";
import { Toaster as SonanerToaster } from "sonner";
import Footer from "@/components/Footer";
import About from "@/components/About";
import GetInitialData from "./GetInitialData";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import SpecialOrderDialogsViewer from "@/components/SpecialOrderDialogsViewer";

const Noto_Kufi = Almarai({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-noto",
});
const tajawal = Tajawal({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "متجر سندباد",
  description:
    "متجر سندباد هو منصة تجارة إلكترونية متعددة البائعين تقدم مجموعة واسعة من المنتجات المتنوعة. يمكن للمستخدمين تقديم الطلبات الخاصة واستلام المنتجات بسهولة من أي بلد في العالم. بالإضافة إلى ذلك، يتيح المتجر للمستخدمين إمكانية طلب أي منتج من متاجر عالمية مثل علي بابا وأمازون، مما يوفر تجربة تسوق شاملة ومرنة تلبي جميع الاحتياجات.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Noto_Kufi.variable} ${tajawal.variable}`} dir="rtl">
        <ProgressBarProvider>
          <NextAuthProvider>
            <main>
              <ClientProviders>
                {/* this to get init data like categories , favorites */}
                <GetInitialData />
                <NuqsAdapter>
                  <SpecialOrderDialogsViewer/>
                  {children}
                  <About />
                  <Footer />
                </NuqsAdapter>
              </ClientProviders>
            </main>
            {/* <Subscribe /> */}
          </NextAuthProvider>

          {/* to show toaster messages */}
          <Toaster  />
          <SonanerToaster richColors />
        </ProgressBarProvider>
      </body>
    </html>
  );
}
