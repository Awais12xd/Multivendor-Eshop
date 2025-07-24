import React from 'react'
import styles from '../../style/style.js'
import EventCard from './EventCard.jsx'
import { useSelector } from 'react-redux'

const Events = () => {
  const {allEvents, isloading} = useSelector((state) => state.allEvents);

  return (
    <div>
      <div className={`${styles.section} mb-5`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>
        <div className="w-full">
         {isloading ? (
            <p>Loading</p>
        ) : (
          <EventCard  data={allEvents && allEvents[0]} />
         )}
        </div>
      </div>
    </div>
  )
}

export default Events
