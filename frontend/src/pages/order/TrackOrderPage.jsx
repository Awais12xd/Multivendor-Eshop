import React from "react";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import TrackOrder from "../../components/order/TrackOrder.jsx";

const TrackOrderPage = () => {
  return (
    <div>
      <Header />
      <TrackOrder />
      <Footer />
    </div>
  );
};

export default TrackOrderPage;
