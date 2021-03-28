import "./App.css";

import jwt_decode from "jwt-decode";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { CS50AutomationAPI } from "./api/auth";
import { Routes } from "./constants/routes";
import { ConditionalRoute } from "./custom-components/ConditionalRoute";
import { LoadingWrapper } from "./custom-components/LoadingWrapper";
import { HomePage } from "./routes/home/HomePage";
import { LoginPage } from "./routes/login/LoginPage";
import { useAuthService } from "./service/useAuthService";
import { LocalStorage } from "./types/localstorage";
import { TokenPayload } from "./types/tokenpayload";

function App() {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, logUserIn } = useAuthService();

  useEffect(() => {
    const idToken = localStorage.getItem(LocalStorage.IdToken);
    if (idToken) {
      const decoded = jwt_decode<TokenPayload>(idToken);
      if (moment(decoded.exp) < moment()) {
        CS50AutomationAPI.login(idToken).then((data) => {
          logUserIn(data, idToken);
          setLoading(false);
        });
      }
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <LoadingWrapper loading={loading}>
      <Router>
        <Switch>
          <ConditionalRoute
            path={Routes.Home}
            exact
            condition={isLoggedIn}
            component={HomePage}
            redirectUrl={Routes.Login}
          />
          <ConditionalRoute
            path={Routes.Login}
            condition={!isLoggedIn}
            component={LoginPage}
            redirectUrl={Routes.Home}
          />
        </Switch>
      </Router>
    </LoadingWrapper>
  );
}

export default App;
