import React, { ReactNode } from "react";
import SidebarComponent from "./components/Sidebar";
import Header from "./components/Header";

const DashbaordLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <React.Fragment>
      <main className="flex min-h-screen bg-gray-100">
        <SidebarComponent />
        <div className="flex min-h-screen bg-gray-100 w-full text-slate-600">
          <main className="w-full">{children}</main>
        </div>
      </main>
    </React.Fragment>
  );
};

export default DashbaordLayout;
