import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { productData } from "../../static/data";
import Header from "../../components/layout/Header";
import ProductCard from "../../components/layout/ProductCard.jsx";
import styles from "../../style/style";
import Footer from "../../components/layout/Footer.jsx";
import { useSelector } from "react-redux";

const BestSelling = () => {
  const [data, setData] = useState([]);
  const {allProducts} = useSelector((state) => state.allProducts)

  useEffect(() => {
      const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
      setData(sortedData);
          window.scrollTo(0, 0)
  }, [allProducts]);

  return (
    <>
      <div>
        <Header activeHeading={2} />
        <br />
        <br />
      </div>
      <div className={`${styles.section} mb-12`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
        {data &&
          data.map((data, index) => <ProductCard product={data} key={index} />)}
      </div>
      </div>
      <Footer />
    </>
  );
};

export default BestSelling;
