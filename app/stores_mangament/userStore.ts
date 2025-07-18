// useUserStore.ts
import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber:string;
  token:string;
};

type UserState = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
