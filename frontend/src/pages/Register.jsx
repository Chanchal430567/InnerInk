import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { toast } from "react-toastify";
import heroLogo from "../assets/InnerInk.jpeg";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      toast.success("🎉 Account created successfully!");

     setTimeout(() => {
    navigate("/login");
}, 1500);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
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
    Create your personal journaling space with warmth and intention.
</p>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
    className="auth-btn"
    onClick={registerUser}
>
    Create Account
</button>

    <p className="register-text">

Already have an account?

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

export default Register;