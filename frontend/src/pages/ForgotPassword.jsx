import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";
import { toast } from "react-toastify";
import heroLogo from "../assets/InnerInk.jpeg";

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

      toast.success("📧 OTP sent successfully!");

      setTimeout(() => {
      navigate("/verify-otp", {
        state: {
          email,
        },
      });
      }, 1500);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
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
    Enter your registered email to receive a verification code.
</p>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <button
className="auth-btn"
onClick={sendOTP}
>

Send OTP

</button>

<p className="register-text">

Remember your password?

</p>

<p
className="register-link"
onClick={() => navigate("/login")}
>

Login →

</p>

    </div>

</div>

);

}

export default ForgotPassword;