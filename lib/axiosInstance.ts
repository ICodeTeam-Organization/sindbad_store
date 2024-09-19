import axios from "axios";

// إنشاء instance من axios مع الإعدادات الافتراضية
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
