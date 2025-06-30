import React, { useState } from "react";
import { FaRegEyeSlash , FaRegEye } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Login = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [visible , setVisible] = useState(false);
    console.log(visible)

    // const handleChange = (e) => {
    //     setEmail(e.target.value)
    // }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 lg:px-8 sm:px-6 justify-center ">
      <div className="sm:w-full md:max-w-md sm:mx-auto">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="sm:w-full md:max-w-md sm:mx-auto mt-6">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <form className="space-y-6">
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
             <div className="">
                 <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="Current-Password"
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  outline-none focus:ring-blue-500 sm:text-sm"
                />
               {
                 visible ? (
                <FaRegEye 
                size={22}
                className="cursor-pointer absolute top-2 right-2"
                onClick={() => setVisible(!visible)}
                />
                 )
                 : (
                 <FaRegEyeSlash 
                size={22}
                className="cursor-pointer absolute top-2 right-2"
                onClick={() => setVisible(!visible)}
                />
                 )
               }
              </div>
             </div>
             <div className="flex items-center justify-between">
               <div className="flex items-center">
                 <input className="h-4 w-4 rounded bg-blue-600 text-blue-600 border-gray-300  focus:ring-blue-500 cursor-pointer" type="checkbox" name="remember-me" id="remember-me" />
                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                    Remember me
                 </label> 
               </div>
               <div className="text-sm">
                <a href=".forget-password"
                className="text-blue-600 hover:text-blue-500 font-medium"
                >
                    Forget your password?
                </a>
               </div>
             </div>
             <div className="mt-1">
                <button type="submit" 
                className="w-full h-10 bg-blue-600 cursor-pointer hover:bg-blue-500 disabled:cursor-no-drop disabled:bg-blue-200 text-white rounded-lg flex items-center text-center justify-center "
                >
                    Submit
                </button>
             </div>
             <div className="mt-1 flex font-normal">
                <h2>Don't have any account?</h2>
                <Link to={"/sign-up"}
                className="ml-2 text-blue-600 hover:text-blue-500 "
                >
                Sign Up
                </Link>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
