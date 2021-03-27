import "./App.css";

import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Routes } from "./constants/routes";
import { ConditionalRoute } from "./custom-components/ConditionalRoute";
import { HomePage } from "./routes/home/HomePage";
import { LoginPage } from "./routes/login/LoginPage";
import { userStore } from "./stores/userStore";

function App() {
  const isLoggedIn = userStore((state) => state.isLoggedIn);

  return (
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
  );
}

export default App;
