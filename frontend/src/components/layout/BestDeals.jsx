import React, { useEffect, useState } from "react";
import { productData } from "../../static/data.jsx";
import styles from "../../style/style.js";
import ProductCard from "./ProductCard.jsx";
import { useSelector } from "react-redux";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const {allProducts,isLoading} = useSelector((state) => state.allProducts);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    setData(sortedData);
  }, [allProducts]);
  return (
    <div>
      <div className={`${styles.section} mb-5`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
            {
                data && data.map((data,index) => (
                    <ProductCard product={data} key={index} />
                ))
            }
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
