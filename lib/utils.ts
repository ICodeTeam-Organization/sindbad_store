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

  let timeString = "";

  if (days > 0) {
    timeString += `${days} يوم${days > 1 ? "" : ""} `;
  }
  if (hours > 0) {
    timeString += `${hours} ساعة${hours > 1 ? "" : ""} `;
  }
  if (minutes > 0) {
    timeString += `${minutes} دقيقة${minutes > 1 ? "" : ""} `;
  }
  if (secs > 0 || timeString === "") {
    timeString += `${secs} ثانية${secs > 1 ? "" : ""}`;
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
  if (!!amountYouBuy && !!amountYouGet) {
    return Math.floor(quantity / amountYouBuy) * amountYouGet;
  }
  return 0;
};

export type BgHandlerDataItemType = {
  reqType: number;  
  reqValue: number;  
  Id: number | string;
  reviewText?: string | null;
  prevValue?: number;
  prevReviewText?: string | null;
  date?: string; 
};

export const saveToLocalStorage = (item: BgHandlerDataItemType) => {
  const key = "backgroundHandlerData";
  let existing: BgHandlerDataItemType[] = JSON.parse(
    localStorage.getItem(key) || "[]"
  );

  const index = existing.findIndex(
    (entry) => entry.reqType === item.reqType && entry.Id === item.Id
  );

  if (index !== -1) {
    // ✅ تعديل القيم إذا كان العنصر موجود
    if (existing[index].prevValue == item.reqValue) {
      // remove it
      existing = existing.filter(
        (e) => e.Id != item.Id && e.reqType != item.reqType
      );
    } else {
      existing[index] = {
        ...existing[index],
        reqValue: item.reqValue,
        reviewText: item.reviewText,
        prevValue: existing[index].prevValue, // الاحتفاظ بالقيمة السابقة
      };
    }
  } else {
    // ✅ إضافة العنصر إذا لم يكن موجود
    existing.push(item);
  }

  localStorage.setItem(key, JSON.stringify(existing));
};
