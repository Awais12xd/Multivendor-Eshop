import React from 'react'
import styles from '../../style/style.js'
import EventCard from './EventCard.jsx'

const Events = () => {
  return (
    <div>
      <div className={`${styles.section} mb-5`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>
        <div className="w-full">
          <EventCard />
        </div>
      </div>
    </div>
  )
}

export default Events
