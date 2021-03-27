import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface ConditionalRouteProps extends RouteProps {
  condition: boolean;
  redirectUrl: string;
}

export const ConditionalRoute: React.FC<ConditionalRouteProps> = ({
  component,
  condition,
  redirectUrl,
  ...options
}) => {
  return condition ? (
    <Route {...options} component={component} />
  ) : (
    <Redirect to={redirectUrl}></Redirect>
  );
};
