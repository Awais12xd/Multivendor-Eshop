import React, { useState } from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'
import {Link} from "react-router-dom"
import "../../App.css"
import styles from '../../style/style'
import { BiMinus } from 'react-icons/bi'

const StaticData = [
    {
        name:"iphone",
        description:"Anything here",
        price:299
    },
    {
        name:"iphone",
        description:"Anything here",
        price:299
    },
    {
        name:"iphone",
        description:"Anything here",
        price:299
    },
    
]

const Cart = ({setOpenCart}) => {
  return (
    <div  className='absolute z-10 top-0 left-0 w-full h-screen bg-[#0000005f] overflow-y-auto'>
       <div className="fixed top-0 right-0 flex flex-col justify-between  shadow-sm bg-white h-full md:w-[25%] w-[60%] overflow-y-scroll">
        <div className="flex flex-col justify-between h-full">
         <div className="">
               <div className="flex justify-end w-full pt-5 pr-5 ">
                <RxCross1 
                className='cursor-pointer'
                size={25}
                onClick={() => setOpenCart(false)}
                />
            </div>
            <div className="flex items-center p-4 ">
                <FaShoppingBag 
                size={25}

                />
                <h5 className='pl-3 text-[20px] font-[500]'>3 Items</h5>
            </div>
            <div className="border-t border-slate-300 mt-4">
                 {
                    StaticData && StaticData.map((data,index) => (
                        <SingleCartBox cart={data} key={index} />
                    ))
                 }
            </div>
         </div>
        <div className={` w-full text-white px-4 mb-3 mt-3 flex`}>
                <Link to={"/checkout"} className='h-12 bg-orange-600 w-full flex items-center justify-center rounded-md cursor-pointer hover:opacity-85 uppercase font-[500]'>
                    CheckOut Now (USD$1022)
                </Link>
         </div>
        </div>
       </div>
    </div>
  )
}

const SingleCartBox = ({cart}) => {
    const [value , setValue] = useState(1);
    const totalPrice = cart.price * value;
    return(
      <>
         <div className="border-b border-slate-300 p-4">
            <div className="w-full flex items-center gap-2">
                   <div className="for-value-changes flex flex-col justify-center items-center  ">
                        <div className="bg-orange-600 text-white p-3 rounded-full w-6 h-6 cursor-pointer flex justify-center items-center"
                        onClick={() => setValue(value + 1)}
                        >
                            <span >+</span>
                        </div>
                        <div className="">
                              {value}
                        </div>
                        <div className="flex justify-center  cursor-pointer items-center bg-gray-200  p-3 rounded-full w-6 h-6"
                        onClick={() => setValue(value === 1 ? 1 : value -1)}
                        >
                            <span>-</span>
                        </div>
                   </div>
                   <div className="image">
                    <img src="https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg" className='w-40 h-30 object-contain ' alt="product" />
                   </div>
                   <div className="product-details flex flex-col ">
                    <p className='line-clamp-3  self-start text-slate-700 text-[18px] font-[500]'>Gaming Headphone Asus with mutiple color and free delivery</p>
                    <span className='my-2 text-gray-500 font-[500] text-sm'>${cart.price} * {value}</span>
                    <h2 className='text-orange-600 font-semibold text-lg self-start '>US${totalPrice}</h2>
                   </div>
                   <div className="cancel flex items-center">
                       <RxCross1 
                         className='cursor-pointer'
                         size={17}

                />
                   </div>
            </div>
         </div>
      </>
    )
}

export default Cart;
