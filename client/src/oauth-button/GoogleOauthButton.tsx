import axios from "axios";
import React from "react";
import {
    GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin, useGoogleLogout
} from "react-google-login";

export const GoogleOauthButton: React.FC = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? "";

  const loginToAPI = async (
    googleResponse: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const idToken = (googleResponse as GoogleLoginResponse).tokenObj.id_token;
    const email = (googleResponse as GoogleLoginResponse).profileObj.email;
    const name = (googleResponse as GoogleLoginResponse).profileObj.name;

    console.log("token", idToken);

    const response = await axios.post("http://localhost:5000/api/login", {
      email,
      name,
      idToken
    });

    console.log(response.data);
  };

  const { signIn } = useGoogleLogin({
    onSuccess: loginToAPI,
    onFailure: (error) => console.log(error),
    clientId,
    isSignedIn: true,
    accessType: "offline"
  });

  const { signOut } = useGoogleLogout({
    onLogoutSuccess: () => console.log("Logout successful"),
    onFailure: () => console.log("Logout error"),
    clientId
  });

  return (
    <>
      <button onClick={signIn}>Login</button>
      <button onClick={signOut}>Logout</button>
    </>
  );
};
