import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔐 Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = "Bearer " + token;
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
        const res = await axios.post("http://localhost:5000/api/auth/refresh", {
          refreshToken,
        });

        localStorage.setItem("token", res.data.accessToken);

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
