import React from 'react'
import { AiOutlineGift } from 'react-icons/ai';
import { MdOutlineLocalOffer } from 'react-icons/md';
import {FiPackage, FiShoppingBag} from "react-icons/fi"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { BiMessageSquare, BiMessageSquareDetail } from 'react-icons/bi';

const imageUrl = "https://shopo.quomodothemes.website/assets/images/logo.svg";


const DashboardHeader = () => {
    const {seller} = useSelector((state) => state.seller)
    console.log(seller)
  return (
    <div className='w-full h-[80px] bg-white shadow sticky top-o left-0  px-4 flex items-center justify-between z-40 py-  '>
      <div className="">
        <Link to={"/"}>
        <img src={imageUrl} alt="logo" />
        </Link>
        </div> 
        <div className="flex items-center">
          <div className="flex items-center mr-4">
           <Link to={"/dashboard/coupon-codes"}  className='md:block hidden'>
             <AiOutlineGift 
            size={30}
            className='mx-5 cursor-pointer'
            />
           </Link>
           <Link to={"/dashboard/all-events"} className='md:block hidden'>
             <MdOutlineLocalOffer 
            size={30}
            className='mx-5 cursor-pointer'
            />
           </Link>
           <Link to={"/dashboard/products"} className='md:block hidden'>
             <FiShoppingBag 
            size={30}
            className='mx-5 cursor-pointer'
            />
           </Link>
           <Link to={"/dashboard/orders"} className='md:block hidden'>
             <FiPackage 
            size={30}
            className='mx-5 cursor-pointer'
            />
           </Link>
           <Link to={"/dashboard/shop-inbox"} className='md:block hidden'>
             <BiMessageSquareDetail
            size={30}
            className='mx-5 cursor-pointer'
            />
           </Link>
           <Link to={`/shop/${seller?._id}`}>
            <img 
            className='w-12 h-12 rounded-full object-cover '
            src={`${seller.avatar.url }`}
             alt="Shop" />
           </Link>
          </div>
        </div>
    </div>
  )
}

export default DashboardHeader
