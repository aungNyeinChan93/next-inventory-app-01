"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Home, BarChart2, Users, Settings, LogOut, Menu } from "lucide-react";
import Link from "next/link";

const SidebarComponent = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const menus = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Analytics", icon: <BarChart2 size={20} />, path: "/analytics" },
    { name: "Users", icon: <Users size={20} />, path: "/dashboard/users" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];
  return (
    <React.Fragment>
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 p-5 flex flex-col justify-between transition-all duration-300`}
      >
        <div>
          <div className="flex items-center justify-between mb-6 ">
            <h1
              className={`text-lg font-bold text-blue-600 ${
                !isOpen && "hidden"
              }`}
            >
              Next Inventory App
            </h1>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-500 ms-1"
            >
              <Menu size={30} />
            </button>
          </div>

          <nav className="flex flex-col gap-3">
            {menus.map((menu, index) => (
              <Link
                href={menu.path}
                key={index}
                className={`${
                  menu.path === pathname ? "bg-indigo-100!" : null
                }   flex items-center gap-3 text-gray-700 hover:bg-blue-100 p-2 rounded-md transition-colors`}
              >
                {menu.icon}
                <span className={`${!isOpen && "hidden"} font-medium`}>
                  {menu.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <button className="flex items-center gap-3 text-gray-600 hover:text-red-500 transition-colors">
          <LogOut size={20} />
          <span className={`${!isOpen && "hidden"} font-medium`}>Logout</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default SidebarComponent;
