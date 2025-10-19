import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import ProductDetails from "../../components/Products/ProductDetails.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import RelatedProducts from "../../components/Products/RelatedProducts.jsx";
import { useSelector } from "react-redux";
import Loader from "../../components/Animations/Loader.jsx";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [seacrhParams] = useSearchParams();
  const eventData = seacrhParams.get("eventData");

  const { allProducts, isLoading } = useSelector((state) => state.allProducts);
  const { allEvents } = useSelector((state) => state.allEvents);

  useEffect(() => {
    if (eventData !== null) {
      if (allEvents && allEvents.length > 0) {
        const event = allEvents.find((product) => product._id === id);
        setData(event || null);
      }
    } else {
      if (allProducts && allProducts.length > 0) {
        const product = allProducts.find((product) => product._id === id);
        setData(product || null);
      }
    }
    window.scrollTo(0, 0);
  }, [allProducts, id, allEvents]);

  return (
    <div>
      <Header activeHeading={3} />
      {!data ? (
        <Loader />
      ) : (
        <>
          <ProductDetails product={data} />
          {!eventData && <>{data && <RelatedProducts data={data} />}</>}
        </>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
