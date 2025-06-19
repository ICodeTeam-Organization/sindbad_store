import React from "react";
import GetFavorite from "./(home)/(getInitData)/GetFavorite";
import GetCartItems from "./(home)/(getInitData)/GetCartItems";
import SetCategoriesInLocalStorage from "./(home)/(getInitData)/SetCategoriesInLocalStorage";
import { getApi } from "@/lib/http";
import GetNotificationCount from "./(home)/(getInitData)/GetNotificationCount";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";
import { NormalizedCategoryType } from "@/Data/normalizTypes";
import { normalizeCategory } from "@/Data/mappers/categoryNormlizeMapper";

async function GetInitialData() {
  let allCategoriesWithSub: NormalizedCategoryType[] = [];

  try {
    const response = await getApi<{ data: { items: any[] } }>(
      "Category/GetAllMainCategoriesWithSubCategories/1/10000"
    );
    allCategoriesWithSub = (response?.data?.items || []).map(normalizeCategory);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  let session = null;
  try {
    session = await getServerSession(authOption);
  } catch (error) {
    console.error("Error fetching session:", error);
  }

  let totalNotificationCount: number = 0;

  if (session?.user?.data?.isAuthenticated) {
    try {
      const notificationResponse = await getApi<{
        message: string;
        success: boolean;
        data: { all: number; orders: number; specials: number };
      }>("Notifications/Count");

      totalNotificationCount = notificationResponse?.data?.all || 0;
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }

  return (
    <>
      <GetNotificationCount data={totalNotificationCount} />
      <SetCategoriesInLocalStorage
        AllCategoriesWihtSubcategories={allCategoriesWithSub}
      />
      <GetCartItems />
      <GetFavorite />
    </>
  );
}

export default GetInitialData;
