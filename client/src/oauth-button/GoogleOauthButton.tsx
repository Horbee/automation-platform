import axios from "axios";
import React from "react";
import {
    GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin
} from "react-google-login";

export const GoogleOauthButton: React.FC = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? "";

  const googleLogin = async (
    googleResponse: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const idToken = (googleResponse as GoogleLoginResponse).tokenObj.id_token;
    const email = (googleResponse as GoogleLoginResponse).profileObj.email;
    const name = (googleResponse as GoogleLoginResponse).profileObj.name;

    console.log("token", idToken);

    const response = await axios.post("/api/oauth/google", {
      email,
      name,
      idToken
    });

    console.log(response.data);
  };

  const { signIn } = useGoogleLogin({
    onSuccess: googleLogin,
    onFailure: (error) => console.log(error),
    clientId,
    isSignedIn: true,
    accessType: "offline"
  });

  return <button onClick={signIn}>Login</button>;
};
