import React from 'react'
import Header from '../../components/layout/Header.jsx'
import Hero from '../../components/layout/Hero.jsx'
import Categories from '../../components/layout/Categories.jsx'
import BestDeals from '../../components/layout/BestDeals.jsx'
import FeaturedProducts from '../../components/layout/FeaturedProducts.jsx'
import Events from '../../components/layout/Events.jsx'
import Sponsored from '../../components/layout/Sponsored.jsx'
import Footer from '../../components/layout/Footer.jsx'

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories/>
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored/>
      <Footer />
    </div>
  )
}

export default HomePage
