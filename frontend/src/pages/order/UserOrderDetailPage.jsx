import React from "react";
import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";
import UserOrderDetail from "../../components/order/UserOrderDetail.jsx";

const UserOrderDetailPage = () => {
  return (
    <div>
      <Header />
      <UserOrderDetail />
      <Footer />
    </div>
  );
};

export default UserOrderDetailPage;
