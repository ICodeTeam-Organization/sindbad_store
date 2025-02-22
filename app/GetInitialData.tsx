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

  if (session && session?.user?.data?.isAuthenticated) {
    notificationCount = await getApi<{
      message: string;
      success: boolean;
      data: number;
    }>("Notifications/Count");
  }

  return (
    <>
      <GetNotificationCount data={notificationCount?.data || 0} />
      <SetCategoriesInLocalStorage
        AllCategoriesWihtSubcategories={AllCategoriesWithSub?.data?.items}
      />
      <GetCartItems />
      <GetFavorite />
    </>
  );
}

export default GetInitialData;
