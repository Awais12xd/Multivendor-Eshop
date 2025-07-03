import React from 'react'
import styles from '../../style/style'
import { brandingData, categoriesData } from '../../static/data.jsx'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const navigate = useNavigate();
  return (
    <>
    <div className={`${styles.section} hidden sm:block`}>
      <div className="branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md ">
        {
            brandingData && brandingData.map((data,index) => (
                <div className="flex items-center" key={index}>
                    {data.icon}
                    <div className="px-3">
                        <h3 className="font-bold text-sm md:text-base">
                            {data.title}
                        </h3>
                        <p className='md:text-sm text-xs'>
                          {data.Description}
                        </p>
                    </div>
                </div>
            ))
        }

      </div>
    </div>
    <div className={`${styles.section} bg-white mb-12 p-6 rounded-lg `} id='categories'>
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
             {
                categoriesData && categoriesData.map((data,index) => {
                  const handleSubmit = (data) => {
                    navigate(`/products?category=${data.title}`)
                  }  
                  return(
                  <div className="flex items-center w-full h-[100px]  justify-between cursor-pointer overflow-hidden" key={index}
                  onClick={() => handleSubmit(data)}
                  >
                       <h5 className='text=[18px]'>{data.title}</h5>
                       <img src={data.image_Url} className='w-[120px] object-contain' alt="" />
                </div>
                  )
})
             }
        </div>
    </div>
    </>
  )
}

export default Categories
