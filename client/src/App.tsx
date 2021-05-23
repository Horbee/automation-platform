import jwt_decode from "jwt-decode";
import moment from "moment";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { AuthEndpoints } from "./api/auth";
import { Routes } from "./constants/routes";
import { ConditionalRoute } from "./custom-components/ConditionalRoute";
import {
    ConfirmationDialogProvider
} from "./custom-components/confirmation-dialog/ConfirmationDialogProvider";
import { LoadingWrapper } from "./custom-components/LoadingWrapper";
import { AdminPage } from "./routes/admin/AdminPage";
import { HomePage } from "./routes/home/HomePage";
import { LoginPage } from "./routes/login/LoginPage";
import { useAuthService } from "./service/useAuthService";
import { LocalStorage } from "./types/localstorage";
import { TokenPayload } from "./types/tokenpayload";

function App() {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, logUserIn, admin } = useAuthService();

  useEffect(() => {
    const idToken = localStorage.getItem(LocalStorage.IdToken);
    if (idToken) {
      const decoded = jwt_decode<TokenPayload>(idToken);
      if (moment(decoded.exp * 1000) > moment()) {
        AuthEndpoints.login(idToken)
          .then((data) => {
            logUserIn(data, idToken);
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <ConfirmationDialogProvider>
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
              path={Routes.Admin}
              exact
              condition={admin}
              component={AdminPage}
              redirectUrl={Routes.Home}
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
    </ConfirmationDialogProvider>
  );
}

export default App;
