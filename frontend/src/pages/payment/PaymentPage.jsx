import React from 'react'
import Header from '../../components/layout/Header.jsx'
import CheckOutSteps from '../../components/checkout/CheckOutSteps.jsx'
import Footer from '../../components/layout/Footer.jsx'
import PaymentContent from '../../components/payment/PaymentContent.jsx'

const PaymentPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckOutSteps active={2} />
      <PaymentContent />
      <br />
      <Footer />
    </div>
  )
}

export default PaymentPage
