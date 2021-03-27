import React from "react";
import { useGoogleLogout } from "react-google-login";

import { userStore } from "../stores/userStore";

export const LogoutButton = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? "";
  const reset = userStore((state) => state.reset);

  const { signOut } = useGoogleLogout({
    onLogoutSuccess: reset,
    onFailure: () => console.log("Logout error"),
    clientId
  });

  return <button onClick={signOut}>Logout</button>;
};
