import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../style/style";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";

const QuickProductView = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);

  const handleMessageClick = () => {};

  const increamentCount = () => {
    setCount(count + 1);
  };
  const decreamentCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className="fixed h-screen w-full top-0 left-0 bg-[#00000058] z-40 flex items-center justify-center">
          <div className="w-[90%] md:w-[60%] h-[90vh] overflow-y-scroll md:h[75vh] bg-white rounded-md shadow-sm relative p-4 ">
            <RxCross1
            size={25}
              className="absolute top-3 right-3 z-20"
              onClick={() => setOpen(false)}
            />
            <div className="w-full lg:flex block">
              <div className="w-full lg:w-[50%]">
                <img src={data.image_Url[0].url} alt="" />
                <div className="flex">
                  <img
                    src={data.shop.shop_avatar.url}
                    className="w-[50px] h-[50px] rounded-full mr-2"
                    alt="Shop"
                  />
                  <div className="">
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-black mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageClick}
                >
                  <span className="flex text-white items-center rounded-[4px]">
                    Send Message <AiOutlineMessage className="ml-2" size={23} />
                  </span>
                </div>
                <h5 className="text-[16px] text-red-500 font-semibold p-2">
                  ({data.total_sell}) Sold out
                </h5>
              </div>
              <div className="w-full lg:w-[50%] pt-5 pl-1 pr-1">
                <h1 className={`${styles.productTitle} text-lg`}>
                  {data.name}
                </h1>
                <p className="text-lg mt-2">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div className="flex items-center">
                    <button
                      onClick={decreamentCount}
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    >
                      -
                    </button>
                    <p className="bg-gray-200 text-gray-800 font-medium px-4 py-[8px] ">
                      {count}
                    </p>
                    <button
                      onClick={increamentCount}
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    >
                      +
                    </button>
                  </div>
                  {click ? (
                    <AiFillHeart
                      size={25}
                      className="cursor-pointer"
                      color="red"
                      title="Remove from wishlist"
                      onClick={() => setClick(!click)}
                    />
                  ) : (
                    <AiOutlineHeart
                      size={25}
                      className="cursor-pointer"
                      color="red"
                      title="Add to wishlist"
                      onClick={() => setClick(!click)}
                    />
                  )}
                </div>
                 <div
                  className={`${styles.button} bg-black mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageClick}
                >
                  <span className="flex text-white items-center rounded-[4px]">
                    Add to cart <AiOutlineShoppingCart className="ml-2" size={23} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default QuickProductView;
