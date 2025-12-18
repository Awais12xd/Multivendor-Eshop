import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../style/style";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ShopInfo = ({ IsShopOwner }) => {
  const [sellerData, setSellerData] = useState(null);
  const { id } = useParams();
  const { seller } = useSelector((state) => state.seller);
  const [loading, setLoading] = useState(false);
  const { allProducts } = useSelector((state) => state.allProducts);
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (IsShopOwner) {
      setSellerData(seller);
    } else {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/shop/getSellerInfo/${id}`
          );
          console.log(res);
          if (res.data.success === true) {
            setLoading(false);
            setSellerData(res.data.data);
          }
          if (res.data.success === false) {
            setLoading(false);
            console.log(res.response.data);
          }
        } catch (err) {
          setLoading(false);
          if (err.response) {
            console.log("Error response:", err.response.data);
          } else {
            console.log("Error:", err.message);
          }
        }
      };
      fetchData();
    }
    const fetchProductDetails = () => {
      if (allProducts && allProducts.length > 0) {
        const products = allProducts.filter(
          (product) => product.shop._id === id
        );
        setProductData(products || null);
      }
    };

    fetchProductDetails();
  }, [id, IsShopOwner, seller, allProducts]);

  const totalReviewsLength =
    productData &&
    productData.reduce((acc, product) => acc + product.reviews.length, 0);
  const totalRatings =
    productData &&
    productData.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  const handleLogout = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_SERVER_URL}/shop/logout-seller`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          toast.success("Logout Successfull!");
          navigate("/shop-login");
          window.location.reload(true);
        })
        .catch((err) => {
          console.log("ERROR :", err);
          toast.error(err.response.data.message);
        });
    } catch (err) {
      console.log("ERROR CATCH :", err);
      toast.error(err.message);
    }
  };

  return (
    <div className="">
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            className="w-[150px] h-[150px] object-cover rounded-full"
            src={`${
              sellerData?.avatar.url
            }`}
            alt="Shop Avatar"
          />
        </div>
        <h3 className="text-center py-2 text-xl">{sellerData?.name}</h3>
        <p className="text-xs  text-justify text-black p-3 flex items-center">
          {sellerData?.description
            ? sellerData.description
            : "No description available"}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Address</h5>
        <h4 className="text-sm text-gray-700 pt-1">{sellerData?.address}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Phone Number</h5>
        <h4 className="text-sm text-gray-700 pt-1">
          {sellerData?.phoneNumber}
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Total Products</h5>
        <h4 className="text-sm text-gray-700 pt-1">{productData?.length}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Shop Reviews</h5>
        <h4 className="text-sm text-gray-700 pt-1">{averageRating}/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Joined On</h5>
        <h4 className="text-sm text-gray-700 pt-1">
          {sellerData?.createdAt.slice(0, 10)}
        </h4>
      </div>
      {IsShopOwner && (
        <div className=" flex flex-col gap-2 pt-3 pb-4">
          <div className="px-2">
            <Link to={"/shop/settings"}>
              <div
                className={`${styles.button} w-full h-[42px] !m-0 rounded-md`}
              >
                <span className="text-white">Edit Shop</span>
              </div>
            </Link>
          </div>
          <div className="px-2">
            <div
              className={`${styles.button} !m-0 w-full h-[42px] rounded-md`}
              onClick={() => handleLogout(sellerData)}
            >
              <span className="text-white">Log Out</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
