import shallow from "zustand/shallow";

import { userStore } from "../stores/userStore";
import { LocalStorage } from "../types/localstorage";
import { UserModel } from "../types/user-model";

export const useAuthService = () => {
  const { isLoggedIn, setUser, reset, admin } = userStore(
    (state) => ({
      isLoggedIn: state.isLoggedIn,
      admin: state.admin,
      setUser: state.setUser,
      reset: state.reset
    }),
    shallow
  );

  const logUserIn = (loginResponse: UserModel, idToken: string) => {
    localStorage.setItem(LocalStorage.IdToken, idToken);

    setUser({
      id: loginResponse.id,
      username: loginResponse.name,
      email: loginResponse.email,
      picture: loginResponse.profile_pic,
      admin: loginResponse.is_admin,
      authorized: loginResponse.is_authorized
    });
  };

  const logUserOut = () => {
    reset();
    localStorage.removeItem(LocalStorage.IdToken);
  };

  return {
    isLoggedIn,
    admin,
    logUserIn,
    logUserOut
  };
};
