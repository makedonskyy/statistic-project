import { IUser } from "@/lib/types";
import { create } from "zustand";

type Store = {
  authUser: IUser | null;
  setAuthUser: (user: IUser) => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
}));

export default useStore;
