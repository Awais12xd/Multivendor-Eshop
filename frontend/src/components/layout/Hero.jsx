import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../style/style'

const Hero = () => {
  return (
    <div className='relative min-h-[70vh] md:min-h-[80vh] w-full bg-no-repeat flex items-center justify-center'
    style={{
        backgroundImage:"url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)"
    }}
    >
        <div className="w-[90%] md:w-[60%] flex flex-col ">
        <h1 className='text-3xl leading-[1.2]  md:text-6xl text-[#3d3a3a] capitalize'>
             Best Collection for <br /> home Decoration
        </h1>
        <p className='pt-5 text-[16px] font-normal text-[#000000ba]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.</p>
          <Link to={"/products"} className='inline-block'>
          <div className={`${styles.button} mt-5`}>
            <span className=' text-white text-lg'>Shop Now</span>
          </div>
          </Link>
      </div>
    </div>
  )
}

export default Hero
