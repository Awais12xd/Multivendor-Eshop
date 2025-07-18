import React from "react";
import { useSelector } from "react-redux";
import styles from "../../style/style";

const ShopInfo = ({ IsShopOwner }) => {
  const { seller } = useSelector((state) => state.seller);
  return (
   <div className="">
     <div className="w-full py-5">
      <div className="w-full flex items-center justify-center">
        <img
        className="w-[150px] h-[150px] object-cover rounded-full"
          src={`${import.meta.env.VITE_BACKEND_URL}/${seller.avatar.url}`}
          alt="Shop Avatar"
        />
      </div>
      <h3 className="text-center py-2 text-xl">
        {seller?.name}
      </h3>
      <p className="text-xs  text-justify text-black p-3 flex items-center">
        {seller?.description ? seller.description : "No description available"}
      </p>
    </div>
    <div className="p-3">
        <h5 className="font-semibold">Address</h5>
        <h4 className="text-sm text-gray-700 pt-1">
            {seller?.address}
        </h4>
    </div>
    <div className="p-3">
        <h5 className="font-semibold">Phone Number</h5>
        <h4 className="text-sm text-gray-700 pt-1">
            {seller?.phoneNumber}
        </h4>
    </div>
    <div className="p-3">
        <h5 className="font-semibold">Total Products</h5>
        <h4 className="text-sm text-gray-700 pt-1">
           12
        </h4>
    </div>
    <div className="p-3">
        <h5 className="font-semibold">Shop Reviews</h5>
        <h4 className="text-sm text-gray-700 pt-1">
           4/5
        </h4>
    </div>
    <div className="p-3">
        <h5 className="font-semibold">Joined On</h5>
        <h4 className="text-sm text-gray-700 pt-1">
           {seller?.createdAt.slice(0, 10)}
        </h4>
    </div>
    {
        IsShopOwner && (
            <div className=" flex flex-col gap-2 pt-3 pb-4">
           <div className="px-2">
            <div className={`${styles.button} w-full h-[42px] !m-0 rounded-md`}>
                <span className="text-white">Edit Shop</span>
            </div>
           </div>
           <div className="px-2">
            <div className={`${styles.button} !m-0 w-full h-[42px] rounded-md`}>
                <span className="text-white">Log Out</span>
            </div>
           </div>
           </div>
        )
    }
   </div>
  );
};

export default ShopInfo;
