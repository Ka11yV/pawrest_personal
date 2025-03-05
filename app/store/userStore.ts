import { create } from "zustand";
import api from "../utils/api";
import errorStore from "./errorStore";

type Store = {
  user: string;
  isLogged: boolean;
  sessionChecked: boolean;
  setIsLogged: (isLogged: boolean) => void;
  setUser: (user: string) => void;
  register: (
    userId: string,
    password: string,
    confirmPassword: string,
    name: string,
    email: string
  ) => Promise<any>;
  login: (userId: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  checkSession: () => Promise<any>;
};

const userStore = create<Store>((set) => ({
  user: "",
  isLogged: false,
  setIsLogged: (isLogged) => set({ isLogged }),
  setUser: (user) => set({ user }),
  sessionChecked: false,

  // 회원가입 함수
  register: async (userId, password, confirmPassword, name, email) => {
    try {
      // 비밀번호 확인
      if (password !== confirmPassword) {
        return { error: "비밀번호가 일치하지 않습니다." };
      }

      const response = await api.post("/auth/signup", {
        userId,
        password,
        name,
        email,
      });

      if (response.status !== 200) {
        throw new Error(response.data?.error || "회원가입 실패");
      }

      return response.data;
    } catch (error: any) {
      console.error(error.message || error);
      return { error: error.message || "회원가입 실패" };
    }
  },

  // 로그인 함수
  login: async (userId, password) => {
    try {
      const response = await api.post("/auth/login", { userId, password });

      if (response.status !== 200) {
        throw new Error(response.data?.error || "로그인 실패");
      }

      localStorage.setItem("userId", userId);

      // 로그인 성공 시 상태 업데이트
      set({
        isLogged: true,
        user: userId,
      });
      return response.data; // 로그인 성공 시 서버 응답 반환
    } catch (error: any) {
      return error;
    }
  },

  // 로그아웃 함수
  logout: async () => {
    try {
      const response = await api.post("/auth/logout");

      if (response.status === 200) {
        localStorage.removeItem("userId");
        set({ isLogged: false, user: "" });
        return response;
      } else {
        throw new Error(response.data?.error);
      }
    } catch (error: any) {
      return error;
    }
  },

  checkSession: async () => {
    try {
      const response = await api.get("/auth/session");
      set({ sessionChecked: true });
      if (response.status === 200) {
        set({ isLogged: true, user: response.data.userId });
      } else {
        set({ isLogged: false, user: "" });
      }
    } catch (error: any) {
      return error;
    }
  },
}));

export default userStore;
