import React from 'react'
import styles from '../../style/style'
import { Link } from 'react-router-dom'
import CountDown from './CountDown.jsx'

const EventCard = ({data}) => {
  // {`${import.meta.env.VITE_BACKEND_URL}/${data.images[0]}`}
  return (
    <>
      {
        data && (
           <div className='w-full block bg-white rounded-lg lg:flex gap-5 p-4 md:p-7'>
     <div className="lg:w-[50%] w-full m-auto ">
  
        <img src={`${import.meta.env.VITE_BACKEND_URL}/${data.images[0]}`} alt="Product"
        className=''
        />
     </div>
        <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ut, perspiciatis iure tempora modi laborum reiciendis ipsam unde omnis cumque. Temporibus, voluptas fuga architecto quod quibusdam pariatur iusto quae ipsa, nulla consequuntur neque voluptatem officiis, odio labore minus maxime non harum incidunt optio nostrum reiciendis asperiores illum? Magnam fugiat magni illo minima adipisci accusantium, dolore atque, rem vel quidem blanditiis vero. Dignissimos eveniet voluptatum aspernatur recusandae voluptatibus, minima ab nam impedit reprehenderit quas accusamus alias sit assumenda rem ut cumque quis delectus. Eius, saepe temporibus molestiae ut assumenda sapiente, obcaecati debitis ducimus rem fuga impedit optio rerum? Est, consequatur ex!</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
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
    </>
  )
}

export default EventCard
