import { useRouter } from "next/router";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import { api, returnHeaders } from "../../api/api";
import { AuthI, LoginI, AuthContextI, HeaderI, LoginStepI } from "./type";

const AuthContext = createContext<AuthContextI>({
  auth: false,
  handleLogin: () => {},
  handleLogout: () => {},
  loading: false,
  header: {
    headerType: "main",
  },
  setHeader: () => {},
  loginStep: "LOGIN",
  setLoginStep: () => {},
  forgotPassword: () => null,
  resetPassword: () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [header, setHeader] = useState<HeaderI>({
    headerType: "main",
  });
  const [loginStep, setLoginStep] = useState<LoginStepI>("LOGIN");

  const handleLogin = (payload: LoginI) => {
    setLoading(true);
    api
      .post("/authentication/sign_in", {
        username: payload.username,
        password: payload.password,
      })
      .then((res) => {
        if (res.status) {
          localStorage.setItem("token", res.data.token);
          toast.success("Acesso autorizado");
          setAuth(true);
          setLoading(false);
          setHeader({ headerType: "main" });
          router.push("/agenda");
          // getUserData();
        }
      })
      .catch((err) => {
        if (err.response.data === "Locked") {
          setLoginStep("REDEFINE_PASSWORD");
        } else {
          toast.error("Usuário ou senha inválidos");
        }
        setLoading(false);
      });
  };

  const handleLogout = () => {
    setAuth(false);
    localStorage.clear();
    router.push("/");
  };

  const forgotPassword = (username: string, email: string) => {
    setLoading(true);
    api
      .post("/authentication/sign_in/recover", { username, email })
      .then((res) => {
        if (res.status == 200) {
          setLoginStep("EMAIL_SENT");
          setLoading(false);
          toast.success("Email enviado com sucesso");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast("Conta não encontrada", { type: "error" });
      });
  };

  const resetPassword = (
    username: string,
    oldPassword: string,
    newPassword: string
  ) => {
    setLoading(true);
    api
      .post("/authentication/sign_in/reset", {
        username,
        oldPassword,
        newPassword,
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setLoginStep("REDEFINE_SUCCESS");
        }
      })
      .catch((err) => {
        toast.error("Erro ao redefinir senha, tente novamente");
        setLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        auth,
        loading,
        header,
        setHeader,
        loginStep,
        setLoginStep,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext(): AuthContextI {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAccess must be used within a AccessProvider");
  }

  return context;
}
