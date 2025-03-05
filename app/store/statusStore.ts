import { create } from "zustand";

type statusStore = {
  isLoading: boolean;
  setIsLoading: (isLoaded: boolean) => void;
};

const useStore = create<statusStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading: isLoading }),
}));
