import React, { useEffect, useState } from 'react'
import styles from '../../style/style';
import ProductCard from '../layout/ProductCard';
import { useSelector } from 'react-redux';

const RelatedProducts = ({data}) => {
    const [products , setProducts] = useState([]);
    const {allProducts} =  useSelector((state) => state.allProducts);
    useEffect(() => {
        const relateProducts = allProducts && allProducts.filter((product) => product.category === data.category);
        setProducts(relateProducts);
    } , [])
  return (
    <div className='py-4'>
       <div className={`${styles.section} mb-5`}>
        <div className={`${styles.heading}  border-b border-gray-200 mb-4`}>
          <h1>Related Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
            {
                products && products.map((product,index) => (
                    <ProductCard product={product} key={index} />
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts
