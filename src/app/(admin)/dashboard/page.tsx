import React from "react";
import Dashboard from "./components/Dashboard";

const DashboardPage = async () => {
  return (
    <React.Fragment>
      <main className="w-full ">
        <Dashboard />
      </main>
    </React.Fragment>
  );
};

export default DashboardPage;
