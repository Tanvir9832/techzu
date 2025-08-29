import axios from "axios";

const TOKEN_KEY = "techzu_access_token";
const apiBaseUrl = import.meta.env.VITE_API_URL_BASE_URL;


export const setAccessToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearAccessToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
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
          `${apiBaseUrl}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
        // Clear token on refresh failure
        clearAccessToken();
        // Redirect to login if needed
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
