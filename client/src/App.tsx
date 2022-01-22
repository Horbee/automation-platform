import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

import { AuthEndpoints } from "./api/auth";
import { auth } from "./constants/config";
import { Routes } from "./constants/routes";
import { ConditionalRoute } from "./custom-components/ConditionalRoute";
import {
    ConfirmationDialogProvider
} from "./custom-components/confirmation-dialog/ConfirmationDialogProvider";
import { LoadingWrapper } from "./custom-components/LoadingWrapper";
import { AdminPage } from "./routes/admin/AdminPage";
import { HomePage } from "./routes/home/HomePage";
import { LoginPage } from "./routes/login/LoginPage";
import { axiosInstance } from "./service/axios/axiosInstance";
import { useAuthService } from "./service/useAuthService";

function App() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, logUserIn, admin } = useAuthService();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${idToken}`;
          const data = await AuthEndpoints.login(idToken);
          logUserIn(data);
        } catch (err) {
          console.log(err);
          toast({
            title: "Auth Error",
            description: "Unable to authenticate",
          });
        }
      } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
      }
      setLoading(false);
    });
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
