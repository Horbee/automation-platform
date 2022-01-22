import axios from "axios";

import { handleErrorResponse } from "./handleErrorResponse";

export const instance = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.response.use((response) => response, handleErrorResponse);

export const axiosInstance = instance;
