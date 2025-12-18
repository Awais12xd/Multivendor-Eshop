import React, { useEffect, useState } from "react";
import styles from "../../style/style.js";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "../../redux/actions/wishlist.js";
import { toast } from "react-toastify";
import { addToCartAction } from "../../redux/actions/cart.js";
import Ratings from "./Ratings.jsx";
import axios from "axios";

const ProductDetails = ({ product }) => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const [select, setSelect] = useState(0);
  const [count, setCount] = useState(0);
  const [info, setInfo] = useState(null);
  const { allProducts } = useSelector((state) => state.allProducts);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user, isAuth } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchProductDetails = () => {
      if (allProducts && allProducts.length > 0) {
        const products = allProducts.filter(
          (i) => i.shop._id === product.shopId
        );
        setInfo(products || null);
      }
    };

    fetchProductDetails();
    const existed = wishlist && wishlist.find((i) => i._id === product._id);
    if (existed) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [allProducts, product, wishlist]);

  const increamentCount = () => {
    setCount(count + 1);
  };
  const decreamentCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToWishlist = (data) => {
    setClick(true);
    dispatch(addToWishlistAction(data));
  };
  const handleRemoveFromWishlist = (data) => {
    setClick(false);
    dispatch(removeFromWishlistAction(data));
  };

  const handleMessageClick = async () => {
    if (isAuth) {
      const groupTitle = product._id + user._id;
      const userId = user._id;
      const sellerId = product.shop._id;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/conversation/create-conversation`,
         { groupTitle,userId,sellerId}
        );
        if (res.data.success) {
          navigate(`/user-inbox?${res.data.data._id}`)
          toast.success(res.data.message);
        }
        if (res.data.success === false) {
          setError(res.data.message);
          toast.error(res.data.message);
        }
      } catch (err) {
        if (err.response) {
          console.log("Error response:", err.response.data);
          toast.error(err.response.data.message);
        } else {
          console.log("Error:", err.message);
          toast.error(err.message);
        }
      }
    } else {
      toast.error("Login to create a conversation with seller !");
    }
  };

  const addToCartHandler = (id) => {
    const existed = cart && cart.find((i) => i._id == id);
    if (product.stock < count) {
      return toast.error("Stock is limited");
    }
    if (existed) {
      toast.error("Product already added in the cart!");
    } else {
      const cartData = { ...product, qty: count === 0 ? 1 : count };
      dispatch(addToCartAction(cartData));
      toast.success("Product added to cart successfully!");
    }
  };

  return (
    <div className="bg-white pb-6">
      {product ? (
        <div className={`${styles.section}  md:w-[80%] w-[90%] `}>
          <div className="w-full py-5">
            <div className="flex flex-col  md:flex-row w-full md:gap-4 gap-8">
              <div className="w-full md:w-[50%]">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    product.images && product.images[select]
                  }`}
                  alt=""
                  className="w-[80%] object-contain mb-4"
                />
                <div className="flex w-full flex-wrap">
                  {product?.images.map((image, index) => (
                    <div
                      onClick={() => setSelect(index)}
                      key={index}
                      className={`${
                        select === index ? "border" : ""
                      } border-gray-300 cursor-pointer w-`}
                    >
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/${
                          product.images && product.images[index]
                        }`}
                        className="w-full object-cover md:w-[200px] h-[180px]"
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-[50%] ">
                <h1 className={`${styles.productTitle} text-lg`}>
                  {product.name}
                </h1>
                <p className="text-md mt-2">{product.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {product.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {product.originalPrice}$
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div className="flex items-center">
                    <button
                      onClick={decreamentCount}
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out cursor-pointer"
                    >
                      -
                    </button>
                    <p className="bg-gray-200 text-gray-800 font-medium px-4 py-[8px] ">
                      {count}
                    </p>
                    <button
                      onClick={increamentCount}
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  {click ? (
                    <AiFillHeart
                      size={22}
                      className="cursor-pointer"
                      color="red"
                      title="Remove from wishlist"
                      onClick={() => handleRemoveFromWishlist(product)}
                    />
                  ) : (
                    <AiOutlineHeart
                      size={22}
                      className="cursor-pointer"
                      color="red"
                      title="Add to wishlist"
                      onClick={() => handleAddToWishlist(product)}
                    />
                  )}
                </div>
                <div
                  className={`${styles.button} bg-black mt-5 rounded-[4px] h-11`}
                  onClick={() => addToCartHandler(product._id)}
                >
                  <span className="flex text-white items-center rounded-[4px]">
                    Add to cart{" "}
                    <AiOutlineShoppingCart className="ml-2" size={23} />
                  </span>
                </div>
                <div className="flex gap-8 items-center mt-10">
                  <Link to={`/shop/${product.shopId}`} className="flex">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${
                        product.shop.avatar.url
                      }`}
                      className="w-[50px] h-[50px] rounded-full mr-2"
                      alt="Shop"
                    />
                    <div className="">
                      <h3 className={`${styles.shop_name}`}>
                        {product.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({product?.ratings || 0}/5) Ratings
                      </h5>
                    </div>
                  </Link>
                  <div
                    className={`${styles.button} bg-purple-700 mt-4 rounded-[4px] h-11 hover:opacity-85`}
                    onClick={handleMessageClick}
                  >
                    <span className="flex text-white items-center rounded-[4px]">
                      Send Message{" "}
                      <AiOutlineMessage className="ml-2" size={23} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailInfo product={product} info={info} />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailInfo = ({ product, info }) => {
  const [active, setActive] = useState(1);
  // Helper to safely get the length of info array
  const length = (arr) => (Array.isArray(arr) ? arr.length : 0);
  console.log(product , "product")

  return (
    <div className="bg-[#f5f6fb] px-3 lg:px-8 py-2 rounded  ">
      <div className="flex w-full justify-between pt-10 pb-1 border-b border-gray-300">
        <div className="relative">
          <h5
            className="text-[18px] px-1 leading-5 font-semibold cursor-pointer md:text-[20px] "
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[18px] px-1 leading-5 font-semibold cursor-pointer md:text-[20px] "
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[18px] px-1 leading-5 font-semibold cursor-pointer md:text-[20px] "
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <div className="py-3">
          <p className="py-2 text-[18px] leadin-8 pb-5 whitespace-pre-line">
            {product.description}
          </p>
        </div>
      ) : null}
      {active === 2 ? (
        <div className="flex flex-col items-center justify-center w-full py-3">
          {product &&
            product.reviews.map((item) => (
              <div className="w-full flex my-2">
                <img
                  className="h-[50px] w-[50px] object-cover rounded-full"
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    item?.user.avatar.url
                  }`}
                  alt=""
                />
                <div className="flex flex-col pl-3 space-y-1">
                  <div className="flex space-x-1 items-center">
                    <h2 className="font-[500]">{item.user.name}</h2>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="text-sm">{item.comment}</p>
                </div>
              </div>
            ))}
        </div>
      ) : null}
      {active === 3 ? (
        <div className="md:flex block p-5 w-full md:gap-5">
          <div className="w-full md:w-[70%] mb-6 md:mb-0">
            <Link to={`/shop/${product.shopId}`} className="flex">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/1000057564-1752550627673-877278503.png`}
                
                // ${
                //   product?.shop?.avatar?.url
                // }`}
                className="w-[50px] h-[50px] rounded-full mr-2"
                alt="Shop"
                // 000057564-1752550627673-877278503.png"

              />
              <div className="">
                <h3 className={`${styles.shop_name}`}>{product.shop.name}</h3>
                <h5 className="pb-3 text-[15px]">
                  ({product?.ratings || 0}/5) Ratings
                </h5>
              </div>
            </Link>
            <p className="mt-2 font-[500]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Perferendis necessitatibus magni facilis, veritatis neque beatae
              quae alias exercitationem at est, blanditiis quam deserunt vitae
              debitis eum. Eos architecto eum dignissimos, dolorem distinctio
              perferendis porro labore nemo, veniam nisi dicta, blanditiis animi
              sint. Praesentium cum dolorem vero quasi eum. Quo commodi,
              molestias cum officiis mollitia possimus inventore eligendi
              adipisci itaque expedita veniam asperiores fugit tempore iusto
              sunt ipsa voluptas similique! Quas?
            </p>
          </div>
          <div className="w-full md:w-[30%] flex flex-col items-end gap-3 md:mt-4">
            <div className="text-left ">
              <p className="font-semibold whitespace-nowrap">
                Joined on :{" "}
                <span className="font-[500]">
                  {product.shop.createdAt.slice(0, 10)}
                </span>
              </p>
            </div>
            <div className="text-left">
              <p className="font-semibold whitespace-nowrap">
                Total Products :{" "}
                <span className="font-[500]">{length(info)}</span>
              </p>
            </div>
            <div className="text-left">
              <p className="font-semibold whitespace-nowrap">
                Total Reviews :{" "}
                <span className="font-[500]">{product?.reviews.length}</span>
              </p>
            </div>
            <Link
              to={`/shop/${product.shopId}`}
              className={`${styles.button} mt-4 rounded-[4px] h-11 hover:opacity-85`}
            >
              <div className="flex text-white items-center rounded-[4px]">
                Visit Shop
              </div>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
