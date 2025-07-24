import React, { useEffect, useState } from "react";
import { productData } from "../../static/data.jsx";
import ProductCard from "../layout/ProductCard.jsx";
import { Link, useParams } from "react-router-dom";
import styles from "../../style/style.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { productsLoad } from "../../redux/actions/productsLoad.js";
import Loader from "../Animations/Loader.jsx";

const ShopProfileData = ({ IsShopOwner }) => {
  const [productData, setProductData] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(1);
  const {allProducts} = useSelector((state) => state.allProducts )
  const { id } = useParams();
  useEffect(() => {
     const fetchProductDetails = () => {
       if (allProducts && allProducts.length > 0) {
         const products = allProducts.filter(
           (product) => product.shop._id === id
         );
         setProductData(products || null);
       }
     };
 
     fetchProductDetails();
   }, [allProducts, id]); // ❗ Make sure to depend on updated productName & allProducts
 

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between border-b border-gray-300  mb-8">
        <div className="flex items-center gap-6">
          {[
            { label: "Shop Products", id: 1 },
            { label: "Running Events", id: 2 },
            { label: "Shop Reviews", id: 3 },
          ].map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="relative group cursor-pointer transition-all"
            >
              <h5
                className={`font-semibold text-[16px] transition-colors duration-200 ${
                  active === tab.id
                    ? "text-red-600"
                    : "text-gray-700 group-hover:text-red-500"
                }`}
              >
                {tab.label}
              </h5>
            </div>
          ))}
        </div>
        {IsShopOwner && (
          <Link to={"/dashboard"}>
            <button className={`${styles.button} `}>
              <span className="text-white">Go to Dashboard</span>
            </button>
          </Link>
        )}
      </div>
      {
        loading && (
          <Loader />
        )
      }
    {
      productData && !loading && (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[30px]  mb-12 border-0">
        {productData &&
          productData.map((data, index) => (
            <ProductCard product={data} key={index} />
          ))}
      </div>
      )
    }
    </div>
  );
};

export default ShopProfileData;
