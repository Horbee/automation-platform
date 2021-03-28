import { AxiosRequestConfig } from "axios";

import { LocalStorage } from "../../types/localstorage";

// methods will be called before each request
export const handleRequest = (config: AxiosRequestConfig) => {
  setAuthorizationHeader(config);
  return config;
};

// get token from LS
const setAuthorizationHeader = (config: AxiosRequestConfig) => {
  const idToken = localStorage.getItem(LocalStorage.IdToken);
  if (localStorage.getItem(LocalStorage.IdToken)) {
    config.headers.Authorization = `Bearer ${idToken}`;
  } else {
    console.warn(
      "Unable to read token from localstorage. Authorization header will not be set."
    );
  }
};
