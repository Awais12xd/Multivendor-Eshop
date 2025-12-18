import React from 'react'
import styles from '../../style/style'
import ShopInfo from '../../components/Shop/ShopInfo.jsx'
import ShopProfileData from '../../components/Shop/ShopProfileData.jsx'
import { useSelector } from 'react-redux'

const ShopHomePage = () => {
  
  const {isSeller} = useSelector((state) => state.seller)

  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex flex-col md:flex-row py-5 md:py-10 justify-between">
        <div className="w-full md:w-[25%] bg-white rounded-sm shadow-sm md:overflow-y-scroll md:h-[90vh] sticky md:relative md:top-10 md:left-0 z-10">
          <ShopInfo IsShopOwner={isSeller}/>
        </div>
        <div className="w-full mt-9 md:w-[73%] rounded-sm">
          <ShopProfileData IsShopOwner={isSeller} /> 
        </div>
      </div>
    </div>
  )
}

export default ShopHomePage
