import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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

      alert(res.data.message);

      navigate("/reset-password", {
  state: {
    resetToken: res.data.resetToken,
  },
});

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "OTP verification failed"
      );

    }

  };

  return (

    <div>

      <h1>Verify OTP</h1>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={verifyOTP}>
        Verify OTP
      </button>

    </div>

  );

}

export default VerifyOTP;