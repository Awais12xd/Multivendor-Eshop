import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../style/style";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import QuickProductView from "./QuickProductView.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "../../redux/actions/wishlist.js";
import { addToCartAction } from "../../redux/actions/cart.js";
import { toast } from "react-toastify";
import Ratings from "../Products/Ratings.jsx";

const ProductCard = ({ product, eventData }) => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);


  useEffect(() => {
    const existed = wishlist && wishlist.find((i) => i._id === product._id);
    if (existed) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const addToCartHandler = (id) => {
    const existed = cart && cart.find((i) => i._id == id);
    if (existed) {
      toast.error("Product already added in the cart!");
    } else {
      const cartData = { ...product, qty: 1 };
      dispatch(addToCartAction(cartData));
      toast.success("Product added to cart successfully!");
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

  return (
    <div className="w-full relative h-[410px] md:h-[390px] p-3 cursor-pointer rounded-lg shadow-sm bg-white flex flex-col justify-between">
      <div>
        <div className="flex justify-end"></div>
        <div>
          <Link
            to={
              eventData === true
                ? `/product/${product._id}?eventData=true`
                : `/product/${product._id}`
            }
            className="w-full flex justify-center"
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${product?.images[0]}`}
              alt="Product"
              className="h-[220px] md:h-[170px] object-contain w-[80%]"
            />
          </Link>
          <Link
            className={`${styles.shop_name}`}
            to={`/shop/${product.shopId}`}
          >
            {product.shop.name}
          </Link>
        </div>
        <Link to={
              eventData === true
                ? `/product/${product._id}?eventData=true`
                : `/product/${product._id}`
            }>
          <div>
            <h4 className="pb-3 font-[500]">
              {product.name.length > 40
                ? product.name.slice(0, 40) + "..."
                : product.name}
            </h4>
            <div className="flex">
              <Ratings rating={product?.ratings} />
            </div>
            <div className="mt-2">
              <p className="line-clamp-2 text-[14px] font-[400]">{product?.description}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex py-2 justify-between items-center mt-2">
        <div className="flex">
          <h5 className={`${styles.productDiscountPrice}`}>
            {product.discountPrice}$
          </h5>
          <h4 className={`${styles.price}`}>{product.originalPrice + "$"}</h4>
        </div>
        <p className="text-green-400 font-[500]">{product.sold_out} Sold</p>
      </div>
      <div className="">
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            color="red"
            title="Remove from wishlist"
            onClick={() => handleRemoveFromWishlist(product)}
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            color="red"
            title="Add to wishlist"
            onClick={() => handleAddToWishlist(product)}
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-13 text-gray-800"
          title="Quick View"
          onClick={() => setOpen(!open)}
        />
        <AiOutlineShoppingCart
          size={24}
          className="cursor-pointer absolute right-2 top-22 text-gray-800"
          title="Add to cart"
          onClick={() => addToCartHandler(product._id)}
        />
        {open ? <QuickProductView setOpen={setOpen} data={product} /> : null}
      </div>
    </div>
  );
};

export default ProductCard;
