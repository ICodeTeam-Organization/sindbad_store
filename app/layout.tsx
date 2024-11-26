import type { Metadata } from "next";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClientProviders from "@/components/client-providers";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";
import About from "@/components/About";
import { Almarai } from "next/font/google";
import { cn } from "@/lib/utils";
import { NextAuthProvider } from "@/components/session-providers";
import { Toaster } from "@/components/ui/toaster";
import ProgressBarProvider from "@/components/progress-bar-providers";
import { Toaster as SonanerToaster } from "sonner";

const sansFont = Almarai({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "متجر سندباد",
  description: "وصف لمتجر سندباد",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(sansFont.variable, "font-sans antialiased")}
        dir="rtl"
      >
        <ProgressBarProvider>
          <NextAuthProvider>
            <main>
              <ClientProviders>{children}</ClientProviders>
            </main>
            <Subscribe />
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
