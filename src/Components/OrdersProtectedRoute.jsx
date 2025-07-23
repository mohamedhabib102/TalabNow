import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function OrdersProtectedRoute({ children }) {
  const { userId } = useAuth(); 

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
