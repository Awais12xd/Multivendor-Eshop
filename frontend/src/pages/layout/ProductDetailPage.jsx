import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import ProductDetails from "../../components/Products/ProductDetails.jsx";
import { useParams } from "react-router-dom";
import RelatedProducts from "../../components/Products/RelatedProducts.jsx";
import { useSelector } from "react-redux";
import Loader from "../../components/Animations/Loader.jsx";

const ProductDetailPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);

  const productName = name.replace(/-/g, " ");
  const { allProducts, isLoading } = useSelector((state) => state.allProducts);

  useEffect(() => {
    const fetchProductDetails = () => {
      if (allProducts && allProducts.length > 0) {
        const product = allProducts.find(
          (product) => product.name.toLowerCase() === productName.toLowerCase()
        );
        setData(product || null);
      }
    };
    window.scrollTo(0, 0)
    fetchProductDetails();
  }, [allProducts, productName]);

  return (
    <div>
      <Header activeHeading={3} />
      {!data ? (
        <Loader />
      ) : (
        <>
          <ProductDetails product={data} />
          {data && <RelatedProducts data={data} />}
        </>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
