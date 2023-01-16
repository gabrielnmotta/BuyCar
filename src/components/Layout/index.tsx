import React from "react";
import UserAccess from "../../pages/userAccess";
import Header from "./Header";
import SideBar from "./SideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <SideBar />
        <div className="flex-1 h-full overflow-y-auto p-8 bg-neutral-0 flex flex-col gap-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
