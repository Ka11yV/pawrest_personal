import { create } from "zustand";

type ErrorStore = {
  error: string;
  setError: (error: string) => void;
  clearError: () => void;
};

const errorStore = create((set) => ({
  error: "",
  setError: (error: string) => set(() => ({ error: error })),
  clearError: () => set(() => ({ error: null })),
}));

export default errorStore;
