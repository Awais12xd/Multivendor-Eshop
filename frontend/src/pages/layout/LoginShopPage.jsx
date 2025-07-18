import React from 'react'
import LoginShop from '../../components/ShopAuth/LoginShop.jsx'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const LoginShopPage = () => {
     const navigate = useNavigate();
        const {isSeller , isloading} = useSelector((state) => state.seller);
      
        useEffect(() => {
          if(isSeller){
           navigate(`/dashboard`)
        // window.location.reload(true);
          }
        } ,[isSeller ,isloading])
  return (
    <div>
      <LoginShop/>
    </div>
  )
}

export default LoginShopPage
