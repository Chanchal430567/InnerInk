import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Password reset failed"
      );

    }

  };

  return (

    <div>

      <h1>Reset Password</h1>

      <input
        type="password"
        placeholder="Enter New Password"
        value={newPassword}
        onChange={(e) =>
          setNewPassword(e.target.value)
        }
      />

      <button onClick={resetPassword}>
        Reset Password
      </button>

    </div>

  );

}

export default ResetPassword;