import React from 'react'
import styles from '../../style/style'
import { Link } from 'react-router-dom'
import CountDown from './CountDown.jsx'

const EventCard = () => {
  return (
    <div className='w-full block bg-white rounded-lg lg:flex  p-2'>
     <div className="lg:w-[50%] w-full m-auto ">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="Product"
        className=''
        />
     </div>
        <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14 pro max 8/256gb</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ut, perspiciatis iure tempora modi laborum reiciendis ipsam unde omnis cumque. Temporibus, voluptas fuga architecto quod quibusdam pariatur iusto quae ipsa, nulla consequuntur neque voluptatem officiis, odio labore minus maxime non harum incidunt optio nostrum reiciendis asperiores illum? Magnam fugiat magni illo minima adipisci accusantium, dolore atque, rem vel quidem blanditiis vero. Dignissimos eveniet voluptatum aspernatur recusandae voluptatibus, minima ab nam impedit reprehenderit quas accusamus alias sit assumenda rem ut cumque quis delectus. Eius, saepe temporibus molestiae ut assumenda sapiente, obcaecati debitis ducimus rem fuga impedit optio rerum? Est, consequatur ex!</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              1000$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              900$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown  />
        <br />
        <div className="flex items-center">
          <Link to={``}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div className={`${styles.button} text-[#fff] ml-5`} >Add to cart</div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
