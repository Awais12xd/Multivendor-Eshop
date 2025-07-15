import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Animations/Loader.jsx";

const SellerProtectedRoutes = ({ children }) => {
  const { isloading, isSeller } = useSelector((state) => state.seller);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isSeller && !isloading) {
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 2000); // ⏳ 2 second delay

      return () => clearTimeout(timer);
    }
  }, [isSeller, isloading]);

  if (isloading) {
    return <Loader />;
  }

  if (shouldRedirect) {
    return <Navigate to="/shop-login" replace />;
  }

  if (!isSeller) {
    return <Loader />; // Show loader during delay
  }

  return children;
};

export default SellerProtectedRoutes;
