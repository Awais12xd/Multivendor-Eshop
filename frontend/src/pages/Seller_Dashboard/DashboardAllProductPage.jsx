import React, { useEffect, useState } from 'react'
import DashboardHeader from '../../components/Dashboard/DashboardHeader';
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar';
import { useDispatch } from 'react-redux';
import { productsLoad } from '../../redux/actions/productsLoad';
import DashboardAllProduct from '../../components/Dashboard/DashboardAllProduct';

const DashboardAllProductPage = () => {
  
  return (
    <div>
      <DashboardHeader />
        <div className={` bg-[#f5f5f5] flex `}>
        <div className="w-[80px] md:w-[335px] ">
            <DashboardSideBar active={3} setActive={setActive} />
        </div>
        <DashboardAllProduct/>  

      </div>
    </div>
  )
}

export default DashboardAllProductPage
