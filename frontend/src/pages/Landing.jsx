import "./Landing.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">InnerInk</h1>

      <p className="landing-tagline">
        A place to breathe.
      </p>

      <button
        className="start-btn"
        onClick={() => navigate("/login")}
      >
        Start Your Journey
      </button>
    </div>
  );
}

export default Landing;