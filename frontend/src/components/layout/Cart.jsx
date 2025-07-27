import React, { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../redux/actions/cart.js";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleQuantityChange = (data) => {
    dispatch(addToCartAction(data));
  };
  const handleRemoveFromCart = (data) => {
    dispatch(removeFromCartAction(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  return (
    <div className="absolute z-10 top-0 left-0 w-full h-screen bg-[#0000005f] overflow-y-auto">
      <div className="fixed top-0 right-0 flex flex-col justify-between  shadow-sm bg-white h-full md:w-[25%] w-[60%] overflow-y-scroll">
        {cart && cart.length === 0 ? (
          <>
            <div className="flex justify-end w-full pt-5 pr-5 ">
              <RxCross1
                className="cursor-pointer"
                size={25}
                onClick={() => setOpenCart(false)}
              />
            </div>
            <div className="w-full h-screen flex justify-center items-center">
                <h3 className="font-semibold">The cart is empty</h3>
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
                    onClick={() => setOpenCart(false)}
                  />
                </div>
                <div className="flex items-center p-4 ">
                  <FaShoppingBag size={25} />
                  <h5 className="pl-3 text-[20px] font-[500]">
                    {cart.length} Items
                  </h5>
                </div>
                <div className="border-t border-slate-300 mt-4">
                  {cart &&
                    cart.map((data, index) => (
                      <SingleCartBox
                        data={data}
                        key={index}
                        handleQuantityChange={handleQuantityChange}
                        handleRemoveFromCart={handleRemoveFromCart}
                      />
                    ))}
                </div>
              </div>
              <div className={` w-full text-white px-4 mb-3 mt-3 flex`}>
                <Link
                  to={"/checkout"}
                  className="h-12 bg-orange-600 w-full flex items-center justify-center rounded-md cursor-pointer hover:opacity-85 uppercase font-[500]"
                >
                  CheckOut Now (USD${totalPrice})
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SingleCartBox = ({
  data,
  handleQuantityChange,
  handleRemoveFromCart,
}) => {
  const [value, setValue] = useState(data?.qty);
  const totalPrice = data.discountPrice * value;
  const increment = () => {
    if (data.stock < value) {
      return toast.error("Product stock is limited!");
    } else {
      setValue(value + 1);
      handleQuantityChange({ ...data, qty: value + 1 });
    }
  };
  const decreament = () => {
    setValue(value === 1 ? 1 : value - 1);
    handleQuantityChange({ ...data, qty: value === 1 ? 1 : value - 1 });
  };

  return (
    <>
      <div className="border-b border-slate-300 p-4">
        <div className="w-full flex items-center gap-2 justify-between">
          <div className="for-value-changes flex flex-col justify-center items-center  ">
            <div
              className="bg-orange-600 text-white p-3 rounded-full w-6 h-6 cursor-pointer flex justify-center items-center"
              onClick={increment}
            >
              <span>+</span>
            </div>
            <div className="">{value}</div>
            <div
              className="flex justify-center  cursor-pointer items-center bg-gray-200  p-3 rounded-full w-6 h-6"
              onClick={decreament}
            >
              <span>-</span>
            </div>
          </div>
          <div className="image w-[160px] h-min ">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${data.images[0]}`}
              className="w-[160px]  h-min object-contain "
              alt="product"
            />
          </div>
          <div className="product-details flex flex-col">
            <p className="line-clamp-3  self-start text-slate-700 text-[18px] font-[500]">
              {data.name}
            </p>
            <span className="my-2 text-gray-500 font-[500] text-sm">
              ${data.discountPrice} * {value}
            </span>
            <h2 className="text-orange-600 font-semibold text-lg self-start ">
              US${totalPrice}
            </h2>
          </div>
          <div
            className="cancel flex items-center"
            onClick={() => handleRemoveFromCart(data)}
          >
            <RxCross1 className="cursor-pointer" size={17} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
