import React from 'react'
import CreateShop from '../../components/ShopAuth/CreateShop.jsx'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const CreateShopPage = () => {
   const navigate = useNavigate();
    const {isSeller , isloading ,  seller} = useSelector((state) => state.seller);
  
    useEffect(() => {
      if(isSeller){
        navigate(`/dashboard`)
      }
    } ,[isSeller ,isloading ])
  return (
    <div>
      <CreateShop />
    </div>
  )
}

export default CreateShopPage
