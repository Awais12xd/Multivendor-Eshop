import React, { useState } from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx';
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar.jsx';
import DashboardAllRefundOrders from '../../components/Dashboard/DashboardAllRefundOrders.jsx';

const DashboardAllRefundOrdersPage = () => {
  const [active , setActive] = useState(0);
  
  return (
    <div className='w-full'>
      <DashboardHeader />
        <div className={` bg-[#f5f5f5] flex `}>
        <div className="w-[80px] md:w-[335px] ">
            <DashboardSideBar active={10} setActive={setActive} />
        </div>
        <DashboardAllRefundOrders/>  

      </div>
    </div>
  )
}

export default DashboardAllRefundOrdersPage
