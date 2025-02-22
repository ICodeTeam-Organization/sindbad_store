import { create } from 'zustand';

interface NotificationsDataState {
  notificationCount: number;
  setNotificationCount: (count: number) => void;
}

export const useNotificationsDataStore = create<NotificationsDataState>((set) => {
  return {
    notificationCount: 0,
    setNotificationCount: (count) => set({ notificationCount: count }),
  };
});