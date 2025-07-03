import React from 'react'
import Header from '../../components/layout/Header.jsx'
import Hero from '../../components/layout/Hero.jsx'
import Categories from '../../components/layout/Categories.jsx'

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories/>
    </div>
  )
}

export default HomePage
