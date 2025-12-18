import React, { useState } from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar.jsx'
import DashboardWithdrawMoney from '../../components/Dashboard/DashboardWithdrawMoney.jsx'

const DashboardWithdrawMoneyPage = () => {
      const [active , setActive] = useState(0);
  return (
     <div className='w-full'>
          <DashboardHeader />
            <div className={` bg-[#f5f5f5] flex `}>
            <div className="w-[80px] md:w-[335px] ">
                <DashboardSideBar active={7} setActive={setActive} />
            </div>
            <DashboardWithdrawMoney/>  
    
          </div>
        </div>
  )
}

export default DashboardWithdrawMoneyPage
