import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";
import { toast } from "react-toastify";
import heroLogo from "../assets/InnerInk.jpeg";

function VerifyOTP() {

  const [otp, setOtp] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const email = location.state?.email;

  const verifyOTP = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      toast.success("✅ OTP verified successfully!");

      setTimeout(() => {
      navigate("/reset-password", {
  state: {
    resetToken: res.data.resetToken,
  },
});
}, 1500);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "OTP verification failed"
      );

    }

  };

  return (

<div className="auth-page">

<div className="auth-card">

      <div className="auth-brand">
        <img src={heroLogo} alt="InnerInk logo" className="auth-graphic" />
        <h1 className="auth-logo">InnerInk</h1>
      </div>

<p className="auth-subtitle">
    Enter the one-time code sent to your inbox.
</p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
className="auth-btn"
onClick={verifyOTP}
>

Verify OTP

</button>

    </div>

</div>

);

}

export default VerifyOTP;