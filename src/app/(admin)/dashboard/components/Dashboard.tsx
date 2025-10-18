"use client";
import React from "react";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="flex-1 flex flex-col">
      <Header name="dashboard" />
      <main className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Welcome Back 👋
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="text-gray-600 font-medium">Total Users</h4>
            <p className="text-3xl font-bold text-blue-600 mt-2">1,240</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="text-gray-600 font-medium">Revenue</h4>
            <p className="text-3xl font-bold text-green-600 mt-2">$8,430</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="text-gray-600 font-medium">Active Sessions</h4>
            <p className="text-3xl font-bold text-orange-600 mt-2">57</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
