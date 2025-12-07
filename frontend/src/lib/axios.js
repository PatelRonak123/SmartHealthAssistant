import axios from "axios";

export const axiosInstance = axios.create({
  // Use API base URL from env; fall back to the hosted backend. Avoid " / " so prod doesn't hit the static Vercel site.
  baseURL:
    import.meta.env.VITE_API_BASE_URL?.trim().length
      ? import.meta.env.VITE_API_BASE_URL
      : "https://smarthealthassistant-2.onrender.com/api/v1",
  withCredentials: true,
});
