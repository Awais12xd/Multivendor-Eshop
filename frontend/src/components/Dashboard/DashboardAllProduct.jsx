import React, { useEffect, useState } from 'react'
import { productsLoad } from '../../redux/actions/productsLoad';
import { useDispatch, useSelector } from 'react-redux';

const DashboardAllProduct = () => {
      const dispatch= useDispatch();

      const [active , setActive] = useState(4);
      const {seller} = useSelector((state) => state.seller);
      const {products} = useSelector((state) => state.products);
    useEffect(() => {
        productsLoad(dispatch , seller?._id)
    }  , [active])
  return (
    <div>
      DashboardAllProduct
    </div>
  )
}

export default DashboardAllProduct
