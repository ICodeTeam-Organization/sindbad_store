"use client";

import { getCookie } from "@/lib/coockie-utls";
import { useState, useEffect } from "react";
 

export async function getCurrencyInServerSide(defaultCurrency = "ر.س") {
      let currency;
      const country = getCookie("country") ?? "1";
      switch (country) {
        case "1":
          currency = ("ر.س");
          break;
        case "2":
          currency = ("د.إ");
          break;
        default:
          currency = (defaultCurrency);
      } 

  return { currency };
}
