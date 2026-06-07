import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home-container">

      <h1>InnerInk</h1>

      <h2>June 2026</h2>

      <div className="calendar">

        <button onClick={() => navigate("/diary")}>1</button>
        <button onClick={() => navigate("/diary")}>2</button>
        <button onClick={() => navigate("/diary")}>3</button>
        <button onClick={() => navigate("/diary")}>4</button>
        <button onClick={() => navigate("/diary")}>5</button>
        <button onClick={() => navigate("/diary")}>6</button>

      </div>

    </div>
  );
}

export default Home;