import React from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import Footer from '../../components/layout/Footer.jsx'
import OrderDetail from '../../components/order/OrderDetail.jsx'

const OrderDetailPage = () => {
  return (
    <div>
      <DashboardHeader />
      <OrderDetail />
      <Footer />
    </div>
  )
}

export default OrderDetailPage
