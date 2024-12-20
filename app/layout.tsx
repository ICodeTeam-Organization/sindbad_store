import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/client-providers";
import {  Noto_Kufi_Arabic, Tajawal } from "next/font/google";
import { NextAuthProvider } from "@/components/session-providers";
import { Toaster } from "@/components/ui/toaster";
import ProgressBarProvider from "@/components/progress-bar-providers";
import { Toaster as SonanerToaster } from "sonner";
import Footer from "@/components/Footer";
import About from "@/components/About";
import GetInitialData from "./GetInitialData";

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
                {/* this to get init data like categories , favorites */}
                <GetInitialData/>
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
