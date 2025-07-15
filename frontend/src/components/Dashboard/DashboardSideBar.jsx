import React from "react";
import { AiFillBell, AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { BiMessageDetail, BiMessageSquareDetail } from "react-icons/bi";
import {HiOutlineReceiptRefund} from "react-icons/hi"
import { FaMoneyBill } from "react-icons/fa";
import { FiPackage, FiSettings, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import {VscNewFile} from "react-icons/vsc"
import { Link } from "react-router-dom";

const DashboardSideBar = ({ active, setActive }) => {
  return (
    <div className="flex flex-col gap-1 w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* Single Item */}
      <div className="flex items-center w-full p-4">
        <Link to={"/dashboard"} className="w-full flex items-center">
          <RxDashboard
            size={30}
            className={active === 1 ? "text-red-500" : "text-gray-700"}
          />
          <h5
            className={`${
              active === 1 ? "text-red-500" : "text-gray-700"
            } pl-3 text-lg font-normal  hidden md:block`}
          >
            Dashboard
          </h5>
        </Link>
      </div>
      <div className="flex items-center w-full p-4">
        <Link to={"/dashboard/orders"} className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            className={active === 2 ? "text-red-500" : "text-gray-700"}
          />
          <h5
            className={`${
              active === 2 ? "text-red-500" : "text-gray-700"
            } pl-3 text-lg font-normal hidden md:block`}
          >
            All Orders
          </h5>
        </Link>
      </div>
      <div className="flex items-center w-full p-4">
        <Link to={"/dashboard/products"} className="w-full flex items-center">
          <FiPackage
            size={30}
            className={active === 3 ? "text-red-500" : "text-gray-700"}
          />
          <h5
            className={`${
              active === 3 ? "text-red-500" : "text-gray-700"
            } pl-3 text-lg font-normal hidden md:block`}
          >
            All Products
          </h5>
        </Link>
      </div>
      <div className="flex items-center w-full p-4">
        <Link to={"/dashboard/create-product"} className="w-full flex items-center">
          <AiOutlineFolderAdd
            size={30}
            className={active === 4 ? "text-red-500" : "text-gray-700"}
          />
          <h5
            className={`${
              active === 4 ? "text-red-500" : "text-gray-700"
            } pl-3 text-lg font-normal hidden md:block`}
          >
            Create Product
          </h5>
        </Link>
      </div>
    
      <div className="flex items-center w-full p-4">
        <Link to={"/dashboard/all-events"} className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            className={active === 5 ? "text-red-500" : "text-gray-700"}
          />
          <h5
            className={`${
              active === 5 ? "text-red-500" : "text-gray-700"
            } pl-3 text-lg font-normal hidden md:block`}
          >
            All Events
          </h5>
        </Link>
      </div>
      <div className="flex items-center w-full p-4">
        <Link to={"/dashboard/create-event"} className="w-full flex items-center">
          <VscNewFile
            size={30}
            className={active === 6 ? "text-red-500" : "text-gray-700"}
          />
          <h5
            className={`${
              active === 6 ? "text-red-500" : "text-gray-700"
            } pl-3 text-lg font-normal hidden md:block`}
          >
            Create Event
          </h5>
        </Link>
      </div>
      <div className="flex items-center w-full p-4">
        <Link to={"/dashboard/withdraw"} className="w-full flex items-center">
          <FaMoneyBill
            size={30}
            className={active === 7 ? "text-red-500" : "text-gray-700"}
          />
          <h5
            className={`${
              active === 7 ? "text-red-500" : "text-gray-700"
            } pl-3 text-lg font-normal hidden md:block`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>
      <div className="flex items-center w-full p-4">
        <Link to={"/dashboard/shop-inbox"} className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            className={active === 8 ? "text-red-500" : "text-gray-700"}
          />
          <h5
            className={`${
              active === 8 ? "text-red-500" : "text-gray-700"
            } pl-3 text-lg font-normal hidden md:block`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>
      <div className="flex items-center w-full p-4">
        <Link to={"/dashboard/coupons"} className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            className={active === 9 ? "text-red-500" : "text-gray-700"}
          />
          <h5
            className={`${
              active === 9 ? "text-red-500" : "text-gray-700"
            } pl-3 text-lg font-normal hidden md:block`}
          >
            Discount Code
          </h5>
        </Link>
      </div>
      <div className="flex items-center w-full p-4">
        <Link to={"/dashboard/refunds"} className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            className={active === 10 ? "text-red-500" : "text-gray-700"}
          />
          <h5
            className={`${
              active === 10 ? "text-red-500" : "text-gray-700"
            } pl-3 text-lg font-normal hidden md:block`}
          >
            Refunds
          </h5>
        </Link>
      </div>
      <div className="flex items-center w-full p-4">
        <Link to={"/dashboard/settings"} className="w-full flex items-center">
          <FiSettings
            size={30}
            className={active === 11 ? "text-red-500" : "text-gray-700"}
          />
          <h5
            className={`${
              active === 11 ? "text-red-500" : "text-gray-700"
            } pl-3 text-lg font-normal hidden md:block`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
