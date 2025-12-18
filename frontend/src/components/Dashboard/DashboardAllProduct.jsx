import React, { useEffect, useState } from "react";
import { productDelete, productsLoad } from "../../redux/actions/productsLoad";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { AiOutlineArrowRight, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Animations/Loader";
import { toast } from "react-toastify";

const DashboardAllProduct = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(4);
  const { seller } = useSelector((state) => state.seller);
  const { isloading ,  products } = useSelector((state) => state.products);
  console.log(products);
  useEffect(() => {
      productsLoad(dispatch, seller?._id);
    }, [dispatch]);
    
    const handleDelete = async (id) => {
      await productDelete(dispatch , id);
      await productsLoad(dispatch , seller?._id);
      toast.success("Product deleted successfully")
    }

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "name",
      minWidth: 130,
      flex: 0.7,
      type: "string"
    },

    {
      field: "price",
      headerName: "Price",
      minWidth: 130,
      flex: 0.7,
      type: "number"
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "sold",
      headerName: "Sold Out",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "Preview",
      flex: 1,
      minWidth: 150,
      headerName: "Preview",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name || "";
        const product_name = typeof d === "string" ? d.replace(/\s+/g, "-").toLowerCase() : "";
        return (
          <>
            <Link to={`/product/${params.row.id}`}>
              <Button>
                <AiOutlineEye size={20} color="black" />
              </Button>
            </Link>
          </>
        );
      },
    },
     {
      field: "Delete",
      flex: 1,
      minWidth: 150,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name || "";
        const product_name = typeof d === "string" ? d.replace(/\s+/g, "-").toLowerCase() : "";
        return (
          <>
            <div  
            onClick={() => handleDelete(params.row.id)}
            >
              <Button>
                <AiOutlineDelete size={20} color="black" />
              </Button>
            </div>
          </>
        );
      },
    },
  ];

    const row = [];

  products &&
    products.forEach((product) => {
      row.push({
        id: product._id,
        name: product.name, // Add name property for DataGrid row
        price: "US$" + product.discountPrice,
        stock: product.stock,
        sold: product.sold_out,
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

export default DashboardAllProduct;
