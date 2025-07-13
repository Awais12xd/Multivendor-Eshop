import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSelling,
  EventsPage,
  FAQPage,
  ProductDetailPage,
  ProfilePage,
  CreateShopPage,
} from "./routes/allPagesLocalRoutes.js";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { userLoad } from "./redux/actions/userLoad.js";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./routes/PrivateRoutes.jsx";



function App() {
  const {loading} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  useEffect(() => {
      userLoad(dispatch);
  } , [])
  return (
    <>
      {
        loading ? <p className="flex justify-center items-center h-[50vh] w-full text-xl">Loading...</p> : (
          <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/best-selling" element={<BestSelling />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/create-shop" element={<CreateShopPage />} />
          <Route path="/profile" element={
            <ProtectedRoute >
                <ProfilePage  />
            </ProtectedRoute>
          } />
          <Route path="/product/:name" element={<ProductDetailPage />} />
          <Route path="/activation/:url" element={<ActivationPage />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </Router>
        )
      }
    </>
  );
}

export default App;
