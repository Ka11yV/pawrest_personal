import { create } from "zustand";

type ErrorStore = {
  error: string;
  setError: (error: string) => void;
  clearError: () => void;
};

const errorStore = create<ErrorStore>((set) => ({
  error: "",
  setError: (error: string) => set(() => ({ error: error })),
  clearError: () => set(() => ({ error: "" })),
}));

export default errorStore;
