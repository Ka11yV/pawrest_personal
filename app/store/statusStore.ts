import { create } from "zustand";

export type statusStore = {
  isLoading: boolean;
  setIsLoading: (isLoaded: boolean) => void;
};

const statusStore = create<statusStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading: isLoading }),
}));

export default statusStore;
