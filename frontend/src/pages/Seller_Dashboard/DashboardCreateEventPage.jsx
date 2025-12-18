import React, { useState } from 'react'
import DashboardCreateEvent from '../../components/Dashboard/DashboardCreateEvent.jsx'
import DashboardSideBar from '../../components/Dashboard/DashboardSideBar.jsx';
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx';

const DashboardCreateEventPage = () => {
  const [active , setActive] = useState(4);
   return (
     <div>
       <DashboardHeader />
         <div className={` bg-[#f5f5f5] flex `}>
         <div className="w-[80px] md:w-[335px] ">
             <DashboardSideBar active={6} setActive={setActive} />
         </div>
         <DashboardCreateEvent />  
 
       </div>
     </div>
   )
}

export default DashboardCreateEventPage
