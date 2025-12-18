import React, { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import "../../App.css";
import styles from "../../style/style";
import { BiCartAdd, BiMinus } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlistAction } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCartAction } from "../../redux/actions/cart";

const WishList = ({ setOpenWish }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.
    cart);

   const dispatch = useDispatch();
    const handleRemoveFromCart = (data) => {
      dispatch(removeFromWishlistAction(data));
    };
    
    const addToCartHandler = (product) => {
        const existed = cart && cart.find((i) => i._id == product._id);
        if (existed) {
          toast.error("Product already added in the cart!");
        } else {
          const cartData = { ...product, qty: 1 };
          dispatch(addToCartAction(cartData));
          toast.success("Product added to cart successfully!");
        }
      };
  return (
    <div className="absolute z-1000 top-0 left-0 w-full h-screen bg-[#0000005f]">
      <div className="fixed top-0 right-0 flex flex-col justify-between w-[70%]  shadow-sm bg-white h-full md:w-[35%] ">
        {wishlist && wishlist.length === 0 ? (
          <>
            <div className="flex justify-end w-full pt-5 pr-5 ">
              <RxCross1
                className="cursor-pointer"
                size={25}
                onClick={() => setOpenWish(false)}
              />
            </div>
            <div className="w-full h-screen flex justify-center items-center">
              <h3 className="font-semibold">The wishlist is empty</h3>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-between h-full">
              <div className="">
                <div className="flex justify-end w-full pt-5 pr-5 ">
                  <RxCross1
                    className="cursor-pointer"
                    size={25}
                    onClick={() => setOpenWish(false)}
                  />
                </div>
                <div className="flex items-center p-4 ">
                  <AiOutlineHeart size={25} />
                  <h5 className="pl-3 text-[20px] font-[500]">
                    {wishlist && wishlist.length} Items
                  </h5>
                </div>
                <div className="border-t border-slate-300 mt-4">
                  {wishlist &&
                    wishlist.map((data, index) => (
                      <SingleWishBox wish={data} key={index} handleRemoveFromCart={handleRemoveFromCart} addToCartHandler={addToCartHandler} />
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SingleWishBox = ({ wish , handleRemoveFromCart , addToCartHandler   }) => {
  const [value, setValue] = useState(1);
  const totalPrice = wish.discountPrice * value;
  return (
    <>
      <div className="border-b border-slate-300 p-4">
        <div className="w-full flex items-center gap-2 justify-between">
          <div className="cancel flex items-center">
            <RxCross1 className="cursor-pointer"
            onClick={() => handleRemoveFromCart(wish)}
            size={17} />
          </div>
          <div className="image">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${wish.images[0]}`}
              className="w-[160px] h-min object-contain  "
              alt="product"
            />
          </div>
          <div className="product-details flex flex-col ">
            <p className="line-clamp-3  self-start text-slate-700 text-[18px] font-[500]">
              {wish.name}
            </p>
            <span className="my-2 text-gray-500 font-[500] text-sm">
              ${wish.discountPrice} * {value}
            </span>
            <h2 className="text-orange-600 font-semibold text-lg self-start ">
              US${totalPrice}
            </h2>
          </div>
          <div className="cancel flex items-center">
            <BiCartAdd
              className="cursor-pointer text-gray-600 ml-1"
              size={22}
              onClick={() => addToCartHandler(wish)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
