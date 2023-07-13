import { CredentialResponse } from "@react-oauth/google";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";

import api from "../../http";

import LoginPage from "./LoginPage";
import { useMutation } from "react-query";

const LoginPageContainer = () => {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation(api.login, {
    onSuccess: ({ data }) => {
      Cookies.set("access_token", data.message.access_token);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log(err);
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
