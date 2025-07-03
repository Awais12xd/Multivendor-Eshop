import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitch,
} from "react-icons/ai";
import { footercompanyLinks, footerProductLinks, footerSupportLinks } from "../../static/data";
import { Link } from "react-router-dom";

const imageUrl = "https://shopo.quomodothemes.website/assets/images/logo.svg";

const Footer = () => {
  return (
    <>
      <div className="bg-black text-white">
        <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-blue-800 py-7">
          <h1 className="lg:text=4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
            <span className="text-green-400">Subscribe</span> us for get news{" "}
            <br /> events and offers
          </h1>
          <div className="">
            <input
              type="text"
              required
              placeholder="Enter Your email..."
              className="text-gray-800 md:w-72 w-full sm:mr-5 mr-1 mb-4 py-2.5 rounded-md px-2 outline-none bg-white"
            />
            <button className="bg-green-400 hover:bg-teal-50 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full hover:text-black cursor-pointer">
              Submit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center ">
          <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
            <img
              src={imageUrl}
              alt=""
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <br />
            <p>The home and elements needed to create beautifull products.</p>
            <div className="flex items-center mt-[15px]">
              <AiFillFacebook size={25} className="cursor-pointer" />
              <AiOutlineTwitch
                size={25}
                className=" cursor-pointer ml-[15px]"
              />
              <AiFillYoutube size={25} className="cursor-pointer ml-[15px]" />
              <AiFillInstagram size={25} className="cursor-pointer ml-[15px]" />
            </div>
          </ul>
          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold" >Company</h1>
            {footerProductLinks.map((link) => (
                <li key={link.name}>
                    <Link to={link.link}
                    className="text-gray-400 hover:text-teal-400 duration-300 "
                    >
                        {link.name}
                    </Link>
                </li>
            ))}
          </ul>
          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold" >Shop</h1>
            {footercompanyLinks.map((link) => (
                <li key={link.name}>
                    <Link to={link.link}
                    className="text-gray-400 hover:text-teal-400 duration-300 "
                    >
                        {link.name}
                    </Link>
                </li>
            ))}
          </ul>
          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold" >Support</h1>
            {footerSupportLinks.map((link) => (
                <li key={link.name}>
                    <Link to={link.link}
                    className="text-gray-400 hover:text-teal-400 duration-300 "
                    >
                        {link.name}
                    </Link>
                </li>
            ))}
          </ul>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt--2 text-gray-400 text-sm pb-8">
             <span>2025 Awais Ali. All rights reserved.</span>
             <span>Terms . Privacy Policy.</span>
             <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
          </div>
      </div>
    </>
  );
};

export default Footer;
