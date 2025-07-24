import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../style/style';
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import QuickProductView from './QuickProductView.jsx';
import { productData } from '../../static/data.jsx';

const ProductCard = ({product}) => {
  const [click , setClick] = useState(false);
  const [open , setOpen] = useState(false)
  console.log(product)
  const name = product.name;
  // Doing this below to add - instead of space so can use it in the url
  const product_name = name.replace(/\s+/g, "-");
  return (
    <div className='w-full relative h-[370px] p-3 cursor-pointer rounded-lg shadow-sm bg-white flex flex-col justify-between'>
      <div>
        <div className="flex justify-end"></div>
        <div>
          <Link to={`/product/${product_name}`}>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${product?.images[0]}`}
              alt="Product"
              className='h-[170px] object-contain w-full'
            />
          </Link>
          <Link className={`${styles.shop_name}`} to={`/shop/${product.shopId}`}>
            {product.shop.name}
          </Link>
        </div>
        <Link to={`/product/${product_name}`}>
          <div>
            <h4 className='pb-3 font-[500]'>
              {product.name.length > 40 ? product.name.slice(0, 40) + "..." : product.name}
            </h4>
            <div className="flex">
              <AiFillStar size={20} className='mr-2 text-yellow-300 cursor-pointer' />
              <AiFillStar size={20} className='mr-2 text-yellow-300 cursor-pointer' />
              <AiFillStar size={20} className='mr-2 text-yellow-300 cursor-pointer' />
              <AiFillStar size={20} className='mr-2 text-yellow-300 cursor-pointer' />
              <AiOutlineStar size={20} className='mr-2 text-yellow-300 cursor-pointer' />
            </div>
          </div>
        </Link>
      </div>
      <div className="flex py-2 justify-between items-center mt-2">
        <div className="flex">
          <h5 className={`${styles.productDiscountPrice}`}>
            {product.discountPrice}$
          </h5>
          <h4 className={`${styles.price}`}>
            {product.originalPrice + "$"}
          </h4>
        </div>
        <p className='text-green-400 font-[500]'>
          {product.sold_out} Sold
        </p>
      </div>
      <div className="">
        {
          click ? (
            <AiFillHeart 
            size={22}
            className='cursor-pointer absolute right-2 top-5'
            color="red"
            title='Remove from wishlist'
            onClick={() => setClick(!click)}
            />
          ) : (
            <AiOutlineHeart
            size={22}
            className='cursor-pointer absolute right-2 top-5'
            color="red"
            title='Add to wishlist'
            onClick={() => setClick(!click)}
            />
          )}
           <AiOutlineEye 
            size={22}
            className='cursor-pointer absolute right-2 top-13 text-gray-800'
            title='Quick View'
            onClick={() => setOpen(!open)}
            />
           <AiOutlineShoppingCart 
            size={24}
            className='cursor-pointer absolute right-2 top-22 text-gray-800'
            title='Add to cart'
            />
            {
              open ? (
                <QuickProductView setOpen={setOpen} data={product} />
              ) : null
            }
      </div>
    </div>
  )
}

export default ProductCard
