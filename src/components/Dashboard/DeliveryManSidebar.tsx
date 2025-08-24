import { UsersIcon } from "@heroicons/react/24/outline";
import { ShieldPlus } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

interface RSProps {
  isSidebarOpen: ReactNode;
}

export const DeliveryManSidebar: React.FC<RSProps> = ({ isSidebarOpen }) => {
  return (
    <>
      <li className="mb-4">
        <a
          className="flex items-center p-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          <ShieldPlus className="h-6 w-6" />
          <Link
            to={"my-task"}
            className={`ml-4 transition-opacity ${
              !isSidebarOpen && "opacity-0 hidden"
            }`}
          >
            My Tasks
          </Link>
        </a>
      </li>

      <li className="mb-4">
        <a
          className="flex items-center p-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          <UsersIcon className="h-6 w-6" />
          <Link
            to={"shipment-history"}
            className={`ml-4 transition-opacity ${
              !isSidebarOpen && "opacity-0 hidden"
            }`}
          >
            Shipment History
          </Link>
        </a>
      </li>
      
    </>
  );
}
