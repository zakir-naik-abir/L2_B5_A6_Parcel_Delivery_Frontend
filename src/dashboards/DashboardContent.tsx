import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Outlet } from "react-router";


export const DashboardContent: React.FC = () => {

  // const renderDashboard = () => {
  //   switch (role) {
  //     case 'SUPER_ADMIN':
  //       return <SuperAdminDashboard />;
  //     case 'ADMIN':
  //       return <AdminDashboard />;
  //     case 'SENDER':
  //       return <SenderDashboard />;
  //     case 'RECEIVER':
  //       return <ReceiverDashboard />;
  //     default:
  //       return <div>Invalid Role</div>;
  //   }
  // };

  return (
    <DashboardLayout>
      {/* {renderDashboard()} */}
      <Outlet/>
    </DashboardLayout>
  );
};

// We will wrap the DashboardContent with AuthProvider in main.tsx
// So, we just export the main App logic here.
