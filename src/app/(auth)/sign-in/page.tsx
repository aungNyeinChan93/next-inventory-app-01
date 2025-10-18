import { SignIn } from "@stackframe/stack";
import React from "react";

const SignInPage = async () => {
  return (
    <React.Fragment>
      <main className="w-full bg-cyan-950 min-h-screen flex justify-center items-center">
        <div className="w-full max-w-xl flex justify-center shadow-md p-10 shadow-amber-400 rounded-2xl ">
          <SignIn />
        </div>
      </main>
    </React.Fragment>
  );
};

export default SignInPage;
