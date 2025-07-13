import React from 'react'
import { AiOutlineInbox, AiOutlineShopping } from 'react-icons/ai'
import { BiLogOut, BiPackage, BiUser } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import {MdOutlineTrackChanges, MdPayment} from "react-icons/md"
import { FaAddressBook } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'

const ProfileSideBar = ({active , setActive}) => {
    const navigate = useNavigate();
    const handleLogOut = async() => {
     try {
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/logout` , {withCredentials: true}
          ).then((res) => {
            console.log(res)
            toast.success("Logout Successfull!")
            window.location.reload(true);
            navigate("/login")
          }).catch((err) => {
            console.log("ERROR :",err);
            toast.error(err.response.data.message)
          })
            
          } catch (err) {
            console.log("ERROR CATCH :",err);
            toast.error(err.message)
          }
    }

  return (
    <div className='bg-white w-full pt-8 p-4 shadow-sm rounded-lg'>
       <div
       onClick={() => setActive(1)}
       className="flex  cursor-pointer w-full mb-8">
          <BiUser size={25} color={active === 1 ? "red" : ""} /> 
          <span
          className={`${active === 1 ? "text-red-500" : ""} pl-4 text-lg hidden md:block`}
          >
            Profile
          </span>
       </div> 
       <div
       onClick={() => setActive(2)}
       className="flex  cursor-pointer w-full mb-8">
          <AiOutlineShopping size={25} color={active === 2 ? "red" : ""} /> 
          <span
          className={`${active === 2 ? "text-red-500" : ""} pl-4 text-lg hidden md:block`}
          >
            Orders
          </span>
       </div> 
       <div
       onClick={() => setActive(3)}
       className="flex  cursor-pointer w-full mb-8">
          <BiPackage size={25} color={active === 3 ? "red" : ""} /> 
          <span
          className={`${active === 3 ? "text-red-500" : ""} pl-4 text-lg hidden md:block`}
          >
            Refund
          </span>
       </div> 
       <div
       onClick={() => setActive(4) || navigate("/inbox")}
       className="flex  cursor-pointer w-full mb-8">
          <AiOutlineInbox size={25} color={active === 4 ? "red" : ""} /> 
          <span
          className={`${active === 4 ? "text-red-500" : ""} pl-4 text-lg hidden md:block`}
          >
            Inbox
          </span>
       </div> 
       <div
       onClick={() => setActive(5)}
       className="flex  cursor-pointer w-full mb-8">
          <MdOutlineTrackChanges size={25} color={active === 5 ? "red" : ""} /> 
          <span
          className={`${active === 5 ? "text-red-500" : ""} pl-4 text-lg hidden md:block`}
          >
            Track Orders
          </span>
       </div> 
       <div
       onClick={() => setActive(6)}
       className="flex  cursor-pointer w-full mb-8">
          <MdPayment size={25} color={active === 6 ? "red" : ""} /> 
          <span
          className={`${active === 6 ? "text-red-500" : ""} pl-4 text-lg hidden md:block`}
          >
            Payment Methods
          </span>
       </div> 
       <div
       onClick={() => setActive(7)}
       className="flex  cursor-pointer w-full mb-8">
          <FaAddressBook size={25} color={active === 7 ? "red" : ""} /> 
          <span
          className={`${active === 7 ? "text-red-500" : ""} pl-4 text-lg hidden md:block`}
          >
            Adresses
          </span>
       </div> 
       <div
       onClick={() => setActive(8) || handleLogOut()}
       className="flex  cursor-pointer w-full mb-8">
          <BiLogOut size={25} color={active === 8 ? "red" : ""} /> 
          <span
          className={`${active === 8 ? "text-red-500" : ""} pl-4 text-lg hidden md:block`}
          >
            Log Out
          </span>
       </div> 
    </div>
  )
}

export default ProfileSideBar
