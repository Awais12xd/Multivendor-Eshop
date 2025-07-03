import React from 'react'
import styles from '../../style/style.js'
import { productData } from '../../static/data.jsx'
import ProductCard from './ProductCard.jsx'

const FeaturedProducts = () => {


  return (
     <div>
      <div className={`${styles.section} mb-5`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
            {
                productData && productData.map((data,index) => (
                    <ProductCard product={data} key={index} />
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts
