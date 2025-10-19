import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../style/style.js";
import { allOrdersLoad } from "../../redux/actions/allOrdersLoad.js";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const UserOrderDetail = () => {
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    allOrdersLoad(dispatch, user?._id);
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);
  console.log(data);
  const submitComment = async() => {
    
  }

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5 ">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${item?.images[0]}`}
              alt=""
              className="w-[80x] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item.discountPrice} x {item.qty}
              </h5>
            </div>
            {data?.status === "Delivered" && (
              <div
                className={`${styles.button} text-white`}
                onClick={() => setOpen(true) || setSelectedItem(item)}
              >
                Write a review
              </div>
            )}
          </div>
        ))}

      {/* Review Popup */}
      {open && (
        <div className="w-full h-screen fixed top-0 left-0 bg-[#00000067] flex justify-center items-center">
          <div className="w-[50%] h-[80vh] bg-white p-3 shadow rounded-md">
            <div className="flex justify-end p-3 w-full">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-3xl font-semibold text-gray-700 mb-3 text-center">
              Write a review
            </h2>
            <br />
            <div className="w-full flex">
              <img src={`${import.meta.env.VITE_BACKEND_URL}/${selectedItem.images[0]}`} alt="" className="h-[80px] w-[80px] object-cover" />
              <div className="flex flex-col">
                <div className="text-[20px] pl-3 font-semibold mb-2">
                {selectedItem.name}
              </div>
              <div className="text-[20px] pl-3">
                $US{selectedItem.discountPrice} * {selectedItem.qty}
              </div>
              </div>
            </div>
            <br />
            <br />
          {/* Ratings */}
          <div className="text-[20px] pl-3 font-[500]">
            Give a rating <span className="text-red-500">*</span>
          <div className="flex">
              {
              [1,2,3,4,5].map((i) => (
                rating >= i ? (
                  <AiFillStar 
                   size={25}
                   color="#fbc219"
                   onClick={() => setRating(i)}
                   className="cursor-pointer"
                  />
                ) : (
                   <AiOutlineStar 
                   size={25}
                   color="#fbc219"
                   onClick={() => setRating(i)}
                   className="cursor-pointer"
                  />
                )
              ))
            }
          </div>
           <div className="mt-4">
            <label className="pb-2 text-[20px]  font-[500]">
              Write a comment <span className="text-gray-600 text-[15px]">(optional)</span>
            </label>
            <textarea
              cols={20}
              rows={5}
              type="text"
              name="comment"
              className="w-[95%] mt-2 appearance-none block  border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3 pt-2"
              placeholder="Write your experience about the product..."
            ></textarea>
          </div>
          <div className="">
            <button className={`${styles.button} text-white`}
            onClick={submitComment}
            >
              Submit
            </button>
          </div>
          </div>
          </div>
        </div>
      )}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full md:flex items-center">
        <div className="w-full md:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.city}</h4>
          <h4 className=" text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full md:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
      </div>
      <br />
      <Link to="/">
        <div className={`${styles.button} text-white`}>Send Message</div>
      </Link>
      <br />
    </div>
  );
};

export default UserOrderDetail;
