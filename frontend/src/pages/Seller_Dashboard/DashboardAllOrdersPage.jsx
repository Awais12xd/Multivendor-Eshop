import React, { useEffect, useState } from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx';
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar.jsx';
import DashboardAllOrders from '../../components/Dashboard/DashboardAllOrders.jsx';

const DashboardAllOrdersPage = () => {
    const [active , setActive] = useState(0);
  
  return (
    <div className='w-full'>
      <DashboardHeader />
        <div className={` bg-[#f5f5f5] flex `}>
        <div className="w-[80px] md:w-[335px] ">
            <DashboardSideBar active={2} setActive={setActive} />
        </div>
        <DashboardAllOrders/>  

      </div>
    </div>
  )
}

export default DashboardAllOrdersPage
