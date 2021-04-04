import React from "react";
import {
    GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin
} from "react-google-login";

import { Button } from "@chakra-ui/react";

import { AuthEndpoints } from "../api/auth";
import { AppConfig } from "../constants/config";
import { useAuthService } from "../service/useAuthService";

export const GoogleOauthButton: React.FC = () => {
  const { logUserIn } = useAuthService();
  const loginToAPI = async (
    googleResponse: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const idToken = (googleResponse as GoogleLoginResponse).tokenObj.id_token;
    const data = await AuthEndpoints.login(idToken);
    logUserIn(data, idToken);
  };

  const { signIn } = useGoogleLogin({
    onSuccess: loginToAPI,
    onFailure: (error) => console.log(error),
    clientId: AppConfig.clientId,
    isSignedIn: true,
    accessType: "offline",
    cookiePolicy: "single_host_origin"
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
