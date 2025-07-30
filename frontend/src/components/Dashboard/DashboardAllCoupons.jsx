import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";
import Loader from "../Animations/Loader";
import { toast } from "react-toastify";
import { eventDelete, eventsLoad } from "../../redux/actions/eventLoads.js";
import styles from "../../style/style.js";
import axios from "axios";
import { productsLoad } from "../../redux/actions/productsLoad.js";

const DashboardAllCoupons = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(4);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState();
  const [minAmount, setMinAmount] = useState();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [maxAmount, setMaxAmount] = useState();
  const { seller } = useSelector((state) => state.seller);
  const { isloading, products } = useSelector((state) => state.products);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [couponsData, setCouponsData] = useState([]);
  
  useEffect(() => {
    const fetchCodes = async (e) => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/coupon/get-all-coupons/${
            seller?._id
          }`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setLoading(false);
          setCouponsData(res.data.data);
        }
        if (res.data.success === false) {
          setLoading(false);
          setError(res.data.message);
        }
      } catch (err) {
        setLoading(false);
        if (err.response) {
          console.log("Error response:", err.response.data);
        } else {
          console.log("Error:", err.message);
        }
      }
    };
    fetchCodes();
      productsLoad(dispatch, seller?._id);
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/coupon/delete-coupon/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setOpen(false);
        window.location.reload(true);

      }
      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !value) {
      toast.error("Please fill all the required fields");
      return;
    }
    const formData = new FormData();

    formData.append("name", name);
    formData.append("value", value);
    formData.append("minAmount", minAmount);
    formData.append("maxAmount", maxAmount);
    formData.append("selectedProduct", selectedProduct);
    formData.append("shopId", seller?._id);
    const data = {
      name,
      value,
      minAmount,
      maxAmount,
      shopId: seller?._id,
      selectedProduct
    };
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/coupon/create-coupon-code`,
        data,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        setLoading(false);
        toast.success(res.data.message);
        setOpen(false);
        window.location.reload(true);
      }
      if (res.data.success === false) {
        setLoading(false);
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  couponsData &&
    couponsData.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + "%",
        sold: 10,
      });
    });

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <div className="pl-7 pt-1 w-[88%] md:w-full  md:mx-8 bg-white mt-10 overflow-x-scroll">
          <div className="flex justify-end">
            <div
              className={`${styles.button} hover:opacity-85 px-3 h-[45px] w-max flex justify-center items-center`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white whitespace-nowrap">
                Create Coupon Code
              </span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight:true
          />
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
                  Create Coupon Code
                </h5>
                <form onSubmit={handleSubmit}>
                  <br />
                  <div className="">
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
                      placeholder="Enter your coupon code name..."
                    />
                  </div>
                  <br />
                  <div className="">
                    <label className="pb-2">
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
                      placeholder="Enter your coupon code value..."
                    />
                  </div>
                  <br />
                  <div className="">
                    <label className="pb-2">Min Amount </label>
                    <input
                      type="number"
                      name="minAmount"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
                      placeholder="Enter min amount..."
                    />
                  </div>
                  <br />
                  <div className="">
                    <label className="pb-2">Max Amount </label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
                      placeholder="Enter max amount..."
                    />
                  </div>
                  <br />
                  <div className="">
                    <label className="pb-2">Select product</label>
                    <select
                      name="selectedProduct"
                      className="w-full mt-2 border h-9 rounded-sm px-2 text-sm"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="">Choose a selected product</option>
                      {products &&
                        products.map((i, index) => (
                          <option value={i.name} key={index}>
                            {i.name} 
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full disabled:opacity-50 disabled:cursor-no-drop mt-2 appearance-none block h-12 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none  focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3 cursor-pointer"
                  >
                    {loading ? "Creating..." : "Create"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DashboardAllCoupons;
