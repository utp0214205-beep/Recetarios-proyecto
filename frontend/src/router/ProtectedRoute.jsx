import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ children }) {

    const { alumno } = useAuth();

    if (!alumno) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;