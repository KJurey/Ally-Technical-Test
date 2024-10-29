import ProtectedRoute from "@/components/login/ProtectedRoute/ProtectedRoute";
import DashboardWeatherPage from "@/containers/dashboard-weather-page";

export default function DashboardWeather() {
  return (
    <ProtectedRoute>
      <DashboardWeatherPage />
    </ProtectedRoute>
  );
}
