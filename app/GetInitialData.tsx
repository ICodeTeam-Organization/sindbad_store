import React from "react";
import GetFavorite from "./(home)/(getInitData)/GetFavorite";
import GetCartItems from "./(home)/(getInitData)/GetCartItems";
import SetCategoriesInLocalStorage from "./(home)/(getInitData)/SetCategoriesInLocalStorage";
import { getApi } from "@/lib/http";
import { MainCategory } from "@/types/storeTypes";
import GetNotificationCount from "./(home)/(getInitData)/GetNotificationCount";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";

async function GetInitialData() {
  let allCategoriesWithSub: MainCategory[] = [];

  try {
    const response = await getApi<{ data: { items: MainCategory[] } }>(
      "Category/GetAllMainCategoriesWithSubCategories/1/10000"
    );
    allCategoriesWithSub = response?.data?.items || [];
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
