import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import api from "../utils/api";

type userStore = {
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

const userStore = create(
  persist<userStore>(
    (set) => ({
      user: "",
      isLogged: false,
      sessionChecked: false,
      
      setIsLogged: (isLogged) => set({ isLogged }),
      setUser: (user) => set({ user }),

      // 기존 함수들 그대로 유지
      register: async (userId, password, confirmPassword, name, email) => {
        try {
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

      login: async (userId, password) => {
        try {
          const response = await api.post("/auth/login", { userId, password });

          if (response.status !== 200) {
            throw new Error(response.data?.error || "로그인 실패");
          }

          set({
            isLogged: true,
            user: userId,
          });
          
          return response.data;
        } catch (error: any) {
          return error;
        }
      },

      logout: async () => {
        try {
          const response = await api.post("/auth/logout");
          
          if (response.status === 200) {
            // 상태 초기화 및 스토리지 지우기
            set({ isLogged: false, user: "" });
            userStore.persist.clearStorage();
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

          if (response.status === 200) {
            set({
              sessionChecked: true,
              isLogged: true, 
              user: response.data.userId 
            });
          }
        } catch (error: any) {
          if(error.response.data.statusCode === 401) {
            set({
              isLogged: false, 
              sessionChecked: true,
              user: ""
            });
            // 세션 체크 실패 시 스토리지 초기화
            userStore.persist.clearStorage();
          }
          return error.response.data;
        }
      },
    }),
    {
      name: "user", // localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// 외부에서 스토리지 지우기 메서드 추가
export const clearUserStorage = () => {
  userStore.persist.clearStorage();
};

export default userStore;