import React from "react";

import {
  HomeIcon,
  Cog6ToothIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router";
import { SuperAdminSidebar } from "./SuperAdminSidebar";
import { SenderSidebar } from "./SenderSidebar";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { DeliveryManSidebar } from "./DeliveryManSidebar";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
import { LogInIcon, LogOutIcon } from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    toast.success("Logout");
    navigate("/");
  };
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <UsersIcon
          className={`h-8 w-8 text-blue-400 transition-transform duration-300 ${
            isSidebarOpen ? "rotate-0" : "rotate-12"
          }`}
        />
        <h1
          className={`text-2xl font-bold ml-2 transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          Dashboard
        </h1>
      </div>

      <nav className="flex-grow p-4">
        <ul>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >
              <HomeIcon className="h-6 w-6" />
              <Link
                to={"/"}
                className={`ml-4 transition-opacity ${
                  !isSidebarOpen && "opacity-0 hidden"
                }`}
              >
                Home
              </Link>
            </a>
          </li>

          {data?.data?.role === "SUPER_ADMIN" ? (
            <><SuperAdminSidebar isSidebarOpen={isSidebarOpen} /> <SenderSidebar isSidebarOpen={isSidebarOpen} /> <DeliveryManSidebar isSidebarOpen={isSidebarOpen} /></>
          ) : data?.data?.role === "SENDER" ? (
            <SenderSidebar isSidebarOpen={isSidebarOpen} />
          ) : data?.data?.role === "RECEIVER" ? (
            <DeliveryManSidebar isSidebarOpen={isSidebarOpen} />
          ) : (
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center p-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              >
                <Cog6ToothIcon className="h-6 w-6" />
                <span
                  className={`ml-4 transition-opacity ${
                    !isSidebarOpen && "opacity-0 hidden"
                  }`}
                >
                  Settings
                </span>
              </a>
            </li>
          )}

          {/* <SenderSidebar isSidebarOpen={isSidebarOpen} /> */}
        </ul>
      </nav>

      <div
        className={`p-4 border-t border-gray-700 ${!isSidebarOpen && "px-2"}`}
      >
        <ul>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 text-  hover:text-white"
            >
              {data?.data?.email ? (
                <span onClick={handleLogout} className="flex w-full">
                  <LogOutIcon className="h-6 w-6" />
              <button
                
                className={`ml-4 transition-opacity  ${
                  !isSidebarOpen && "opacity-0 hidden"
                }`}
              >
                Logout
              </button>
                </span>
              ) : (
                <Link to={'/register'} className="flex w-full">
                  <LogInIcon className="h-6 w-6" />
              <button
                onClick={handleLogout}
                className={`ml-4 transition-opacity  ${
                  !isSidebarOpen && "opacity-0 hidden"
                }`}
              >
                Login
              </button>
                </Link>
              )}
              
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
