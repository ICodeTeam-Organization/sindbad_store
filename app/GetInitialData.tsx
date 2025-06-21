import React from "react";
import GetFavorite from "./(home)/(getInitData)/GetFavorite";
import GetCartItems from "./(home)/(getInitData)/GetCartItems";
import GetAllCategories from "./(home)/(getInitData)/GetAllCategories";
import { getApi } from "@/lib/http";
import GetNotificationCount from "./(home)/(getInitData)/GetNotificationCount";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";
import GetUserData from "./(home)/(getInitData)/GetUserData";

async function GetInitialData() {
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

  console.log(session?.user?.data  ,'is logged ing');
  

  return (
    <>
    
      <GetUserData
        data={{
          email: session?.user?.data?.email ?? "",
          name: session?.user?.data?.fullName ?? "",
          phoneNumber: session?.user?.data?.phoneNumber ?? "",
          token: session?.user?.data?.token ?? "",
          isLogin: session?.user?.data?.isAuthenticated ?? false
        }}
      />
      <GetNotificationCount data={totalNotificationCount} />
      <GetAllCategories />
      <GetCartItems />
      <GetFavorite />
    </>
  );
}

export default GetInitialData;
