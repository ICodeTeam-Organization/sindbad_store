import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/client-providers";
import {  Noto_Kufi_Arabic, Tajawal } from "next/font/google";
import { NextAuthProvider } from "@/components/session-providers";
import { Toaster } from "@/components/ui/toaster";
import ProgressBarProvider from "@/components/progress-bar-providers";
import { Toaster as SonanerToaster } from "sonner";
import GetCartItems from "./(home)/(getInitData)/GetCartItems";
import Footer from "@/components/Footer";
import About from "@/components/About";
import GetFavorite from "./(home)/(getInitData)/GetFavorite";
import SetCategoriesInLocalStorage from "@/app/(home)/(getInitData)/SetCategoriesInLocalStorage";
import { getApi } from "@/lib/http";
import { MainCategory } from "@/types/storeTypes";

const Noto_Kufi = Noto_Kufi_Arabic({
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
  description: "وصف لمتجر سندباد",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 const AllCategoriesWithSub = await getApi<{data:{items:MainCategory[]}}>(
    "Categories/GetAllMainCategoriesWithSubCategories/1/10000"
  );
  

  return (
    <html lang="en">
      <body
        className={`${Noto_Kufi.variable} ${tajawal.variable}`}
        dir="rtl"
      >
        <ProgressBarProvider>
          <NextAuthProvider>
            <main>
              <ClientProviders>
                <SetCategoriesInLocalStorage AllCategoriesWihtSubcategories={AllCategoriesWithSub?.data?.items} />
                <GetCartItems/>
                <GetFavorite/>
                {children}
                </ClientProviders>
            </main>
            {/* <Subscribe /> */}
          </NextAuthProvider>
          <About />
          <Footer />
          {/* to show toaster messages */}
          <Toaster />
          <SonanerToaster richColors />
        </ProgressBarProvider>
      </body>
    </html>
  );
}
