import { signOut } from "firebase/auth";
import shallow from "zustand/shallow";

import { useToast } from "@chakra-ui/react";

import { auth } from "../constants/config";
import { userStore } from "../stores/userStore";
import { UserModel } from "../types/user-model";

export const useAuthService = () => {
  const toast = useToast();

  const { isLoggedIn, setUser, reset, admin } = userStore(
    (state) => ({
      isLoggedIn: state.isLoggedIn,
      admin: state.admin,
      setUser: state.setUser,
      reset: state.reset,
    }),
    shallow
  );

  const logUserIn = (loginResponse: UserModel) => {
    setUser({
      id: loginResponse.id,
      username: loginResponse.name,
      email: loginResponse.email,
      picture: loginResponse.profile_pic,
      admin: loginResponse.is_admin,
      authorized: loginResponse.is_authorized,
    });
  };

  const logUserOut = async () => {
    try {
      await signOut(auth);
      reset();
    } catch (err) {
      console.log(err);
      toast({
        title: "Error while sign out",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return {
    isLoggedIn,
    admin,
    logUserIn,
    logUserOut,
  };
};
