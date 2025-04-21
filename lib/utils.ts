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

export function remmainingTime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let timeString = '';

  if (days > 0) {
    timeString += `${days} يوم${days > 1 ? '' : ''} `;
  }
  if (hours > 0) {
    timeString += `${hours} ساعة${hours > 1 ? '' : ''} `;
  }
  if (minutes > 0) {
    timeString += `${minutes} دقيقة${minutes > 1 ? '' : ''} `;
  }
  if (secs > 0 || timeString === '') {
    timeString += `${secs} ثانية${secs > 1 ? '' : ''}`;
  }

  return timeString.trim();
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




  