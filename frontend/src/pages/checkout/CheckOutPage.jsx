import React from 'react'
import Header from '../../components/layout/Header.jsx'
import CheckoutContent from '../../components/checkout/CheckoutContent.jsx'
import Footer from '../../components/layout/Footer.jsx'
import CheckOutSteps from '../../components/checkout/CheckOutSteps.jsx'

const CheckOutPage = () => {
  return (
    <div>
      <Header/>
      <br />
      <br />
      <CheckOutSteps active={1} />
      <CheckoutContent/>
      <br />
      <Footer/>

    </div>
  )
}

export default CheckOutPage
