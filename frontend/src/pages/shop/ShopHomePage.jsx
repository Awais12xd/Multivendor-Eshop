import React from 'react'
import styles from '../../style/style'
import ShopInfo from '../../components/Shop/ShopInfo.jsx'
import ShopProfileData from '../../components/Shop/ShopProfileData.jsx'
import { useSelector } from 'react-redux'

const ShopHomePage = () => {
  
  const {isSeller} = useSelector((state) => state.seller)

  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-white rounded-sm shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <ShopInfo IsShopOwner={isSeller} />
        </div>
        <div className="w-[72%] rounded-sm">
          <ShopProfileData IsShopOwner={isSeller} /> 
        </div>
      </div>
    </div>
  )
}

export default ShopHomePage
