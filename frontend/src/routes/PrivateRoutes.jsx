import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Animations/Loader.jsx"; // Make sure this path is correct

const ProtectedRoute = ({ children }) => {
  const { loading, isAuth } = useSelector((state) => state.user);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!loading && !isAuth) {
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 2000); // ⏳ 2-second delay

      return () => clearTimeout(timer);
    }
  }, [loading, isAuth]);

  if (loading) {
    return <Loader />;
  }

  if (shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuth) {
    return <Loader />; // show loader during the delay
  }

  return children;
};

export default ProtectedRoute;
