// VerifyOtp.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postVerifyOtpRequest,
  postVerifyOtpResponse,
} from "../../redux/reducers/reducer/blogreducer";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams();
  const user_id = searchParams.get("user_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { postVerifyOtpDetails } = useSelector(
    (state) => state.blogReducer
  );

  useEffect(() => {
    if (!user_id) {
      toast.error("User ID missing. Please try signing up again.");
      navigate("/register");
    }
  }, [user_id, navigate]);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message, {
        duration: location.state.duration || 5000,
      });
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    dispatch(postVerifyOtpRequest({ user_id, otp }));
  };

  useEffect(() => {
    if (!postVerifyOtpDetails) return;
    setLoading(false);

    const msg = postVerifyOtpDetails?.message;

    if (msg === "Email verified successfully") {
      navigate("/login", {
        state: { message: "Email verified successfully!", duration: 8000 },
      });
    } else if (msg === "Invalid OTP") {
      toast.error("The OTP you entered is incorrect.");
    } else if (msg === "User not found") {
      toast.error("User not found. Please try again.");
      navigate("/signup");
    } else if (msg === "OTP has expired") {
      toast.error("Your OTP has expired. Please request a new one.");
    }

    dispatch(postVerifyOtpResponse(null));
  }, [postVerifyOtpDetails, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 via-orange-400 to-yellow-400 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Please enter the 6-digit code sent to your email.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl tracking-widest mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="______"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
    