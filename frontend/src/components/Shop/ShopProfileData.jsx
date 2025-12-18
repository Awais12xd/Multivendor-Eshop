import React, { useEffect, useState } from "react";
import { productData } from "../../static/data.jsx";
import ProductCard from "../layout/ProductCard.jsx";
import { Link, useParams } from "react-router-dom";
import styles from "../../style/style.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { productsLoad } from "../../redux/actions/productsLoad.js";
import Loader from "../Animations/Loader.jsx";
import Ratings from "../Products/Ratings.jsx";

const ShopProfileData = ({ IsShopOwner }) => {
  const [productData, setProductData] = useState(null);
  const dispatch = useDispatch();
  const { allEvents, isloading } = useSelector((state) => state.allEvents);

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(1);
  const { allProducts } = useSelector((state) => state.allProducts);
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

  const allReviews =
    productData && productData.map((product) => product.reviews).flat();
  console.log(allReviews);
  return (
    <div className="w-full mb-5">
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
          <Link
            to={"/dashboard"}
            className="absolute top-0 right-3 md:top-13 z-100"
          >
            <button className={`${styles.button} `}>
              <span className="text-white ">Go to Dashboard</span>
            </button>
          </Link>
        )}
      </div>
      {loading && <Loader />}
      {active === 1 && productData && !loading && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[30px]  mb-12 border-0">
          {productData &&
            productData.map((data, index) => (
              <ProductCard product={data} key={index} />
            ))}
        </div>
      )}
      {active === 2 && allEvents && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[30px]  mb-12 border-0">
          {allEvents &&
            allEvents.map((data, index) => (
              <ProductCard product={data} key={index} eventData={true} />
            ))}
        </div>
      )}
      {active === 3 &&
        (Array.isArray(allReviews) && allReviews.length > 0 ? (
          allReviews.map((item, index) => {
            // safe values
            const id = item?._id ?? item?.user?._id ?? index;
            const name = item?.user?.name ?? "Unknown";
            const rating = item?.rating ?? 0;
            const comment = item?.comment ?? "";

            // avatar fallback + normalize the URL so we don't end up with double slashes
            const rawAvatar = item?.user?.avatar?.url ?? "defaults/avatar.png";
            const backend = (import.meta.env.VITE_BACKEND_URL || "").replace(
              /\/+$/,
              ""
            ); // strip trailing slash
            const avatarPath = String(rawAvatar).replace(/^\/+/, ""); // strip leading slash
            const avatarSrc = `${backend}/${avatarPath}`;

            return (
              <div key={id} className="w-full flex my-5">
                <img
                  className="h-[50px] w-[50px] object-cover rounded-full"
                  src={avatarSrc}
                  alt={`${name}'s avatar`}
                  onError={(e) => {
                    e.currentTarget.src = "/defaults/avatar.png";
                  }} // optional: local fallback if image fails
                />
                <div className="flex flex-col pl-3 space-y-1">
                  <div className="flex space-x-1 items-center">
                    <h2 className="font-[500]">{name}</h2>
                    <Ratings rating={rating} />
                  </div>
                  <p className="text-sm">{comment}</p>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="w-full text-center">No reviews!</h1>
        ))}
    </div>
  );
};

export default ShopProfileData;
