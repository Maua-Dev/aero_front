import axios, { AxiosError } from "axios";
import { environments } from "./environments";

export const userMss = axios.create({
  baseURL: environments.userMss,
  headers: {
    "Content-Type": "application/json",
  },
});
userMss.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(`Intercepted error: ${(error as AxiosError).message}`);
    return Promise.reject(error);
  },
);
