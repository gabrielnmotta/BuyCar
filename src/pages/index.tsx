import type { NextPage } from "next";
import LoginForms from "../components/Login/Forms";
import Infos from "../components/Login/Infos";

const Login: NextPage = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="bg-neutral-0 flex h-full">
        <div className="w-5/12">
          <LoginForms />
        </div>
        <div className="w-7/12 h-full bg-primary-1300 bg-login-background bg-no-repeat bg-cover">
          <Infos />
        </div>
      </div>
      </div>
  );
};

export default Login;
