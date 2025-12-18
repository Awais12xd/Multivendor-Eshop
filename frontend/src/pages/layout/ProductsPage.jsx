import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { productData } from "../../static/data";
import Header from "../../components/layout/Header";
import ProductCard from "../../components/layout/ProductCard.jsx";
import styles from "../../style/style";
import Footer from "../../components/layout/Footer.jsx";
import { useSelector } from "react-redux";
import Loader from "../../components/Animations/Loader.jsx";

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoriyData = searchParams.get("category");
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.allProducts);

  useEffect(() => {
    if (categoriyData) {
      const products = allProducts?.filter(
        (product) => product.category == categoriyData
      );
      setData(products);
    } else {
        const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData;
      setData(sortedData);
    }
     window.scrollTo(0, 0)

  }, [categoriyData]);

  return (
    <>
      <div>
        {" "}
        <Header activeHeading={3} />
        <br />
        <br />
      </div>

      
              <div className={`${styles.section} mb-12`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
          {data &&
            data.map((data, index) => (
              <ProductCard product={data} key={index} />
            ))}
        </div>
        {data?.length === 0 ? (
          <h1 className="text-xl text-center w-full p-4">No products Found!</h1>
        ) : null}
      </div>
      
      <Footer />
    </>
  );
};

export default ProductsPage;
