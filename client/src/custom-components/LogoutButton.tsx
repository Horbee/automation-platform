import React from "react";
import { useGoogleLogout } from "react-google-login";

import { AppConfig } from "../constants/config";
import { useAuthService } from "../service/useAuthService";

export const LogoutButton = () => {
  const { logUserOut } = useAuthService();

  const { signOut } = useGoogleLogout({
    onLogoutSuccess: logUserOut,
    onFailure: () => console.log("Logout error"),
    clientId: AppConfig.clientId
  });

  return <button onClick={signOut}>Logout</button>;
};
