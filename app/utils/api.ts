import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  withCredentials: true, // 쿠키를 포함시키는 것 외에도 세션 토큰을 헤더에 추가할 수 있습니다.
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${sessionStorage.getItem("session")}`, // 세션 토큰을 Authorization 헤더에 추가
  },
});

export default api;