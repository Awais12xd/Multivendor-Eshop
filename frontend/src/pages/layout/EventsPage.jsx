import React from 'react'
import Header from '../../components/layout/Header.jsx'
import EventCard from '../../components/layout/EventCard.jsx'
import styles from '../../style/style.js'
import Footer from '../../components/layout/Footer.jsx'
import Events from '../../components/layout/Events.jsx'
import { useSelector } from 'react-redux'

const EventsPage = () => {
   const {allEvents, isloading} = useSelector((state) => state.allEvents);
  return (
    <div>
      <Header activeHeading={4} />
      <div className={`${styles.section} flex flex-col gap-7 my-5`}>
      
      {
        allEvents && allEvents.map((event , index) => (
           <EventCard  data={event} key={index}/>
        ))
      }
      </div>
      <Footer />
    </div>
  )
}

export default EventsPage
