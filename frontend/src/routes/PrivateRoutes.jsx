import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuth } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuth) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }
};

export default ProtectedRoute;