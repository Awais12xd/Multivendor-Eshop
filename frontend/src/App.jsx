import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  ActivationPage,
} from "./routes/allPagesLocalRoutes.js";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { userLoad } from "./redux/actions/userLoad.js";
import { useDispatch, useSelector } from "react-redux";



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      userLoad(dispatch);
  } , [])
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
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
    </>
  );
}

export default App;
