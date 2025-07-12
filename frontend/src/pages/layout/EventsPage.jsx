import React from 'react'
import Header from '../../components/layout/Header.jsx'
import EventCard from '../../components/layout/EventCard.jsx'
import styles from '../../style/style.js'
import Footer from '../../components/layout/Footer.jsx'

const EventsPage = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <div className={`${styles.section} flex flex-col gap-7 my-5`}>
        <EventCard />
      <EventCard />
      </div>
      <Footer />
    </div>
  )
}

export default EventsPage
