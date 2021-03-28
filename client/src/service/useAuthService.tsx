import shallow from "zustand/shallow";

import { userStore } from "../stores/userStore";
import { LocalStorage } from "../types/localstorage";
import { LoginResponse } from "../types/loginresponse";

export const useAuthService = () => {
  const { isLoggedIn, setUser, reset } = userStore(
    (state) => ({
      isLoggedIn: state.isLoggedIn,
      setUser: state.setUser,
      reset: state.reset
    }),
    shallow
  );

  const logUserIn = (loginResponse: LoginResponse, idToken: string) => {
    localStorage.setItem(LocalStorage.IdToken, idToken);

    setUser({
      id: loginResponse.id,
      username: loginResponse.name,
      email: loginResponse.email,
      picture: loginResponse.profile_pic,
      admin: loginResponse.admin,
      authorized: loginResponse.authorized
    });
  };

  const logUserOut = () => {
    reset();
    localStorage.removeItem(LocalStorage.IdToken);
  };

  return {
    isLoggedIn,
    logUserIn,
    logUserOut
  };
};
