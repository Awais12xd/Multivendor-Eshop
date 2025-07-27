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
import { userUpdate } from "../../redux/actions/userLoad.js";
import axios from "axios";

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

  const handleFilechange = async(e) => {
    const formData = new FormData();
    setAvatar( e.target.files[0])
    formData.append("file" , e.target.files[0])
  
    try {
      const res = await axios.put(`http://localhost:8000/api/user/change-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      },
      
    );
    window.location.reload(true);
      toast.success(res.data.message);
    } catch (err) {
      if (err.response) {
        console.log("Error response:", err.response.data);
        toast.error(err.response.data.message)
      } else {
        console.log("Error:", err.message);
        toast.error(err.message)
  
      }
    }
  }

  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${user?.avatar.url}`}
                className="w-[150px] h-[150px] object-cover border-3 rounded-full border-green-400"
                alt=""
              />
              <div className="flex justify-center items-center absolute rounded-full w-[30px] h-[30px] bottom-1 right-1 cursor-pointer bg-[#e1e1e1]">
                <input type="file" id="file" className="hidden" onChange={handleFilechange} />
                <label htmlFor="file" className="cursor-pointer">
                <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
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
                className="w-[250px] text-blue-600 text-center cursor-pointer border border-blue-600 rounded-[3px] mt-8 h-[40px]"
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
      {active === 5 && (
        <>
          <TrackOrderChanges />
        </>
      )}
      {active === 6 && (
        <>
          <PaymentMethods />
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
  const orders = [
    {
      _id: "ORD-10001",
      orderItems: [{ name: "iPhone 15 Pro Max" }, { name: "AirPods Pro 2" }],
      totalPrice: 1699,
      orderStatus: "Delivered",
    },
    {
      _id: "ORD-10002",
      orderItems: [{ name: "MacBook Pro 14-inch" }],
      totalPrice: 2499,
      orderStatus: "Processing",
    },
    {
      _id: "ORD-10003",
      orderItems: [
        { name: "Apple Watch Ultra" },
        { name: "iPhone 14" },
        { name: "MagSafe Charger" },
      ],
      totalPrice: 1899,
      orderStatus: "Shipped",
    },
    {
      _id: "ORD-10004",
      orderItems: [{ name: "Samsung Galaxy S24 Ultra" }],
      totalPrice: 1399,
      orderStatus: "Cancelled",
    },
    {
      _id: "ORD-10005",
      orderItems: [{ name: "Google Pixel 8 Pro" }, { name: "Pixel Buds Pro" }],
      totalPrice: 1249,
      orderStatus: "Delivered",
    },
    {
      _id: "ORD-10006",
      orderItems: [
        { name: "Dell XPS 13" },
        { name: "Logitech MX Master 3S Mouse" },
      ],
      totalPrice: 1690,
      orderStatus: "Processing",
    },
    {
      _id: "ORD-10007",
      orderItems: [{ name: "Sony WH-1000XM5 Headphones" }],
      totalPrice: 399,
      orderStatus: "Shipped",
    },
    {
      _id: "ORD-10008",
      orderItems: [{ name: "iPad Pro 12.9-inch" }, { name: "Apple Pencil 2" }],
      totalPrice: 1449,
      orderStatus: "Delivered",
    },
    {
      _id: "ORD-10009",
      orderItems: [
        { name: "ASUS ROG Gaming Laptop" },
        { name: "Mechanical Keyboard" },
        { name: "Gaming Mouse" },
      ],
      totalPrice: 2099,
      orderStatus: "Processing",
    },
    {
      _id: "ORD-10010",
      orderItems: [{ name: "OnePlus 12" }],
      totalPrice: 899,
      orderStatus: "Delivered",
    },
  ];

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
            <Link to={`/order/${params.id}`}>
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
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
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
const RefundOrderGrid = () => {
  const orders = [
    {
      _id: "ORD-10004",
      orderItems: [{ name: "Samsung Galaxy S24 Ultra" }],
      totalPrice: 1399,
      orderStatus: "Cancelled",
    },
    {
      _id: "ORD-10005",
      orderItems: [{ name: "Google Pixel 8 Pro" }, { name: "Pixel Buds Pro" }],
      totalPrice: 1249,
      orderStatus: "Delivered",
    },
    {
      _id: "ORD-10006",
      orderItems: [
        { name: "Dell XPS 13" },
        { name: "Logitech MX Master 3S Mouse" },
      ],
      totalPrice: 1690,
      orderStatus: "Processing",
    },
    {
      _id: "ORD-10007",
      orderItems: [{ name: "Sony WH-1000XM5 Headphones" }],
      totalPrice: 399,
      orderStatus: "Shipped",
    },
    {
      _id: "ORD-10008",
      orderItems: [{ name: "iPad Pro 12.9-inch" }, { name: "Apple Pencil 2" }],
      totalPrice: 1449,
      orderStatus: "Delivered",
    },
    {
      _id: "ORD-10009",
      orderItems: [
        { name: "ASUS ROG Gaming Laptop" },
        { name: "Mechanical Keyboard" },
        { name: "Gaming Mouse" },
      ],
      totalPrice: 2099,
      orderStatus: "Processing",
    },
    {
      _id: "ORD-10010",
      orderItems: [{ name: "OnePlus 12" }],
      totalPrice: 899,
      orderStatus: "Delivered",
    },
  ];

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
            <Link to={`/order/${params.id}`}>
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
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
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
  const orders = [
    {
      _id: "ORD-10004",
      orderItems: [{ name: "Samsung Galaxy S24 Ultra" }],
      totalPrice: 1399,
      orderStatus: "Cancelled",
    },
    {
      _id: "ORD-10005",
      orderItems: [{ name: "Google Pixel 8 Pro" }, { name: "Pixel Buds Pro" }],
      totalPrice: 1249,
      orderStatus: "Delivered",
    },
    {
      _id: "ORD-10006",
      orderItems: [
        { name: "Dell XPS 13" },
        { name: "Logitech MX Master 3S Mouse" },
      ],
      totalPrice: 1690,
      orderStatus: "Processing",
    },
    {
      _id: "ORD-10007",
      orderItems: [{ name: "Sony WH-1000XM5 Headphones" }],
      totalPrice: 399,
      orderStatus: "Shipped",
    },
    {
      _id: "ORD-10008",
      orderItems: [{ name: "iPad Pro 12.9-inch" }, { name: "Apple Pencil 2" }],
      totalPrice: 1449,
      orderStatus: "Delivered",
    },
    {
      _id: "ORD-10009",
      orderItems: [
        { name: "ASUS ROG Gaming Laptop" },
        { name: "Mechanical Keyboard" },
        { name: "Gaming Mouse" },
      ],
      totalPrice: 2099,
      orderStatus: "Processing",
    },
    {
      _id: "ORD-10010",
      orderItems: [{ name: "OnePlus 12" }],
      totalPrice: 899,
      orderStatus: "Delivered",
    },
  ];

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
            <Link to={`/order/${params.id}`}>
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
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
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
const PaymentMethods = () => {
  return (
    <>
      <div className="w-full px-4">
        <div className="flex justify-between items-center w-full">
          <h1 className={`${styles.heading}`}>Payment Methods</h1>
          <div className={`${styles.button}`}>
            <span className="text-white">Add New</span>
          </div>
        </div>
        <br />
        <div className="flex justify-between items-center h-[70px] bg-white rounded-sm px-3 shadow pr-10">
          <div className="flex items-center">
            <img
              src="/src/assets/visa.jpg"
              className="w-20 h-15 object-cover"
              alt="Visa"
            />
            <h5 className="font-semibold pl-5 text-xl">Awais Ali</h5>
          </div>
          <div className="flex items-center pl-6">
            <p>1234 **** **** ****</p>
            <p className="pl-6">09/29</p>
          </div>
          <div className="min-w-[10%] flex items-center justify-between pl-8">
            <AiOutlineDelete size={25} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};
const Address = () => {
  return (
    <>
      <div className="w-full px-4">
        <div className="flex justify-between items-center w-full">
          <h1 className={`${styles.heading}`}>Addresses</h1>
          <div className={`${styles.button}`}>
            <span className="text-white">Add New</span>
          </div>
        </div>
        <br />
        <div className="flex justify-between items-center h-[70px] bg-white rounded-sm px-3 shadow pr-10">
          <div className="flex items-center">
            <h5 className="font-semibold pl-5 text-md">Default</h5>
          </div>
          <div className="flex items-center pl-6">
            <p>HOUSE NUMBER 78 ST-12 BADARCLY Rangers Head quarters Lahore</p>
          </div>
          <div className="flex items-center pl-6">
            <p className="pl-6">03023874833</p>
          </div>
          <div className="min-w-[10%] flex items-center justify-between pl-8">
            <AiOutlineDelete size={25} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileContent;
