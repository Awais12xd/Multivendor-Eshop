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

  SellerActivation,
  LoginShopPage,
  DashboardPage,
  ShopHomePage,
  DashboardCreateProductPage,
  DashboardAllProductPage,
  DashboardAllEventsPage,
  DashboardCreateEventPage,
} from "./routes/allPagesLocalRoutes.js";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { userLoad } from "./redux/actions/userLoad.js";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./routes/PrivateRoutes.jsx";
import { sellerLoad } from "./redux/actions/sellerLoad.js";
import SellerProtectedRoutes from "./routes/SellerProtectedRoutes.jsx";


function App() {


  const dispatch = useDispatch();
  useEffect(() => {
      userLoad(dispatch);
      sellerLoad(dispatch);
  } , [])
  return (
    <>
          <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/best-selling" element={<BestSelling />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/profile" element={
            <ProtectedRoute >
                <ProfilePage  />
            </ProtectedRoute>
          } />
          <Route path="/product/:name" element={<ProductDetailPage />} />
          <Route path="/activation/:url" element={<ActivationPage />} />

          <Route path="/shop/seller/activation/:url" element={<SellerActivation />} />
          <Route path="/create-shop" element={<CreateShopPage />} />
          <Route path="/shop-login" element={<LoginShopPage />} />
          <Route path="/shop/:id" element={
            <SellerProtectedRoutes >
              <ShopHomePage/>
            </SellerProtectedRoutes>
          } />

          <Route path="/dashboard" element={
            <SellerProtectedRoutes>
              <DashboardPage/>
            </SellerProtectedRoutes>
          } />
          <Route path="/dashboard/create-product" element={
            <SellerProtectedRoutes>
              <DashboardCreateProductPage/>
            </SellerProtectedRoutes>
          } />
          <Route path="/dashboard/products" element={
            <SellerProtectedRoutes>
              <DashboardAllProductPage/>
            </SellerProtectedRoutes>
          } />
          <Route path="/dashboard/create-event" element={
            <SellerProtectedRoutes>
              <DashboardCreateEventPage/>
            </SellerProtectedRoutes>
          } />
          <Route path="/dashboard/all-events" element={
            <SellerProtectedRoutes>
              <DashboardAllEventsPage/>
            </SellerProtectedRoutes>
          } />
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
    </>
  );
}

export default App;
