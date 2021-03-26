import "./App.css";

import queryString from "query-string";
import React from "react";

import logo from "./logo.svg";
import { GoogleOauthButton } from "./oauth-button/GoogleOauthButton";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? "";

function App() {
  const login = () => {
    const authorizationEndpoint =
      "https://accounts.google.com/o/oauth2/v2/auth";

    const query = {
      // scope: ["openid", "email", "profile"],
      scope: "openid+email+profile",
      redirect_uri: "http://localhost:3000/login/callback",
      client_id: clientId,
      response_type: "code"
    };

    const url = `${authorizationEndpoint}?${queryString.stringify(query, {
      arrayFormat: "comma"
    })}`;
    console.log(url);
    window.location.href = url;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <GoogleOauthButton />
        <button onClick={login}>Test</button>
      </header>
    </div>
  );
}

export default App;
