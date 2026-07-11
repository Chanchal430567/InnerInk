import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";
import { toast } from "react-toastify";
import heroLogo from "../assets/InnerInk.jpeg";

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

const handleLogin = async () => {

  try {

    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );
    localStorage.setItem(
  "token",
  res.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

toast.success(res.data.message);

localStorage.setItem(
  "userId",
  res.data.user.id
);

navigate("/home");

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Login failed"
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

        <h2 className="auth-subtitle">Your thoughts deserve a safe place to unfold.</h2>

       <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

       <div className="password-field">

    <input
        type={showPassword ? "text" : "password"}
        value={password}
         placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
    />

    <span
        className="toggle-password"
        onClick={() =>
            setShowPassword(!showPassword)
        }
    >
        {showPassword ? "🙈" : "👁"}
    </span>

</div>
<p
  className="forgot-link"
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</p>


        <button
    className="auth-btn"
    onClick={handleLogin}
>
    Login
</button>

<div className="divider">
    <span>or</span>
</div>

<p className="register-text">
    New to InnerInk?
</p>

<p
    className="register-link"
    onClick={() => navigate("/register")}
>
    Create your account →
</p>

      </div>
    </div>
  );
}

export default Login;