import { clsx, type ClassValue } from "clsx";
import { getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";
import { authOption } from "./authOption";
import { getSession } from "next-auth/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isClient() {
  return typeof window !== "undefined";
}

export async function isLogged(): Promise<boolean> {
  let session = null;

  if (isClient()) {
    session = await getSession();
  } else {
    session = await getServerSession(authOption);
  }

  return session !== null;
}

export function convertToArabicDate(dateString: string) {
  // تحويل النص إلى كائن تاريخ
  const date = new Date(dateString);

  // تعريف أسماء الأيام والشهور بالعربية
  const days = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  const months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  // استخراج اليوم والشهر والسنة
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  // تنسيق النص النهائي
  return `${dayName}، ${day} ${monthName} ${year}`;
}

export const goToExtrnalLink = (link: string) => {
  return link != "" && link != null && !!link
    ? !link?.startsWith("http://") || !link?.startsWith("http://")
      ? link
      : "https://" + link
    : "";
};


export const calculateBonus = (
  quantity: number,
  amountYouBuy: number,
  amountYouGet: number
) => {
  if (amountYouBuy && amountYouGet) {
    return Math.floor(quantity / amountYouBuy) * amountYouGet;
  }
  return 0;
};