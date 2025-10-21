import { AccountSettings } from "@stackframe/stack";
import React from "react";
import Header from "../components/Header";

const SettingPage = async () => {
  return (
    <React.Fragment>
      <main className="w-full min-h-screen  mx-auto ">
        <Header name="Account Setting" />
        <div className="p-10">
          <AccountSettings />
        </div>
      </main>
    </React.Fragment>
  );
};

export default SettingPage;
