import axios from "axios";

// 🔥 ENV BASE URL
const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API}/api`,
});

// 🔐 Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  // 🔥 VERY IMPORTANT FIX
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

// 🔄 Auto refresh
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const res = await axios.post(
          `${API}/api/auth/refresh`, // ✅ FIXED
          {
            refreshToken,
          },
        );

        localStorage.setItem("accessToken", res.data.accessToken);

        originalRequest.headers.Authorization =
          "Bearer " + res.data.accessToken;

        return api(originalRequest);
      } catch (error) {
        localStorage.clear();
        window.location.href = "/admin";
      }
    }

    return Promise.reject(err);
  },
);

export default api;
