"use client";

import { UserButton } from "@stackframe/stack";
import React from "react";

const Header = ({ name = "Dashboard" }: { name: string }) => {
  return (
    <React.Fragment>
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 uppercase">
          {name}
        </h2>
        <div className="flex items-center gap-3">
          {/* <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          /> */}
          <UserButton showUserInfo />
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
