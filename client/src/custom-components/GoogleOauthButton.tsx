import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";

import { Button } from "@chakra-ui/react";

import { auth, provider } from "../constants/config";

export const GoogleOauthButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      isLoading={isLoading}
      loadingText="Signing In"
      leftIcon={<i className="fab fa-google"></i>}
      iconSpacing="4"
      w={["100%", "50%"]}
      alignSelf="center"
      colorScheme="red"
      variant="solid"
      onClick={startLogin}
    >
      Sign In
    </Button>
  );
};
