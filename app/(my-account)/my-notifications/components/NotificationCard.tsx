import React from "react";
import { NotificationCardProps } from "../types";

const NotificationCard: React.FC<NotificationCardProps> = ({
  notificationsList,
}) => {
  return (
    <div className="space-y-4 mt-4">
      {notificationsList.map((notification) => (
        <div
          key={notification.id}
          className="flex items-start justify-between p-4 rounded-lg"
          style={{ backgroundColor: notification.bgColor }}
        >
          <div>
            <p className="text-sm text-gray-500">{notification.date}</p>
            <span className="text-sm text-[#3D7A81] bg-[#ECF2F2] px-2 rounded-sm">
              {notification.order_title}
            </span>
            <span className="mr-2 text-black">{notification.order_number}</span>
            <p className="text-sm text-gray-600">{notification.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCard;
