interface Notification {
  id: number;
  bgColor: string;
  date: string;
  order_title: string;
  order_number: string;
  content: string;
}
export interface NotificationCardProps {
  notificationsList: Notification[];
}

export interface FilterButtonProps {
  title: string
}