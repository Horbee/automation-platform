import create from "zustand";

import { User } from "../types/user";

export type UserStore = {
  id: number;
  username: string;
  email: string;
  picture: string;
  admin: boolean;
  authorized: boolean;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  reset: () => void;
};

export const userStore = create<UserStore>((set) => ({
  id: 0,
  username: "",
  email: "",
  picture: "",
  admin: false,
  authorized: false,
  isLoggedIn: false,
  setUser: (user: User) => set((state) => ({ ...user, isLoggedIn: true })),
  reset: () =>
    set({
      id: 0,
      username: "",
      email: "",
      picture: "",
      admin: false,
      authorized: false,
      isLoggedIn: false
    })
}));
