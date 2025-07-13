import React from 'react'
import { navItems } from '../../static/data.jsx'
import { Link } from 'react-router-dom'

const Navbar = ({activeHeading}) => {
  return (
    <div className='flex md:items-center md:flex-row flex-col'>
        {
            navItems && navItems.map((data , index) => (
                <div key={index} className="flex">
                      <Link to={`${data.url}`}
                      className={`${activeHeading === index+1 ? "text-green-600 md:text-green-300" : "text-black md:text-white"} md:font-[500] px-6 cursor-pointer pb-5 md:pb-0 font-normal`}
                      >
                       {data.title}
                      </Link>
                </div>
            ))
        }
    </div>
  )
}

export default Navbar
