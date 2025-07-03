import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postSignupAPiRequest,
  postSignupAPiResponse,
} from "../../redux/reducers/reducer/blogreducer";
import {
  FaUser,
  FaLock,
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaUserTag,
} from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { postSignupAPiDetails } = useSelector(({ blogReducer }) => ({
    postSignupAPiDetails: blogReducer.postSignupAPiDetails,
  }));

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    return newErrors;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const validationErrors = validate();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //   } else {
  //     dispatch(postSignupAPiRequest(formData));
  //     setFormData({name: "", email: "", password: "", role: "" })
  //     setErrors({});
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    await dispatch(postSignupAPiRequest(formData));

    setFormData({ name: "", email: "", password: "", role: "" });
    setErrors({});
  };

  useEffect(() => {
    if (!postSignupAPiDetails) return;

    setLoading(false);

    if (postSignupAPiDetails?.message?.includes("Registration successful")) {
      navigate("/login", {
        state: {
          message:
            "Registration successful! Please verify your email before logging in!",
          duration: 8000,
        },
      });
    } else if (postSignupAPiDetails?.message === "User already exists") {
      toast.error("User already exists please diffrent email use.");
    }

    dispatch(postSignupAPiResponse({ response: null }));
  }, [postSignupAPiDetails, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f13a14] to-[#f8a62d] px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 py-5 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl text-white flex flex-col items-center space-y-6"
      >
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
          alt="logo"
          className="w-16 mb-0 "
        />

        <h2 className="text-2xl font-semibold mb-6">Create Account</h2>

        {/* Name */}
        <div className="relative w-full mb-5">
          <FaUser className="absolute left-3 top-3.5 text-white text-lg" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="pl-10  w-full py-2.5 px-4 bg-[#f8a57d] bg-opacity-50 text-white rounded-md placeholder-white focus:outline-none"
          />
          {errors.name && (
            <p className="text-black text-sm ms-1 absolute">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative w-full mb-5">
          <MdOutlineMailLock className="absolute left-3 top-3.5 text-white text-lg" />
          <input
            type="email"
            name="email"
            placeholder="Username or Email address"
            value={formData.email}
            onChange={handleChange}
            className="pl-10 w-full py-2.5 bg-[#f8a57d] bg-opacity-50 text-white rounded-md placeholder-white focus:outline-none"
          />
          {errors.email && (
            <p className="text-black text-sm ms-1 absolute">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative w-full mb-5">
          <FaLock className="absolute left-3 top-3.5 text-white text-lg" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="pl-10 w-full py-2.5 bg-[#f8a57d] bg-opacity-50 text-white rounded-md placeholder-white focus:outline-none"
          />
          {errors.password && (
            <p className="text-black text-sm ms-1 absolute">{errors.password}</p>
          )}
        </div>

        {/* Role Dropdown */}
        <div className="relative w-full mb-6">
          <FaUserTag className="absolute left-3 top-3.5 text-white text-lg" />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="pl-10 w-full py-2.5 px-4 bg-[#f8a57d] bg-opacity-50 text-white rounded-md focus:outline-none"
          >
            <option value="">Select Role</option>
            <option value="admin" className="text-black">
              Admin
            </option>
            <option value="user" className="text-black">
              User
            </option>
          </select>
          {errors.role && (
            <p className="text-black text-sm ms-1 absolute">{errors.role}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-red-800 text-white  hover:bg-red-700 py-3 mb-0 rounded-md flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <Loader size={20} color="white" /> : "Register"}
        </button>

        {/* OR login with */}
        <div className="flex items-center justify-between w-full my-6">
          <div className="border-t border-red-700 w-full"></div>
          <span className="px-3 text-sm w-64 text-white">login with</span>
          <div className="border-t border-red-700 w-full"></div>
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <button className="bg-white text-[#f13a14] p-3 rounded-full">
            <FaFacebookF />
          </button>
          <button className="bg-white text-[#f13a14] p-3 rounded-full">
            <FaTwitter />
          </button>
          <button className="bg-white text-[#f13a14] p-3 rounded-full">
            <FaGoogle />
          </button>
        </div>

        <p className="mt-4 text-center text-white">
          Already have an account?
          <Link to="/" className="text-red-800 hover:underline ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
