import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productsLoad } from '../../redux/actions/productsLoad';
import { allSellerOrdersLoad } from '../../redux/actions/allOrdersLoad';
import styles from '../../style/style';

const DashboardWithdrawMoney = () => {
     const dispatch = useDispatch();
      const { seller } = useSelector((state) => state.seller);
      const { orders } = useSelector((state) => state.orders);
      const [delieverdOrder, setDelieverdOrder] = useState(null);
     
      useEffect(() => {
    allSellerOrdersLoad(dispatch, seller?._id);

    const orderData =
      orders && orders.filter((item) => item.status === "Delivered");

    setDelieverdOrder(orderData);
  }, [dispatch,orders]);

   const totalEarningWithoutTax =
    delieverdOrder &&
    delieverdOrder.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharge = totalEarningWithoutTax * 0.1;
  const availableBalance = totalEarningWithoutTax - serviceCharge.toFixed(2);

  return (
    <div className='w-full p-8 h-[90vh]'>
      <div className="bg-white w-full h-full rounded flex items-center justify-center flex-col">
         <h5 className='text-[20px]'>Available: ${availableBalance}</h5>
         <div className={`${styles.button} text-white !h-[42px]`}>Withdraw</div>
      </div>
    </div>
  )
}

export default DashboardWithdrawMoney
