import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Components/context/AuthContext";

export default function ProtectedRoutesAuth() {
  const { userType, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }



  if (userType === "Client" || userType === "Admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
