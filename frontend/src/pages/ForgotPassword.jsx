import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const sendOTP = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email,
        }
      );

      alert(res.data.message);

      navigate("/verify-otp", {
        state: {
          email,
        },
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (

    <div>

      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <button onClick={sendOTP}>
        Send OTP
      </button>

    </div>

  );

}

export default ForgotPassword;