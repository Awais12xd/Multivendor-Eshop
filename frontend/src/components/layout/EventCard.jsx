import React from 'react'
import styles from '../../style/style'
import { Link } from 'react-router-dom'
import CountDown from './CountDown.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addToCartAction } from '../../redux/actions/cart.js'

const EventCard = ({data}) => {
  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state.cart);
  // {`${import.meta.env.VITE_BACKEND_URL}/${data.images[0]}`}
   const addToCartHandler = () => {
      const existed = cart && cart.find((i) => i._id == data?._id);
      if (existed) {
        toast.error("Product already added in the cart!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCartAction(cartData));
        toast.success("Product added to cart successfully!");
      }
    };
  return (
    <>
      {
        data && (
           <div className='w-full block bg-white rounded-lg lg:flex gap-5 p-4 md:p-7'>
     <div className="lg:w-[50%] w-full m-auto flex justify-center">
  
        <img src={`${data.images[0]?.url}`} alt="Product"
        className=''
        />
     </div>
        <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data?.description}</p>
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
          <Link to={`/product/${data?._id}?eventData=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div className={`${styles.button} text-[#fff] ml-5`} onClick={addToCartHandler} >Add to cart</div>
        </div>
      </div>
    </div>
        )
      }
    </>
  )
}

export default EventCard
