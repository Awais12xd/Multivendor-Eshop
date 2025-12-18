import React, { useState } from 'react'
import ShopSettings from '../../components/Shop/ShopSettings.jsx'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar.jsx'

const ShopSettingsPage = () => {
      const [active , setActive] = useState(0);
    
  return (
   
     <div className='w-full'>
          <DashboardHeader />
            <div className={` bg-[#f5f5f5] flex `}>
            <div className="w-[80px] md:w-[335px] ">
                <DashboardSideBar active={11} setActive={setActive} />
            </div>
            <ShopSettings/>
    
          </div>
        </div>
  )
}

export default ShopSettingsPage
