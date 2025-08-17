import React from "react";
import GetFavorite from "./[country]/(home)/(getInitData)/GetFavorite";
import GetCartItems from "./[country]/(home)/(getInitData)/GetCartItems";
import GetAllCategories from "./[country]/(home)/(getInitData)/GetAllCategories";
import { getApi } from "@/lib/http";
import GetNotificationCount from "./[country]/(home)/(getInitData)/GetNotificationCount";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";
import GetUserData from "./[country]/(home)/(getInitData)/GetUserData";

async function GetInitialData() {

  const date = new Date(); 
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
        data: {
          count: number;
          action: number;
        }[];
      }>("Notifications/Count");
 
      totalNotificationCount =
        notificationResponse?.data?.reduce((total, current) => {
          return total + current.count;
        }, 0) || 0;
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }

  return (
    <>
      <GetUserData
        data={{
          email: session?.user?.data?.email ?? "",
          name: session?.user?.data?.fullName ?? "",
          phoneNumber: session?.user?.data?.phoneNumber ?? "",
          token: session?.user?.data?.token ?? "",
          isLogin: session?.user?.data?.isAuthenticated ?? false,
        }}
      />
      <GetNotificationCount data={totalNotificationCount} />
      <GetAllCategories date={date} />
      <GetCartItems />
      <GetFavorite />
    </>
  );
}

export default GetInitialData;
