import axios from "axios";
import { BASE_URL } from "constants/constants";
import Cookies from "js-cookie";

const baseUrl = `${BASE_URL}/api`;
const accessToken = localStorage.getItem("access_token");
const csrftoken = Cookies.get("csrftoken");

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  // timeout: 10000,

  headers: {
    Authorization: accessToken ? `JWT ` + accessToken : null,
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-CSRFToken": csrftoken,
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      // network error
      console.log("Error: Network Error");
    } else {
      const originalRequest = error.config;
      console.log(originalRequest);

      // Prevent infinite loops
      if (
        error.response.status === 401 &&
        originalRequest.url === `${BASE_URL}/api/auth/token/refresh/`
      ) {
        window.location.href = "/";
        return Promise.reject(error);
      }

      if (
        error.response.data.code === "token_not_valid" &&
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        const refreshToken = localStorage.getItem("refresh_token");
        console.log("trying to refresh token");

        if (refreshToken) {
          const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

          // exp date in token is expressed in seconds, while now() returns milliseconds:
          const now = Math.ceil(Date.now() / 1000);
          console.log(tokenParts.exp);

          if (tokenParts.exp > now) {
            console.log("refresshing token");
            return await axiosInstance
              .post("/auth/token/refresh/", { refresh: refreshToken })
              .then(async (response) => {
                await localStorage.setItem(
                  "access_token",
                  response.data.access
                );

                axiosInstance.defaults.headers["Authorization"] =
                  "JWT " + response.data.access;
                originalRequest.headers["Authorization"] =
                  "JWT " + response.data.access;

                return await axiosInstance(originalRequest);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log("Refresh token is expired", tokenParts.exp, now);
            window.location.href = "/";
          }
        } else {
          console.log("Refresh token not available.");
          window.location.href = "/";
        }
      }
    }
    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);
export const formTokenConfig = () => {
  const token = localStorage.getItem("access_token");
  // Headers
  let data = new FormData();
  const config = {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    },
  };
  if (token) {
    config.headers["Authorization"] = "JWT " + token;
  }
  return config;
};
export const tokenConfig = () => {
  const token = localStorage.getItem("access_token");
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = "JWT " + token;
  }
  return config;
};
export const googleAuthConfig = () => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  return config;
};
