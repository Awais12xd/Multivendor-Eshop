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
        <div className="w-[50px] md:w-[335px] sticky  md:mt-0 mt-[18%]">
            <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  )
}

export default ProfilePage
