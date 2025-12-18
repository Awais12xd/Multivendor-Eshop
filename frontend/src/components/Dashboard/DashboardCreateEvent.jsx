import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const DashboardCreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const today = new Date().toISOString().slice(0, 10);

  const handleStartDateChange = (e) => {
    const startDateValue = new Date(e.target.value);
    const minEndDate = new Date(
      startDateValue.getTime() + 3 * 24 * 60 * 60 * 1000
    );
    setStartDate(startDateValue);
    setEndDate(null);
    document.getElementById("end_date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDateValue = new Date(e.target.value);
    setEndDate(endDateValue);
  };

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  const handleFileChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    //Tode Check File Size
    setImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !category ||
      !tags ||
      !originalPrice ||
      !discountPrice ||
      !stock ||
      images.length === 0 ||
      !startDate ||
      !endDate 
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("originalPrice", originalPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);
    formData.append("shopId", seller?._id);
    formData.append("start_date" , startDate.toISOString());
    formData.append("end_date" , endDate.toISOString());

    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/event/create-event`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        setLoading(false);
        toast.success(res.data.message);
        navigate("/dashboard/all-events");
        window.location.reload(true);
      }
      if (res.data.success === false) {
        setLoading(false);
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        console.log("Error response:", err.response.data);
        toast.error(err.response.data.message);
      } else {
        console.log("Error:", err.message);
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="flex justify-center w-full py-4 md:py-9 ">
      <div className="w-[90%] lg:w-[50%] bg-white shadow rounded-sm pb-4 p-3 overflow-y-scroll">
        <h5 className="text-3xl font-semibold text-gray-700 mb-3 text-center">
          Create New Event
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
              placeholder="Enter your event product name..."
            />
          </div>
          <br />
          <div className="">
            <label className="pb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              cols={30}
              rows={6}
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 appearance-none block  border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3 pt-2"
              placeholder="Enter event product description..."
            ></textarea>
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
              placeholder="Enter event product tags..."
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
              placeholder="Enter event product original price..."
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
              placeholder="Enter event product discount price..."
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
              placeholder="Enter event product stock..."
            />
          </div>
          <br />
          <div className="">
            <label className="pb-2">
              Event Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="start_date"
              id="start_date"
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              onChange={handleStartDateChange}
              min={today}
              className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3 "
            />
          </div>
          <br />
          <div className="">
            <label className="pb-2">
              Event End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="end_date"
              id="end_date"
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              onChange={handleEndDateChange}
              min={minEndDate}
              className="w-full mt-2 appearance-none block h-9 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3 "
            />
          </div>
          <br />
          <div className="">
            <label className="pb-2">
              Upload Imges <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="upload"
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
          <button
            type="submit"
            className="w-full mt-2 appearance-none block h-12 border border-gray-300 rounded-[3px] placeholder:text-gray-500 outline-none  focus:ring-blue-500 sm:text-sm focus:border-blue-500 px-3 cursor-pointer"
          >
            {loading ? "Creating Event..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardCreateEvent;
