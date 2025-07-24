import React, { useState } from "react";
import styles from "../../style/style.js";
import { Link, Links } from "react-router-dom";
import { productData, categoriesData } from "../../static/data.jsx";

import {
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import Cart from "./Cart.jsx";
import WishList from "./WishList.jsx";
import { RxCross1 } from "react-icons/rx";

const imageUrl = "https://shopo.quomodothemes.website/assets/images/logo.svg";

const Header = ({ activeHeading }) => {
  const { isAuth, user } = useSelector((state) => state.user);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWish, setOpenWish] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { allProducts } = useSelector((state) => state.allProducts);

  const {cart} = useSelector((state) => state.cart);
  const {wishlist} = useSelector((state) => state.wishlist)

  const handleOnChangeSearch = async (e) => {
    const term = e.target.value;
    setSearchText(term);

    if (term.trim() !== "") {
      const filteredData =
        (allProducts &&
          allProducts?.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
          )) ||
        [];

      setSearchData(filteredData);
    } else {
      // Clear results when input is empty
      setSearchData([]);
    }
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section} md:block hidden`}>
        <div className="hidden md:flex h-[50px] my-[20px] justify-between items-center ">
          <div className="">
            <Link to="/">
              <img src={imageUrl} alt="logo shop" className="" />
            </Link>
          </div>
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              id="search"
              onChange={handleOnChangeSearch}
              value={searchText}
              className="border-[2px] w-full border-blue-500 px-2 h-[40px] outline-none rounded-lg"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-[6px] cursor-pointer font-light text-gray-600 "
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute  min-h-[30vh] p-4 shadow-sm-2 bg-slate-50 z-[9] w-full">
                {searchData &&
                  searchData.map((data, index) => {
                    const name = data.name;
                    const product_name = name.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${data._id}`} key={index}>
                        <div className="w-full flex items-center py-3 ">
                          <img
                            loading="lazy"
                            src={`${import.meta.env.VITE_BACKEND_URL}/${
                              data?.images[0]
                            }`}
                            alt="product"
                            className="w-[40px] object-cover h-[40] mr-[10px]"
                          />
                          <h1>{data.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button}`}>
            <Link to={"/create-shop"}>
              <h1 className="text-white flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden md:flex justify-between items-center w-full bg-blue-600 h-[70px] `}
      >
        <div
          className={`${styles.section} relative flex items-center justify-between`}
        >
          <div className="relative h-[60px] w-[240px] hidden lg:block mt-3">
            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
            <button className="h-[100%] w-full flex items-center justify-between pl-10 bg-white font-[500] select-none rounded-t-md">
              All Categories
            </button>
            <IoIosArrowDown
              size={20}
              className="absolute right-2 top-4 cursor-pointer"
              onClick={() => setDropDown(!dropDown)}
            />
            {dropDown ? (
              <DropDown
                setDropDown={setDropDown}
                categoriesData={categoriesData}
              />
            ) : null}
          </div>

          <div className="flex items-center">
            <Navbar activeHeading={activeHeading} />
          </div>
          <div className="flex items-center">
            <div
              onClick={() => setOpenWish(true)}
              className="relative cursor-pointer mr-[15px]"
            >
              <AiOutlineHeart size={30} className="text-white" />
              <span className="w-4 h-4 absolute  bottom-4 right-0 p-0 m-0 rounded-full bg-green-400 text-white text-sm leading-tight text-center">
                {wishlist && wishlist.length}
              </span>
            </div>
            <div
              onClick={() => setOpenCart(true)}
              className="relative cursor-pointer mr-[15px]"
            >
              <AiOutlineShoppingCart size={30} className="text-white" />
              <span className="w-4 h-4 absolute bottom-4 right-0 p-0 m-0 rounded-full bg-green-400 text-white text-sm leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
            <div className="relative cursor-pointer mr-[15px]">
              {isAuth ? (
                <Link
                  to={"/profile"}
                  className="overflow-hidden rounded-full w-10 h-10"
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      user.avatar.url
                    }`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover "
                  />
                </Link>
              ) : (
                <Link to={"/login"}>
                  <CgProfile size={30} className="text-white" />
                </Link>
              )}
            </div>
          </div>
        </div>
        {openCart && <Cart setOpenCart={setOpenCart} />}
        {openWish && <WishList setOpenWish={setOpenWish} />}
      </div>
      {/* Mobile Responsive Header */}
      <div className="w-full h-[60px] bg-white fixed top-0 left-0 flex items-center shadow-sm md:hidden z-40 ">
        <div className="flex justify-between items-center w-full">
          <div className="">
            <BiMenuAltLeft
              onClick={() => setOpenSearch(true)}
              size={40}
              className="ml-4 cursor-pointer"
            />
          </div>
          {openSearch && (
            <>
              <div className="absolute z-10 top-0 left-0 w-full h-screen bg-[#0000005f]">
                <div className="fixed top-0 left-0 flex flex-col justify-between  shadow-sm bg-white h-full w-[60%] overflow-y-scroll">
                  <div className="flex flex-col  h-full">
                    <div className="flex justify-between items-center pt-5 px-4">
                      <div className="flex relative items-center cursor-pointer">
                        <AiOutlineHeart size={25} />
                        <span className="w-4 h-4 absolute bottom-4 left-3 p-0 m-0 rounded-full bg-green-400 text-white text-sm leading-tight text-center">
                          1
                        </span>
                      </div>
                      <div className="flex justify-end w-full  ">
                        <RxCross1
                          className="cursor-pointer"
                          size={25}
                          onClick={() => setOpenSearch(false)}
                        />
                      </div>
                    </div>
                    <div className="mt-8 px-3 ">
                      <input
                        type="text"
                        placeholder="Search Product..."
                        id="search"
                        onChange={handleOnChangeSearch}
                        value={searchText}
                        className="border-[2px] w-full border-blue-500 px-2 h-[40px] outline-none rounded-lg"
                      />
                      {searchData && searchData.length !== 0 ? (
                        <div className="absolute  min-h-[30vh] p-2 shadow-sm-2 bg-slate-50 z-[9] ">
                          {searchData &&
                            searchData.map((data, index) => {
                              const name = data.name;
                              const product_name = name.replace(/\s+/g, "-");
                              return (
                                <Link
                                  onClick={() => setOpenSearch(false)}
                                  to={`/product/${data._id}`}
                                >
                                  <div className="w-full flex items-center py-3 ">
                                    <img
                                      loading="lazy"
                                      src={data.image_Url[0].url}
                                      alt="product"
                                      className="w-[40px] object-cover h-[40px] mr-[10px]"
                                    />
                                    <h1 className="text-sm line-clamp-1">
                                      {data.name}
                                    </h1>
                                  </div>
                                </Link>
                              );
                            })}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex items-center relative mt-8">
                      <Navbar activeHeading={activeHeading} />
                    </div>
                    <div className={`${styles.button} ml-2`}>
                      <Link to={"/create-shop"}>
                        <h1 className="text-white flex items-center">
                          Become Seller <IoIosArrowForward className="ml-1" />
                        </h1>
                      </Link>
                    </div>
                    <div className="flex justify-center mt-5 items-center">
                      {isAuth ? (
                        <div className="">
                          <Link
                            to={"/profile"}
                            className="overflow-hidden rounded-full w-10 h-10"
                          >
                            <img
                              src={`${import.meta.env.VITE_BACKEND_URL}/${
                                user.avatar.url
                              }`}
                              alt="Profile"
                              className="w-12 h-12 rounded-full object-cover border-2 border-green-400"
                            />
                          </Link>
                        </div>
                      ) : (
                        <div className="">
                          <Link to={"/login"} className="text-md font-normal">
                            {" "}
                            Login /{" "}
                          </Link>
                          <Link to={"/sign-up"} className="text-md font-normal">
                            {" "}
                            Sign Up{" "}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="">
            <Link to="/">
              <img src={imageUrl} alt="logo shop" className=" cursor-pointer" />
            </Link>{" "}
          </div>
          <div
            onClick={() => setOpenCart(true)}
            className="relative cursor-pointer mr-[15px]"
          >
            <AiOutlineShoppingCart size={30} className="ite" />
            <span className="w-4 h-4 absolute bottom-4 right-0 p-0 m-0 rounded-full bg-green-400 text-white text-sm leading-tight text-center">
                {cart && cart.length}
              
            </span>
          </div>
          {openCart && <Cart setOpenCart={setOpenCart} />}
        </div>
      </div>
    </>
  );
};

export default Header;

// import React from "react";
// import styles from "../../style/style.js";
// import { Link } from "react-router-dom";

// const imageUrl = "https://shopo.quomodothemes.website/assets/images/logo.svg";

// const Header = () => {
//   return (
//     <div className={`${styles.section}`}>
//       <div className="hidden md:flex h-[60px] my-[20px] justify-between items-center">
//         <div>
//           <Link to="/">
//             <img
//               src={imageUrl}
//               alt="Shopo Logo"
//               className="w-auto h-10 object-contain"
//             />
//           </Link>
//         </div>
//         <div>Header</div>
//       </div>
//     </div>
//   );
// };

// export default Header;
