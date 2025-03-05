import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
