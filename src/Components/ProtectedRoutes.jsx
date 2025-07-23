import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Components/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { userType } = useAuth();


  if (userType === null) {
    return null; // 
  }

  if (userType !== "Admin") {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
}
