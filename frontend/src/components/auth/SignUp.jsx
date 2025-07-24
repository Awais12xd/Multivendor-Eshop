import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [username, setUserName] = useState("");
  const [file, setFile] = useState(null);
  const {loading} = useSelector((state) => state.user)

const handleFileChange = (e) => {
    setFile(e.target.files[0]);
};
 
const handleSubmit = async(e) => {

  e.preventDefault();
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("username", username);
  formData.append("file" , file)

  try {
    
    const res = await axios.post(`http://localhost:8000/api/auth/sign-up`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    toast.success(res.data.message);
    setEmail("")
    setPassword("")
    setUserName("")
    setFile(null)

  } catch (err) {
    if (err.response) {
      console.log("Error response:", err.response.data);
      toast.error(err.response.data.message)
    } else {
      console.log("Error:", err.message);
      toast.error(err.message)

    }
  }
}
  // const handleChange = (e) => {
  //     setEmail(e.target.value)
  // }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 lg:px-8 sm:px-6 justify-center ">
      <div className="sm:w-full md:max-w-md sm:mx-auto">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      <div className="sm:w-full md:max-w-md sm:mx-auto mt-6">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  autoComplete="username"
                  onChange={(e) => setUserName(e.target.value)}
                  value={username}
                  className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
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
                {visible ? (
                  <FaRegEye
                    size={22}
                    className="cursor-pointer absolute top-2 right-2"
                    onClick={() => setVisible(!visible)}
                  />
                ) : (
                  <FaRegEyeSlash
                    size={22}
                    className="cursor-pointer absolute top-2 right-2"
                    onClick={() => setVisible(!visible)}
                  />
                )}
              </div>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <span className="rounded-full object-cover w-9 h-9 overflow-hidden">
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Profile"
                    className="text-gray-500 w-full h-[100%] object-cover"
                  />
                ) : (
                  <FaRegUserCircle className="text-gray-500 w-full h-[100%] object-cover" />
                )}
              </span>
              <label htmlFor="input-file">
                <span className="px-4 py-3 rounded-lg bg-white border border-gray-700 text-gray-600 text-sm font-medium hover:bg-gray-100 hover:cursor-pointer">
                  Upload your image
                </span>
                <input
                  type="file"
                  name="input-file"
                  id="input-file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="mt-1">
              <button
                type="submit"
                className="w-full h-10 bg-blue-600 cursor-pointer hover:bg-blue-500 disabled:cursor-no-drop disabled:bg-blue-200 text-white rounded-lg flex items-center text-center justify-center"
              >
              {
                loading ? "Processing..." : "Submit"
              }
              </button>
            </div>
            <div className="mt-1 flex font-normal">
              <h2>Already have an account?</h2>
              <Link
                to={"/login"}
                className="ml-2 text-blue-600 hover:text-blue-500 "
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
