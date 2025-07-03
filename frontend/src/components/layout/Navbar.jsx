import React from 'react'
import { navItems } from '../../static/data.jsx'
import { Link } from 'react-router-dom'

const Navbar = ({activeHeading}) => {
  return (
    <div className='flex items-center'>
        {
            navItems && navItems.map((data , index) => (
                <div key={index} className="flex">
                      <Link to={`${data.url}`}
                      className={`${activeHeading === index+1 ? "text-green-300" : "text-white"} font-[500] px-6 cursor-pointer`}
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
