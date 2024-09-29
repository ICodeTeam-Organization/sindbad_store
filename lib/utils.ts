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
