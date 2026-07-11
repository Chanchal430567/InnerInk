import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";
import { toast } from "react-toastify";
import heroLogo from "../assets/InnerInk.jpeg";

function ResetPassword() {

  const [newPassword, setNewPassword] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const resetToken = location.state?.resetToken;

  const resetPassword = async () => {

    try {

      const res = await axios.post(
  "http://localhost:5000/api/auth/reset-password",
  {
    resetToken,
    newPassword,
  }
);

      toast.success("🔐 Password reset successfully!");
      setTimeout(() => {
    navigate("/login");
}, 1500);

      

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Password reset failed"
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
    Create a fresh password for your private journal.
</p>

      <input
        type="password"
        placeholder="Enter New Password"
        value={newPassword}
        onChange={(e) =>
          setNewPassword(e.target.value)
        }
      />

      <button
className="auth-btn"
onClick={resetPassword}
>
  Reset Password
</button>

    </div>

</div>

);

}

export default ResetPassword;