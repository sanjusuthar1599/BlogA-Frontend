import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postLoginAPiRequest,
  postLoginAPiResponse,
} from "../../redux/reducers/reducer/blogreducer";
import { FaLock, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import toast from "react-hot-toast";
import Loader from '../Loader/Loader';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { postLoginAPiDetails } = useSelector(({ blogReducer }) => ({
    postLoginAPiDetails: blogReducer.postLoginAPiDetails,
  }));

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

useEffect(() => {
  if (location.state?.message || location.state?.duration) {
    toast.success(location.state.message, {
      duration: location.state.duration || 5000,
    });

    navigate(location.pathname, { replace: true, state: null });
  }
}, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
      setLoading(true); 
      dispatch(postLoginAPiRequest(formData));
      setFormData({ email: "", password: "" });
      setErrors({});
    };
  


  useEffect(() => {
    if (!postLoginAPiDetails) return;

    setLoading(false);

    if (postLoginAPiDetails?.message === "Login successful") {
      localStorage.setItem("token", postLoginAPiDetails?.token);
      localStorage.setItem("name", postLoginAPiDetails?.name);
       localStorage.setItem("email", postLoginAPiDetails?.email);
      navigate("/", { state: { message: "Login successful!" } });
    } else if (postLoginAPiDetails?.message === "Invalid email") {
      toast.error("Invalid email");
    } else if (postLoginAPiDetails?.message === "Invalid password") {
      toast.error("Invalid password");
    } else if (postLoginAPiDetails?.message === "Please verify your email before logging in.")
         toast.error("Please verify your email before logging in.", {
      duration: 8000,
    });

    dispatch(postLoginAPiResponse({ response: null }));
  }, [postLoginAPiDetails, navigate, dispatch]);



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f13a14] to-[#f8a62d] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 py-10 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl text-white flex flex-col items-center space-y-6"
      >
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
          alt="logo"
          className="w-16 mb-0"
        />

        <h2 className="text-3xl font-bold text-white text-center">Account Login</h2>

        {/* Email Field */}
        <div className="relative w-full">
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

        {/* Password Field */}
        <div className="relative w-full">
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
            <p className="text-black text-sm absolute ms-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
           className="w-full bg-red-800 text-white  hover:bg-red-700 py-3 mb-0 rounded-md flex justify-center items-center"
          disabled={loading}
        >
            {loading ? <Loader size={20} color="white" /> : "Login"}
        </button>

        {/* OR login with */}
        <div className="flex items-center justify-between w-full my-6">
          <div className="border-t border-red-700 w-full"></div>
          <span className="px-3 text-sm w-64 text-white text-center">
            login with
          </span>
          <div className="border-t border-red-700 w-full"></div>
        </div>

        <div className="flex gap-4 justify-center mb-4">
          <button className="bg-white text-[#f13a14] p-3 rounded-full hover:scale-105 transition">
            <FaFacebookF />
          </button>
          <button className="bg-white text-[#f13a14] p-3 rounded-full hover:scale-105 transition">
            <FaTwitter />
          </button>
          <button className="bg-white text-[#f13a14] p-3 rounded-full hover:scale-105 transition">
            <FaGoogle />
          </button>
        </div>

        <p className="text-white text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-800 hover:underline ml-1">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
