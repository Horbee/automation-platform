import shallow from "zustand/shallow";

import { userStore } from "../stores/userStore";

export const useAuthService = () => {
  const { isLoggedIn, setUser, reset } = userStore(
    (state) => ({
      isLoggedIn: state.isLoggedIn,
      setUser: state.setUser,
      reset: state.reset
    }),
    shallow
  );

  return {
    isLoggedIn
  };
};
