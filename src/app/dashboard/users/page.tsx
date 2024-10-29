import ProtectedRoute from "@/components/login/ProtectedRoute/ProtectedRoute";
import DashboardUsersPage from "@/containers/dashboard-users-page";

export default function DashboardWeather() {
  return (
    <ProtectedRoute>
      <DashboardUsersPage />
    </ProtectedRoute>
  );
}
