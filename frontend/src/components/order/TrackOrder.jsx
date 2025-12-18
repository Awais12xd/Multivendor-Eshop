import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { allOrdersLoad } from '../../redux/actions/allOrdersLoad';

const TrackOrder = () => {
    const { orders } = useSelector((state) => state.orders);
      const { user } = useSelector((state) => state.user);
      const dispatch = useDispatch();

      const { id } = useParams();
      
        useEffect(() => {
          allOrdersLoad(dispatch, user?._id);
        }, [dispatch]);
      
        const data = orders && orders.find((item) => item._id === id);
  return (
    <div>
      {
        data && (
            <div className="w-full h-[50vh] flex justify-center items-center">
                <h1 className='font-[500] text-lg uppercase'>Your order is {data?.status}</h1>
            </div>
        )
      }
    </div>
  )
}

export default TrackOrder
