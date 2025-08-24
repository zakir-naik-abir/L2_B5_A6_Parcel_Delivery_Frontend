import { UsersIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

interface SASProps {
  isSidebarOpen: ReactNode;
}

export const SuperAdminSidebar: React.FC<SASProps> = ({ isSidebarOpen }) => {
  return (
    <>
      <li className="mb-4">
        <a
          className="flex items-center p-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          <ChartBarIcon className="h-6 w-6" />
          <Link
            to={"analytics"}
            className={`ml-4 transition-opacity ${
              !isSidebarOpen && "opacity-0 hidden"
            }`}
          >
            Analytics
          </Link>
        </a>
      </li>

      <li className="mb-4">
        <a
          className="flex items-center p-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          <UsersIcon className="h-6 w-6" />
          <Link
            to={"all-user"}
            className={`ml-4 transition-opacity ${
              !isSidebarOpen && "opacity-0 hidden"
            }`}
          >
            User Management
          </Link>
        </a>
      </li>

      <li className="mb-4">
        <a
          className="flex items-center p-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          <UsersIcon className="h-6 w-6" />
          <Link
            to={"all-parcel"}
            className={`ml-4 transition-opacity ${
              !isSidebarOpen && "opacity-0 hidden"
            }`}
          >
            All Parcel
          </Link>
        </a>
      </li>
      
      {/* <li className="mb-4">
        <a
          className="flex items-center p-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          <UsersIcon className="h-6 w-6" />
          <Link
            to={"add-parcel"}
            className={`ml-4 transition-opacity ${
              !isSidebarOpen && "opacity-0 hidden"
            }`}
          >
            Add Parcel
          </Link>
        </a>
      </li> */}
      
    </>
  );
}
