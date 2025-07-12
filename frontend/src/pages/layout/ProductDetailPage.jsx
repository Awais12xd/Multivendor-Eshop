import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import ProductDetails from "../../components/Products/ProductDetails.jsx";
import { useParams } from "react-router-dom";
import { productData } from "../../static/data.jsx";
import RelatedProducts from "../../components/Products/RelatedProducts.jsx";

const ProductDetailPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    const fetchProductDetails = () => {
      const products =
        productData &&
        productData.find((product) => product.name === productName);
      setData(products);
    };
    fetchProductDetails();
  }, [name]);
  return (
    <div>
      <Header activeHeading={3} />
      <ProductDetails product={data} />
      {data && <RelatedProducts data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
