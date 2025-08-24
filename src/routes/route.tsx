import App from "@/App";
import AboutPage from "@/pages/About";
import AllParcel from "@/pages/Admin/AllParcel";
import { Analytics } from "@/pages/Admin/Analytics";
import Contact from "@/pages/Contact";
import HomePage from "@/pages/HomePage";
import { Register } from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute";
import { DashboardContent } from "@/dashboards/DashboardContent";
import MyTasksPage from "@/pages/DeliveryMan/MytaskPage";
import CreateParcelPage from "@/pages/Sender/CreateParcelPage";
import ManageUsersPage from "@/pages/Admin/ManageUsersPage";
import ShipmentHistoryPage from "@/pages/DeliveryMan/ShipmentHistoryPage";
import TrackParcelPage from "@/pages/TrackParcelPage";
import TrackingPage from "@/pages/Trakingpage";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: AboutPage,
        path: "about",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: Verify,
        path: "verify",
      },
      {
        Component: TrackParcelPage,
        path: "track-parcel",
      },
      {
        Component: TrackingPage,
        path: "track/:trackingId",
      },
    ],
  },
  {
    Component: Register,
    path: "/register",
  },

  // dashboard route
  {
    path: "/dashboard",
    element: <PrivateRoute/>,
    children: [
      {
        Component: DashboardContent,
        children: [
          // admin
          {
            index: true,
            element: <Analytics />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            Component: ManageUsersPage,
            path: "all-user",
          },
          {
            Component: AllParcel,
            path: "all-parcel",
          },

          // sender
          {
            Component: AllParcel,
            path: "my-parcel",
          },
          {
            Component: CreateParcelPage,
            path: "create-parcel",
          },
          
          // delivery man
          {
            Component: MyTasksPage,
            path: "my-task",
          },
          {
            Component: ShipmentHistoryPage,
            path: 'shipment-history'
          }
        ],
      },
    ],
  },

  // {
  //   Component: withAuth(DashboardContent, role.SUPER_ADMIN as TUserRole),
  //   path: '/dashboard',
  //   children: [
  //     {
  //       Component: Analytics,
  //       path: '/dashboard/analytics'
  //     },
  //     ...generateRoutes(SuperAdminSidebar)
  //   ]
  // }
]);
