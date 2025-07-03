import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { postAddBlogAPiRequest } from "../../redux/reducers/reducer/blogreducer";


const Addpost = () => {

    const dispatch = useDispatch();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    title: "",
    content: "",
      image: null,
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors({});
    setSuccessMsg("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.image) newErrors.image = "image is required"
    if (!formData.title.trim()) newErrors.title = "Title is required";
    else if (formData.title.trim().length < 3)
      newErrors.title = "Title must be at least 3 characters";

    if (!formData.content.trim()) newErrors.content = "Content is required";
    else if (formData.content.trim().length < 10)
      newErrors.content = "Content must be at least 10 characters";

    return newErrors;
  };
   
    const handleSubmit = (e) => {
  e.preventDefault();

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  // 👇 Prepare FormData for file + text
  const data = new FormData();
  data.append("title", formData.title);
  data.append("content", formData.content);
  if (formData.image) {
    data.append("image", formData.image); // only if file is selected
  }

  dispatch(postAddBlogAPiRequest(data)); // send to saga

  setFormData({ title: "", content: "", image: null });
  setImagePreview(null);
  setErrors({});
  setSuccessMsg("Blog submitted successfully!");

  // Optional navigation with state message
  navigate("/", {
    state: { message: "Blog submitted successfully!" },
  });
};



  return (
    <>


<div className="bg-white p-6 pt-3 pb-3 rounded-xl shadow">
  <div className="text-3xl font-bold  bg-gradient-to-br from-orange-500 to-yellow-400 bg-clip-text text-transparent">
    Add New Post
  </div>
</div>


    <div className="flex items-center justify-center mt-10">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full space-y-6"
      >
     

        {errors.server && (
          <p className="text-red-600 text-center">{errors.server}</p>
        )}
        {successMsg && (
          <p className="text-green-600 text-center">{successMsg}</p>
        )}


{/* Image Upload */}
<div className="relative">
  <label className="block mb-1 font-semibold text-gray-700">
    Blog Image
  </label>
  <input
    type="file"
    accept="image/*"
    name="image"
    onChange={(e) => {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });

      // For preview
      if (file) {
        const imagePreviewUrl = URL.createObjectURL(file);
        setImagePreview(imagePreviewUrl);
      }
    }}
    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none"
  />
  {errors.image && (
    <p className="text-red-500 text-sm ms-1 absolute">{errors.image}</p>
  )}

  {/* Preview */}
  {imagePreview && (
    <img
      src={imagePreview}
      alt="Preview"
      className="mt-4 max-h-52 rounded-md border"
    />
  )}
</div>

        {/* Title */}
        <div className="relative">
          <label className="block mb-1 font-semibold text-gray-700">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter post title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm ms-1 absolute">{errors.title}</p>
          )}
        </div>

        {/* Content */}
        <div className="relative">
          <label className="block mb-1 font-semibold text-gray-700">
            Blog Content
          </label>
          <textarea
            name="content"
            placeholder="Write your post content here..."
            rows={6}
            value={formData.content}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
          {errors.content && (
            <p className="text-red-500 text-sm ms-1 absolute">{errors.content}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 p-3 rounded-full float-end transition duration-300"
        >
          Create Post
        </button>
      </form>
    </div>
    </>
  );
};

export default Addpost;
