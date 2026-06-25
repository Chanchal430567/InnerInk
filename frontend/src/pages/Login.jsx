import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

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

alert(res.data.message);

localStorage.setItem(
  "userId",
  res.data.user.id
);

navigate("/home");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Login failed"
    );

  }
};

  return (
    <div className="login-container">
      <div className="login-box">

        <h1>InnerInk</h1>

        <h2>Welcome Back</h2>

       <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

        <input
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
<p
  className="forgot-password"
  onClick={() =>
    alert("Coming Soon 🚀")
  }
>
  Forgot Password?
</p>

        <button onClick={handleLogin}>
  Login
</button>

<p className="register-link">
  Don't have an account?
</p>

<button
  className="register-btn"
  onClick={() => navigate("/register")}
>
  Create Account
</button>

      </div>
    </div>
  );
}

export default Login;