import { useAppSelector } from "../redux/hook";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

    return (
        <>
            {isAuthenticated ? (
                <>{children}</>
            ) : (
                <Navigate to="/login" replace />
            )}
        </>
    )
};

export default ProtectedRoute;
