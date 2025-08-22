import { useAuth } from "@/context/AuthContext";
import { SuperAdminDashboard } from "./SuperAdminDashboard";
import { AdminDashboard } from "./AdminDashboard";
import { SenderDashboard } from "./SenderDashboard";
import { ReceiverDashboard } from "./ReceiverDashboard";
import { DashboardLayout } from "@/layouts/DashboardLayout";


export const DashboardContent: React.FC = () => {
  const { role } = useAuth();

  const renderDashboard = () => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <SuperAdminDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      case 'SENDER':
        return <SenderDashboard />;
      case 'RECEIVER':
        return <ReceiverDashboard />;
      default:
        return <div>Invalid Role</div>;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

// We will wrap the DashboardContent with AuthProvider in main.tsx
// So, we just export the main App logic here.
