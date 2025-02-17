// interface Notification {
//   id: number;
//   bgColor: string;
//   date: string;
//   order_title: string;
//   order_number: string;
//   content: string;
// }
export interface NotificationCardProps {
  notificationsList: Notification[];
}

export interface FilterButtonProps {
  title: string
}

export type ApiResponseForNotifications = {
  success: boolean;
  message: string;
  errors: string[];
  data: {
    items: NotificationType[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
};

export type NotificationType = {
  id: number;
  target: number;
  title: string;
  body: string;
  imageUrl: string;
};
