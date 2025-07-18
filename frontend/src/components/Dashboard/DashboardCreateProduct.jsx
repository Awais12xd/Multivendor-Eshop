import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";

const DashboardCreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [stock, setStock] = useState(0);

  const handleFileChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    //Tode Check File Size
    setImages(prev => [...prev , ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="flex justify-center w-full py-9 ">
      <div className="w-[90%] lg:w-[50%] bg-white shadow rounded-sm pb-4 p-3 overflow-y-scroll">
        <h5 className="text-3xl font-semibold text-gray-700 mb-3 text-center">
          Create New Product
        </h5>

        <form className="" onSubmit={handleSubmit}>
          <br />
          <div className="">
            <label className="pb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
              placeholder="Enter your product name..."
            />
          </div>
          <br />
          <div className="">
            <label className="pb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
              placeholder="Enter product description..."
            />
          </div>
          <br />
          <div className="">
            <label className="pb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              className="w-full mt-2 border h-9 rounded-sm px-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categoriesData &&
                categoriesData.map((i, index) => (
                  <option value={i.title} key={index}>
                    {i.title}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div className="">
            <label className="pb-2">
              Tags <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
              placeholder="Enter product tags..."
            />
          </div>
          <br />
          <div className="">
            <label className="pb-2">
              Original Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="originalPrice"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
              placeholder="Enter product original price..."
            />
          </div>
          <br />
          <div className="">
            <label className="pb-2">
              Discount Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="discountPrice"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
              placeholder="Enter product discount price..."
            />
          </div>
          <br />
          <div className="">
            <label className="pb-2">
              Product Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3"
              placeholder="Enter product stock..."
            />
          </div>
          <br />
          <div className="">
            <label className="pb-2">
              Upload Imges <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name=""
              id="upload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
          <div className="flex w-full items-center flex-wrap gap-3 mt-2">
              <label htmlFor="upload" className="cursor-pointer">
              <AiOutlinePlusCircle size={30} className="m-3" color="#555" />
            </label>
            {images.length > 0 &&
              images.map((image, index) => (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Product"
                  key={index}
                  className="w-28 h-28 object-cover rounded-md  "
                />
              ))}
          </div>
          </div>
          <br />
          <input type="submit" className="w-full mt-2 appearance-none block h-12 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none  focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3 cursor-pointer" name="" id="" />
        </form>
      </div>
    </div>
  );
};

export default DashboardCreateProduct;
