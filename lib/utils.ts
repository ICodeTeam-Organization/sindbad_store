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
export const goToExtrnalLink = (link: string) => {
  return link != "" && link != null && !!link
    ? link?.startsWith("https://")  ? link
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


// export const getCurrencykey = () => { 
//   const country = getCookie("country");
//   switch (country ?? "1") {
//     case "1":
//       return "ر.س"
//       case "2":
//       return "د.إ"
//     default:
//       return "رس"
//       break;
//   }
//  }

// export const currency = getCurrencykey()
