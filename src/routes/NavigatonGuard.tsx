import Cookies from "js-cookie";
import { FC } from "react";
import { Navigate } from "react-router";

type NavigationGuardProps = {
  children: JSX.Element | JSX.Element[];
  to: string;
};
const NavigationGuard: FC<NavigationGuardProps> = ({ children, to }) => {
  const isAuthenticated = Cookies.get("access_token");
  if (isAuthenticated && to === "login") {
    return <Navigate to="/dashboard" />;
  } else if (!isAuthenticated && to !== "login") {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default NavigationGuard;
