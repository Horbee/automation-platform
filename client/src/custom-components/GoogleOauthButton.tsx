import React, { useState } from "react";
import {
    GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin
} from "react-google-login";

import { Button } from "@chakra-ui/react";

import { AuthEndpoints } from "../api/auth";
import { AppConfig } from "../constants/config";
import { useAuthService } from "../service/useAuthService";

type LoadingText = "Initializing" | "Signing In";

export const GoogleOauthButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState<LoadingText>("Initializing");
  const { logUserIn } = useAuthService();

  const loginToAPI = async (
    googleResponse: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    try {
      setLoadingText("Signing In");
      setIsLoading(true);
      const idToken = (googleResponse as GoogleLoginResponse).tokenObj.id_token;
      const data = await AuthEndpoints.login(idToken);
      logUserIn(data, idToken);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const { signIn } = useGoogleLogin({
    onSuccess: loginToAPI,
    onFailure: (error) => console.log(error),
    onAutoLoadFinished: () => setIsLoading(false),
    clientId: AppConfig.clientId,
    isSignedIn: true,
    accessType: "offline",
    cookiePolicy: "single_host_origin"
  });

  return (
    <Button
      isLoading={isLoading}
      loadingText={loadingText}
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
