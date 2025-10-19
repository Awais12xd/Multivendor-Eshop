import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { AiOutlineArrowRight, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Animations/Loader";
import { toast } from "react-toastify";
import { allSellerOrdersLoad } from "../../redux/actions/allOrdersLoad.js";

const DashboardAllOrders = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(4);
  const { seller } = useSelector((state) => state.seller);
  const { isloading ,  orders } = useSelector((state) => state.orders);
  console.log(orders);
  useEffect(() => {
      allSellerOrdersLoad(dispatch, seller?._id);
    }, [dispatch]);
    
   
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
    <>
     {
        isloading ? (
            <Loader />
        ) : (
            <div className="pl-7 pt-1 w-[88%] md:w-full  md:mx-8 bg-white mt-10">
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
  )
};

export default DashboardAllOrders;
