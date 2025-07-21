import React, { useState } from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx';
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar.jsx';
import DashboardAllEvents from '../../components/Dashboard/DashboardAllEvents.jsx';

const DashboardAllEventsPage = () => {
   const [active , setActive] = useState(0);
  
  return (
    <div className='w-full'>
      <DashboardHeader />
        <div className={` bg-[#f5f5f5] flex `}>
        <div className="w-[80px] md:w-[335px] ">
            <DashboardSideBar active={5} setActive={setActive} />
        </div>
        <DashboardAllEvents/>  

      </div>
    </div>
  )
}

export default DashboardAllEventsPage
