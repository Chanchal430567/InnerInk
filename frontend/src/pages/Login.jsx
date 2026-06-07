import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">

        <h1>InnerInk</h1>

        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Enter your email"
        />

        <input
          type="password"
          placeholder="Enter your password"
        />

        <button onClick={() => navigate("/home")}>
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;