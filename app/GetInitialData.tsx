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
  
  const AllCategoriesWithSub = await getApi<{
    data: { items: MainCategory[] };
  }>("Category/GetAllMainCategoriesWithSubCategories/1/10000");

  const session = await getServerSession(authOption);
  let notificationCount;

  let totalNotificationCount: number = 0;
  if (session && session?.user?.data?.isAuthenticated) {
    try {
      notificationCount = await getApi<{
        message: string;
        success: boolean;
        data: { all: number; orders: number; specials: number };
      }>("Notifications/Count");
      console.log(notificationCount);
      
      totalNotificationCount = notificationCount?.data.all;
    } catch (error) {
      totalNotificationCount =0;
      console.log(error);
      
    }
  }

  return (
    <>
      <GetNotificationCount data={totalNotificationCount || 0} />
      <SetCategoriesInLocalStorage
        AllCategoriesWihtSubcategories={AllCategoriesWithSub?.data?.items}
      />
      <GetCartItems />
      <GetFavorite />
    </>
  );
}

export default GetInitialData;
