import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../style/style";
import Button from "@mui/material/Button";
import { MdTrackChanges } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  userAddressDelete,
  userAddressUpdate,
  userUpdate,
} from "../../redux/actions/userLoad.js";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";
import { allOrdersLoad } from "../../redux/actions/allOrdersLoad.js";
import Loader from "../Animations/Loader.jsx";
import UserInbox from "../Inbox/UserInbox.jsx";

const ProfileContent = ({ active }) => {
  const { user, error } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user?.name);
  const [email, setEmail] = useState(user && user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user?.phoneNumber);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !phoneNumber) {
      return toast.error("All fields are required!");
    }

    try {
      dispatch(userUpdate(name, email, password, phoneNumber));
    } catch (error) {
      toast.error("Error while updating , please try again!");
    }
  };

  const handleFilechange = async (e) => {
    const formData = new FormData();
    setAvatar(e.target.files[0]);
    formData.append("file", e.target.files[0]);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/user/change-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      window.location.reload(true);
      toast.success(res.data.message);
    } catch (err) {
      if (err.response) {
        console.log("Error response:", err.response.data);
        toast.error(err.response.data.message);
      } else {
        console.log("Error:", err.message);
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="w-full ">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.avatar.url}`}
                className="w-[150px] h-[150px] object-cover border-3 rounded-full border-green-400"
                alt=""
              />
              <div className="flex justify-center items-center absolute rounded-full w-[30px] h-[30px] bottom-1 right-1 cursor-pointer bg-[#e1e1e1]">
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={handleFilechange}
                />
                <label htmlFor="file" className="cursor-pointer">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-2 sm:px-3 md:px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="md:flex block w-full md:pb-3">
                <div className="mb-3 md:w-[50%] w-full">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} px-2 bg-white py-2 !w-[95%]`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3 md:w-[50%] w-full">
                  <label className="block pb-2">Email</label>
                  <input
                    type="email"
                    className={`${styles.input} px-2 bg-white py-2 !w-[95%]`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex block w-full md:pb-3">
                <div className="mb-3 md:w-[50%] w-full">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} px-2 bg-white py-2 !w-[95%]`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="mb-3 md:w-[50%] w-full">
                  <label htmlFor="email" className="block pb-2">
                    Password
                  </label>
                  <div className="relative w-[95%]">
                    <input
                      type={visible ? "text" : "password"}
                      name="password"
                      autoComplete="Current-Password"
                      id="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className={`${styles.input} px-2 bg-white py-2 md:w-full`}
                    />
                    {visible ? (
                      <FaRegEye
                        size={22}
                        className="cursor-pointer absolute top-2 right-3"
                        onClick={() => setVisible(!visible)}
                      />
                    ) : (
                      <FaRegEyeSlash
                        size={22}
                        className="cursor-pointer absolute top-2 right-3"
                        onClick={() => setVisible(!visible)}
                      />
                    )}
                  </div>
                </div>
              </div>
              <input
                type="submit"
                className="md:w-[250px] w-full text-blue-600 text-center cursor-pointer border border-blue-600 rounded-[3px] mt-8 h-[40px]"
                required
                value={"Update"}
              />
            </form>
          </div>
        </>
      )}
      {active === 2 && (
        <>
          <OrderGrid />
        </>
      )}
      {active === 3 && (
        <>
          <RefundOrderGrid />
        </>
      )}
      {/* {active === 4 && (
        <>
          <UserInbox />
        </>
      )} */}
      {active === 5 && (
        <>
          <TrackOrderChanges />
        </>
      )}
      {active === 6 && (
        <>
          <ChangePassword />
        </>
      )}
      {active === 7 && (
        <>
          <Address />
        </>
      )}
    </div>
  );
};

const OrderGrid = () => {
  // const orders = [
  //   {
  //     _id: "ORD-10001",
  //     orderItems: [{ name: "iPhone 15 Pro Max" }, { name: "AirPods Pro 2" }],
  //     totalPrice: 1699,
  //     orderStatus: "Delivered",
  //   },
  //   {
  //     _id: "ORD-10002",
  //     orderItems: [{ name: "MacBook Pro 14-inch" }],
  //     totalPrice: 2499,
  //     orderStatus: "Processing",
  //   },
  //   {
  //     _id: "ORD-10003",
  //     orderItems: [
  //       { name: "Apple Watch Ultra" },
  //       { name: "iPhone 14" },
  //       { name: "MagSafe Charger" },
  //     ],
  //     totalPrice: 1899,
  //     orderStatus: "Shipped",
  //   },
  //   {
  //     _id: "ORD-10004",
  //     orderItems: [{ name: "Samsung Galaxy S24 Ultra" }],
  //     totalPrice: 1399,
  //     orderStatus: "Cancelled",
  //   },
  //   {
  //     _id: "ORD-10005",
  //     orderItems: [{ name: "Google Pixel 8 Pro" }, { name: "Pixel Buds Pro" }],
  //     totalPrice: 1249,
  //     orderStatus: "Delivered",
  //   },
  //   {
  //     _id: "ORD-10006",
  //     orderItems: [
  //       { name: "Dell XPS 13" },
  //       { name: "Logitech MX Master 3S Mouse" },
  //     ],
  //     totalPrice: 1690,
  //     orderStatus: "Processing",
  //   },
  //   {
  //     _id: "ORD-10007",
  //     orderItems: [{ name: "Sony WH-1000XM5 Headphones" }],
  //     totalPrice: 399,
  //     orderStatus: "Shipped",
  //   },
  //   {
  //     _id: "ORD-10008",
  //     orderItems: [{ name: "iPad Pro 12.9-inch" }, { name: "Apple Pencil 2" }],
  //     totalPrice: 1449,
  //     orderStatus: "Delivered",
  //   },
  //   {
  //     _id: "ORD-10009",
  //     orderItems: [
  //       { name: "ASUS ROG Gaming Laptop" },
  //       { name: "Mechanical Keyboard" },
  //       { name: "Gaming Mouse" },
  //     ],
  //     totalPrice: 2099,
  //     orderStatus: "Processing",
  //   },
  //   {
  //     _id: "ORD-10010",
  //     orderItems: [{ name: "OnePlus 12" }],
  //     totalPrice: 899,
  //     orderStatus: "Delivered",
  //   },
  // ];
  const dispatch = useDispatch();
  const {orders , isloading} = useSelector((state) => state.orders);
  const {user} = useSelector((state) => state.user);
  console.log(orders)

  useEffect(() => {
    allOrdersLoad(dispatch,user._id);
  } , [])


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        if (params.row.status === "Delivered") return "text-green-600";
        if (params.row.status === "Processing") return "text-amber-600";
        if (params.row.status === "Cancelled") return "text-red-600";
        if (params.row.status === "Shipped") return "text-blue-600";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} color="black" />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      {
        isloading ? (
            <Loader />
        ) : (
            <div className=" pl-3 md:pl-7 pt-1">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight:true
            />
          </div>
        )
     }
    </>
  );
};
const RefundOrderGrid = () => {
  const dispatch = useDispatch();
  const {orders , isloading} = useSelector((state) => state.orders);
  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    allOrdersLoad(dispatch,user._id);
  } , [])

  const refundOrders = orders && orders.filter((item) => item.status === "Processing Refund" );


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        if (params.row.status === "Delivered") return "text-green-600";
        if (params.row.status === "Processing") return "text-amber-600";
        if (params.row.status === "Cancelled") return "text-red-600";
        if (params.row.status === "Shipped") return "text-blue-600";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} color="black" />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  refundOrders &&
    refundOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <>
      <div className="pl-7 pt-1">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight:true
        />
      </div>
    </>
  );
};
const TrackOrderChanges = () => {
 const dispatch = useDispatch();
  const {orders , isloading} = useSelector((state) => state.orders);
  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    allOrdersLoad(dispatch,user._id);
  } , [])


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        if (params.row.status === "Delivered") return "text-green-600";
        if (params.row.status === "Processing") return "text-amber-600";
        if (params.row.status === "Cancelled") return "text-red-600";
        if (params.row.status === "Shipped") return "text-blue-600";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} color="black" />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <>
      <div className="pl-7 pt-1">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight:true
        />
      </div>
    </>
  );
};
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `${import.meta.env.VITE_SERVER_URL}/user/change-password`,
          {
            oldPassword,
            newPassword,
            confirmPassword,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setNewPassword("");
            setOldPassword("");
            setConfirmPassword("");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="w-full px-4">
        <div className=" w-full flex flex-col">
          <h1 className={`${styles.heading} text-center mb-3 `}>
            Change Password
          </h1>
          <div className="w-full flex flex-col ">
            <form aria-required onSubmit={handleChangePassword}>
              <div className="md:w-[50%] w-full mx-auto">
                <label className="pb-2">Enter old password</label>
                <div className="w-full relative">
                  <input
                    type={visible ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
                  />
                  {visible ? (
                    <FaRegEye
                      size={22}
                      className="cursor-pointer absolute top-2 right-2"
                      onClick={() => setVisible(!visible)}
                    />
                  ) : (
                    <FaRegEyeSlash
                      size={22}
                      className="cursor-pointer absolute top-2 right-2"
                      onClick={() => setVisible(!visible)}
                    />
                  )}
                </div>
              </div>
              <br />
              <div className="md:w-[50%] w-full mx-auto">
                <label className="pb-2">Enter new password</label>
                <input
                  type={visible ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
                />
              </div>
              <br />
              <div className="md:w-[50%] w-full mx-auto">
                <label className="pb-2">Confirm new password</label>
                <input
                  type={visible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
                />
              </div>
              <br />
              <button
                type="submit"
                className="w-full md:w-[50%] mx-auto mt-2 appearance-none block h-12 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none  focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3 cursor-pointer"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
const Address = () => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [country, setCountry] = useState("");
  const [addressType, setAddressType] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !address1 ||
      !address2 ||
      !addressType ||
      !zipCode ||
      !country ||
      !city
    ) {
      return toast.error("All fields are required!");
    }
    console.log(address1, address2, addressType, country, city, zipCode)
    dispatch(
      userAddressUpdate(address1, address2, addressType, country, city, zipCode)
    );
    setOpen(false);
    setAddress1("");
    setAddress2("");
    setAddressType("");
    setZipCode();
    setCountry("");
    setCity("");
  };

  const handleDeleteAddress = (item) => {
    dispatch(userAddressDelete(item._id));
  };

  return (
    <>
      <div className="w-full px-4">
        <div className="flex justify-between items-center w-full">
          <h1 className={`${styles.heading}`}>Addresses</h1>
          <div className={`${styles.button}`} onClick={() => setOpen(true)}>
            <span className="text-white">Add New</span>
          </div>
        </div>
        <br />
        <div className="flex flex-col gap-4">
          {user &&
            user?.addresses.map((i, index) => (
              <div
                key={index}
                className="flex justify-between items-center h-[90px] bg-white rounded-sm px-2 md:px-3 shadow pr-5 md:pr-10"
              >
                <div className="flex items-center">
                  <h5 className="font-semibold pl-2 md:pl-5 text-sm md:text-md">
                    {i.addressType}
                  </h5>
                </div>
                <div className="flex md:flex-row flex-col gap-y-2 gap-x-5">
                  <div className="flex flex-col pl-6 md:text-sm text-xs ">
                    <p className="line-clamp-1">{i.address1}</p>
                    <p className="line-clamp-1">{i.address2}</p>
                  </div>
                  <div className="flex items-center md:text-sm text-xs">
                    <p className="pl-6">{user && user.phoneNumber}</p>
                  </div>
                </div>
                <div className="min-w-[10%] flex items-center justify-between pl-4 md:pl-8 ">
                  <AiOutlineDelete
                    className="cursor-pointer text-2xl md:text-xl"
                    onClick={() => handleDeleteAddress(i)}
                  />
                </div>
              </div>
            ))}
          {user && user.addresses.length === 0 && (
            <h4 className="text-center text-md font-semibold pt-8">
              You not have any saved address.
            </h4>
          )}
        </div>
      </div>
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000069] z-[1000] flex items-center justify-center">
          <div className="w-[90%] md:w-[50%] h-[80vh] bg-white rounded-md shadow p-4 relative overflow-y-auto">
            <div className="absolute top-4 right-4 cursor-pointer z-10 ">
              <RxCross1
                size={25}
                className="text-black"
                onClick={() => setOpen(false)}
              />
            </div>
            <h5 className="text-3xl font-semibold text-gray-700 mt-9 md:mt-3 mb-  text-center ">
              Add new address
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="">
                <label className="pb-2">Country</label>
                <select
                  name="country"
                  className="w-full mt-2 border h-9 rounded-sm px-2 text-sm"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Choose your country</option>
                  {Country &&
                    Country.getAllCountries().map((i, index) => (
                      <option value={i.isoCode} key={index}>
                        {i.name}
                      </option>
                    ))}
                </select>
              </div>
              <br />
              <div className="">
                <label className="pb-2">City</label>
                <select
                  name="city"
                  className="w-full mt-2 border h-9 rounded-sm px-2 text-sm"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Choose your city</option>
                  {State &&
                    State.getStatesOfCountry(country).map((i, index) => (
                      <option value={i.isoCode} key={index}>
                        {i.name}
                      </option>
                    ))}
                </select>
              </div>
              <br />
              <div className="">
                <label className="pb-2">Address 1 </label>
                <input
                  type="text"
                  name="address1"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
                  placeholder="Enter your address 1..."
                />
              </div>
              <br />
              <div className="">
                <label className="pb-2">Address 2 </label>
                <input
                  type="text"
                  name="address2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
                  placeholder="Enter your address 2..."
                />
              </div>
              <br />
              <div className="">
                <label className="pb-2">Zip Code </label>
                <input
                  type="number"
                  name="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
                />
              </div>
              <br />
              <div className="">
                <label className="pb-2">Address Type</label>
                <select
                  name="addressType"
                  className="w-full mt-2 border h-9 rounded-sm px-2 text-sm"
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                >
                  <option value="">Choose your address type</option>
                  {addressTypeData &&
                    addressTypeData.map((i, index) => (
                      <option value={i.name} key={index}>
                        {i.name}
                      </option>
                    ))}
                </select>
              </div>
              <br />
              <button
                type="submit"
                className="w-full mt-2 appearance-none block h-12 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none  focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3 cursor-pointer"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileContent;
