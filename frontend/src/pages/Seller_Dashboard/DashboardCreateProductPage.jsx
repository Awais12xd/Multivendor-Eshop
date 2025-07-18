import React, { useState } from 'react'
import DashboardCreateProduct from '../../components/Dashboard/DashboardCreateProduct.jsx'
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar.jsx'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'

const DashboardCreateProductPage = () => {
    const [active , setActive] = useState(4);
  return (
    <div>
      <DashboardHeader />
        <div className={` bg-[#f5f5f5] flex `}>
        <div className="w-[80px] md:w-[335px] ">
            <DashboardSideBar active={4} setActive={setActive} />
        </div>
        <DashboardCreateProduct />  

      </div>
    </div>
  )
}

export default DashboardCreateProductPage
