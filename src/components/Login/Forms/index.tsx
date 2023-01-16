import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../../FormsComponents/Input";
import Button from "../../FormsComponents/Button";
import Lottie from "lottie-react-web";
import Loading from "../../gifs/loading.json";
import { useCustomerProvider } from "../../../services/ContextAuth";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../services/firebaseConfig";
import { ArrowRight } from "iconsax-react";

const LoginForms = () => {

  const { email, password, setEmail, setPassword, setUser, loading, Auth } = useCustomerProvider();
  const router = useRouter();
  useEffect(() => {
      const AuthCheck = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(true);
          toast.success("Acesso autorizado");
          router.push("/userAccess");
        }
      });
      return () => AuthCheck();
    }, [router, setUser]);

  const login = useCallback((e:any) => {
      e.preventDefault();
      Auth(email, password);
  }, [Auth, email, password]);

  return (
    <div>
      <div className="h-full flex flex-col w-4/6 mx-auto py-16 gap-8 justify-between">
        <div className="w-2/5 h-auto">
          <img src="/Login/logo.png" alt="Logo" />
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-5   "
          >
            <div className="mb-8">
              <p className="text-title3 mb-4">Seja bem vindo!</p>
              <p className="text-body leading-5">
                Preencha os dados de login abaixo para acessar a plataforma.
              </p>
            </div>

            <form className="flex flex-col gap-5 ">
              <Input
                label="Email:"
                placeholder="Insira seu email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                value={password}
                label="Senha:"
                placeholder="Insira sua senha"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(key) => {
                  if (key.key === "Enter") login;
                }}
              />
            </form>

            <Button
              title={loading ? "" : "Entrar"}
              containerStyle="self-start w-1/2 mt-8 h-12"
              onClick={login}
              onKeyPress={(key) => {
                if (key.key === "Enter") login;
              }}
              size="large"
            >
              {loading ? (
                <div className="h-fit">
                  <Lottie
                    options={{ animationData: Loading }}
                    style={{ width: "25%" }}
                  />
                </div>
              ) : (
                <ArrowRight />
              )}
            </Button>
          </motion.div>
        </AnimatePresence>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForms;