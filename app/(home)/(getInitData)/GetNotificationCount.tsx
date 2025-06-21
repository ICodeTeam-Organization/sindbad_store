"use client";

import { useNotificationsDataStore } from "@/app/stores_mangament/notificationStore";
import { useEffect } from "react";

function GetNotificationCount({ data }: { data: number }) {
  const { setNotificationCount } = useNotificationsDataStore();

  useEffect(() => {
    setNotificationCount(data);
  }, [data]);

  return <></>;
}

export default GetNotificationCount;
