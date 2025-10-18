"use client";

import Link from "next/link";
import React, { useState } from "react";

const TestDashboardPage = () => {
  return (
    <React.Fragment>
      <div className="dashboard flex min-h-screen">
        <SideBar />
        <MianContext />
      </div>
    </React.Fragment>
  );
};

export default TestDashboardPage;

export async function SideBar() {
  const [isOpen, setOpen] = useState<boolean>(true);
  return (
    <>
      <div
        className={` ${
          isOpen ? "w-64" : "w-24"
        } sidebar text-black bg-indigo-100 flex flex-col justify-between items-center py-3 transition-all duration-200`}
      >
        <div className="flex flex-col justify-around gap-4">
          <div className="flex justify-between items-center gap-5">
            <p>LOGO</p>
            <button onClick={() => setOpen((prev) => !prev)}>➕</button>
          </div>
          <ul className="flex flex-col justify-around space-y-3 ">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <Link href={"/sign-out"}>Logout</Link>
      </div>
    </>
  );
}

export async function MianContext() {
  return (
    <>
      <div className="main flex-1 bg-red-50"></div>
    </>
  );
}
