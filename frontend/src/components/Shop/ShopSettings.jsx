import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { sellerLoad } from "../../redux/actions/sellerLoad";
import { toast } from "react-toastify";
import axios from "axios";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar ,setAvatar] = useState();
  const [name ,setName] = useState(seller && seller.name);
  const [description ,setDescription] = useState(seller && seller?.description ? seller?.description : "" );
  const [phoneNumber ,setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [address ,setAddress] = useState(seller && seller.address);
  const [zipCode ,setZipCode] = useState(seller && seller.zipCode);
  const dispatch = useDispatch();

  const handleFilechange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
     setAvatar(file);

     const formData = new FormData();
     formData.append("file" , e.target.files[0]);

      try {
           const res = await axios.put(
             `${import.meta.env.VITE_SERVER_URL}/shop/change-seller-avatar`,
             formData,
             {
               headers: {
                 "Content-Type": "multipart/form-data",
               },
               withCredentials: true,
             }
           );
           dispatch(sellerLoad)
           toast.success(res.data.message);
         } catch (err) {
           if (err.response) {
             console.log("Error response:", err.response.data);
             toast.error(err.response.data.message);
           } else {
             console.log("Error:", err.message);
             toast.error(err.message);
           }
         }

  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
           const res = await axios.put(
             `${import.meta.env.VITE_SERVER_URL}/shop/update-seller-info`,
             {
               name,
               description,
               address,
               phoneNumber,
               zipCode
             },
             {
              
               withCredentials: true,
             }
           );
           dispatch(sellerLoad)
           toast.success(res.data.message);
         } catch (err) {
           if (err.response) {
             console.log("Error response:", err.response.data);
             toast.error(err.response.data.message);
           } else {
             console.log("Error:", err.message);
             toast.error(err.message);
           }
         }

  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full md:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              className="w-[200px] h-[200px] border-3 rounded-full border-green-400 cursor-pointer object-cover"
              src={
                avatar ? URL.createObjectURL(avatar) : `${seller?.avatar.url}`
              }
              alt=""
            />
            <div className="w-[30px] h-[30px] bg-[#dadada] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[10px]">
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleFilechange}
              />
              <label htmlFor="file" className="cursor-pointer">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* Shop Info */}
        <form aria-required
        onSubmit={handleUpdate}
        className="flex flex-col items-center">
          <div className="md:w-[50%] px-3 md:px-0 w-full mx-auto">
            <label className="pb-2">Shop Name</label>
            <div className="w-full relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
              />
            </div>
          </div>
          <br />
          <div className="md:w-[50%] px-3 md:px-0 w-full mx-auto">
            <label className="pb-2">Shop Description</label>
            <div className="w-full relative">
              <input
                type="text"
                placeholder={
                  seller?.description
                    ? seller?.description
                    : "Enter your shop description."
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
              />
            </div>
          </div>
          <br />
          <div className="md:w-[50%] px-3 md:px-0 w-full mx-auto">
            <label className="pb-2">Shop Address</label>
            <div className="w-full relative">
              <input
                type="text"
                placeholder={
                  seller?.address ? seller?.address : "Enter your shop address."
                }
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
              />
            </div>
          </div>
          <br />
          <div className="md:w-[50%] px-3 md:px-0 w-full mx-auto">
            <label className="pb-2">Shop Phone Number</label>
            <div className="w-full relative">
              <input
                type="number"
                placeholder={seller?.phoneNumber}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
              />
            </div>
          </div>
          <br />
          <div className="md:w-[50%] px-3 md:px-0 w-full mx-auto">
            <label className="pb-2">Shop Zipcode</label>
            <div className="w-full relative">
              <input
                type="number"
                placeholder={seller?.zipCode}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-[50%] mx-auto mt-5 appearance-none block h-12 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none  focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3 cursor-pointer"
          >
            Update Shop
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
