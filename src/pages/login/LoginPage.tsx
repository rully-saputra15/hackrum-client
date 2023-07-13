import { FC } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Loading from "../../components/Loading";

type LoginPageProps = {
  isLoading: boolean;
  handleLoginSuccess: (credential: CredentialResponse) => void;
  handleLoginError: () => void;
};

const LoginPage: FC<LoginPageProps> = ({
  isLoading,
  handleLoginSuccess,
  handleLoginError,
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-3">
      <span className="font-bold text-4xl">Hackrum</span>
      <img
        src="https://academic.hacktiv8.com/static/media/hacktiv-navbar.35edca5f.png"
        className="w-auto h-10 aspect-auto"
      />
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />

      {isLoading && <Loading />}

      <span className="absolute bottom-3 font-light">
        Created by Rully Saputra
      </span>
    </div>
  );
};

export default LoginPage;
