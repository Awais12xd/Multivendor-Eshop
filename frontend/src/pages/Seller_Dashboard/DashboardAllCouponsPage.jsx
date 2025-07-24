import React, { useState } from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx';
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar.jsx';
import DashboardAllCoupons from '../../components/Dashboard/DashboardAllCoupons.jsx';

const DashboardAllCouponsPage = () => {
   const [active , setActive] = useState(0);
  
  return (
    <div className='w-full'>
      <DashboardHeader />
        <div className={` bg-[#f5f5f5] flex `}>
        <div className="w-[80px] md:w-[335px] ">
            <DashboardSideBar active={9} setActive={setActive} />
        </div>
        <DashboardAllCoupons/>  

      </div>
    </div>
  )
}

export default DashboardAllCouponsPage
