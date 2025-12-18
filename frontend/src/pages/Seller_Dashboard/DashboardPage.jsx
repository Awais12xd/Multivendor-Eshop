import React, { useState } from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar.jsx'
import DashboardContent from '../../components/Dashboard/DashboardContent.jsx';

const DashboardPage = () => {
    const [active , setActive] = useState(1);
  return (
    <div>
      <DashboardHeader />
        <div className={` bg-[#f5f5f5] flex  justify-between`}>
        <div className="w-[80px] md:w-[335px] ">
            <DashboardSideBar active={active} setActive={setActive} />
        </div>
        <DashboardContent active={active} />

      </div>
    </div>
  )
}

export default DashboardPage
