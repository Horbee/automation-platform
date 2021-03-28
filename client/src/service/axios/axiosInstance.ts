import axios from "axios";

import { handleErrorResponse } from "./handleErrorResponse";
import { handleRequest } from "./handleRequest";

export const instance = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.response.use((response) => response, handleErrorResponse);

instance.interceptors.request.use(handleRequest, (error) =>
  Promise.reject(error)
);

export const axiosInstance = instance;
