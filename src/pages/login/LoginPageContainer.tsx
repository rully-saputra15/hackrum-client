import { CredentialResponse } from "@react-oauth/google";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

import api from "../../http";

import LoginPage from "./LoginPage";
import { useMutation } from "react-query";
import { showErrorToast } from "../../utils/toast";

const LoginPageContainer = () => {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation(api.login, {
    onSuccess: ({ data }) => {
      Cookies.set("access_token", data.message.access_token);
      Cookies.set("role", data.message.role);
      navigate("/dashboard");
    },
    onError: ({ response }) => {
      if (response.status === 429) {
        showErrorToast(response?.data);
      } else {
        showErrorToast(response?.data?.message);
      }
    },
  });
  const handleLoginSuccess = useCallback(
    async (credential: CredentialResponse) => {
      login(credential.credential as string);
    },
    []
  );

  const handleLoginError = useCallback(() => {
    console.log("login error");
  }, []);

  return (
    <LoginPage
      isLoading={isLoading}
      handleLoginSuccess={handleLoginSuccess}
      handleLoginError={handleLoginError}
    />
  );
};

export default LoginPageContainer;
