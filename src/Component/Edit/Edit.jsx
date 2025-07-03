import React, { useEffect, useState } from "react";
import {
  getBlogAPiRequest,
  getBlogbyidAPiRequest,
  updatebyidAPiRequest,
} from "../../redux/reducers/reducer/blogreducer";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Edit = ({ onClose, editData }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        content: editData.content || "",
        image: editData.image || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.image) newErrors.image = "image is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  const isValid = validate();
  if (!isValid) return;

  const payload = {
    id: editData?._id,
    title: formData?.title,
    content: formData?.content,
    image: formData?.image, 
  };
  await dispatch(updatebyidAPiRequest(payload));
  dispatch(getBlogbyidAPiRequest(editData.author?._id));
  dispatch(getBlogAPiRequest());

  toast.success("Blog updated successfully!");
  setErrors({});
  onClose();
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 m-4 relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Update your Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Blog Image File Input */}

          <div className="relative">
            <label className="block mb-1 font-semibold text-gray-700">
              Upload New Blog Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setFormData((prev) => ({
                  ...prev,
                  image: file,
                }));
              }}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.image && (
              <p className="text-red-500 text-sm ms-1 absolute">
                {errors.image}
              </p>
            )}
          </div>

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
              <p className="text-red-500 text-sm ms-1 absolute">
                {errors.title}
              </p>
            )}
          </div>

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
              <p className="text-red-500 text-sm ms-1 absolute">
                {errors.content}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-5 py-2 rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
