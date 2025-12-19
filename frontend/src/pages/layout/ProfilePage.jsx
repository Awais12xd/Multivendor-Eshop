import React, { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import ProfileSideBar from '../../components/Profile/ProfileSideBar'
import ProfileContent from '../../components/Profile/ProfileContent'
import styles from '../../style/style'

const ProfilePage = () => {
    const [active , setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} bg-[#f5f5f5] py-10 flex`}>
        <div className="w-[60px] sm:w-[60px] md:w-[335px] sticky  md:mt-0 mt-[18%]">
            <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <div className="w-[80%] md:w-full">
          <ProfileContent active={active} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
