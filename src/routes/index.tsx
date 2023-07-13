import { createBrowserRouter } from "react-router-dom";
import LoginPageContainer from "../pages/login/LoginPageContainer";
import App from "../App";
import DashboardPageContainer from "../pages/dashboard/DashboardPageContainer";
import NavigationGuard from "./NavigatonGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <NavigationGuard to="login">
            <LoginPageContainer />
          </NavigationGuard>
        ),
      },
      {
        path: "dashboard",
        element: (
          <NavigationGuard to="dashboard">
            <DashboardPageContainer />
          </NavigationGuard>
        ),
      },
    ],
  },
]);

export default router;
