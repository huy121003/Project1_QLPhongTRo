import { useAppSelector } from "../redux/hook";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const roleName = useAppSelector((state) => state.auth.user.role.name);

  return (
    <>
      {isAuthenticated && roleName !== "NORMAL USER" ? (
        <>{children}</>
      ) : isAuthenticated && roleName === "NORMAL USER" ? (
        <Navigate to="/user" replace />
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
