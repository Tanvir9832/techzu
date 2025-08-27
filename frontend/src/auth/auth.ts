import axios from "axios";

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

const api = axios.create({
  baseURL: "http://localhost:4000", 
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:4000/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
