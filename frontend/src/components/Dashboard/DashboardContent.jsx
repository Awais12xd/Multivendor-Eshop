import React, { useEffect, useState } from "react";
import {
  AiFillProduct,
  AiOutlineArrowRight,
  AiOutlineBorderlessTable,
  AiOutlineMoneyCollect,
  AiOutlineOrderedList,
} from "react-icons/ai";
import styles from "../../style/style";
import { Link } from "react-router-dom";
import { VscListOrdered } from "react-icons/vsc";
import { CgProductHunt } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellersOrder } from "../../../../backend/controllers/order.controller";
import { productsLoad } from "../../redux/actions/productsLoad";
import { allSellerOrdersLoad } from "../../redux/actions/allOrdersLoad";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";

const DashboardContent = ({ active }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const { orders } = useSelector((state) => state.orders);
  const [delieverdOrder, setDelieverdOrder] = useState(null);

  useEffect(() => {
    productsLoad(dispatch, seller?._id);
    allSellerOrdersLoad(dispatch, seller?._id);

    const orderData =
      orders && orders.filter((item) => item.status === "Delivered");

    setDelieverdOrder(orderData);
  }, [dispatch]);

  const totalEarningWithoutTax =
    delieverdOrder &&
    delieverdOrder.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharge = totalEarningWithoutTax * 0.1;
  const availableBalance = totalEarningWithoutTax - serviceCharge.toFixed(2);

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
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-semibold font-Poppins pb-2">Overview</h3>
      <div className="w-full block md:flex items-center justify-between">
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ${availableBalance}
          </h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineBorderlessTable
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">12</h5>
          <Link to="/dashboard/orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiFillProduct size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">5</h5>
          <Link to="/dashboard/products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-semibold font-Poppins pb-2">
        Latest Orders
      </h3>

      <div className="w-full min-h-[45vh] bg-white rounded flex justify-center overflow-y-scroll">
        <div className=" pt-1 w-[90%]   bg-white mt-10">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight:true
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
