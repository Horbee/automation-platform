import axios from "axios";
import React from "react";
import {
    GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin
} from "react-google-login";

import { Button } from "@chakra-ui/react";

import { userStore } from "../stores/userStore";
import { LoginResponse } from "../types/loginresponse";

export const GoogleOauthButton: React.FC = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? "";
  const setUser = userStore((state) => state.setUser);

  const loginToAPI = async (
    googleResponse: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const idToken = (googleResponse as GoogleLoginResponse).tokenObj.id_token;

    console.log("token", idToken);

    const { data } = await axios.post<LoginResponse>(
      "http://localhost:5000/api/login",
      {
        idToken
      }
    );

    setUser({
      id: data.id,
      username: data.name,
      email: data.email,
      picture: data.profile_pic,
      admin: data.admin,
      authorized: data.authorized
    });
  };

  const { signIn } = useGoogleLogin({
    onSuccess: loginToAPI,
    onFailure: (error) => console.log(error),
    clientId,
    isSignedIn: true,
    accessType: "offline"
  });

  return (
    <Button
      leftIcon={<i className="fab fa-google"></i>}
      iconSpacing="4"
      w={["100%", "50%"]}
      alignSelf="center"
      colorScheme="red"
      variant="solid"
      onClick={signIn}
    >
      Sign In
    </Button>
  );
};
