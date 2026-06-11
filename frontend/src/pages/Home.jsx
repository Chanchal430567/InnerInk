import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home-container">

      <h1>InnerInk ✨</h1>

      <p className="today-date">
        {new Date().toDateString()}
      </p>

      <button
        className="entry-btn"
        onClick={() => navigate("/diary")}
      >
        Write Today's Entry
      </button>

      <div className="section">

        <h2>📅 Calendar</h2>

        <div className="calendar">

          <button onClick={() => navigate("/diary")}>1</button>
          <button onClick={() => navigate("/diary")}>2</button>
          <button onClick={() => navigate("/diary")}>3</button>
          <button onClick={() => navigate("/diary")}>4</button>
          <button onClick={() => navigate("/diary")}>5</button>
          <button onClick={() => navigate("/diary")}>6</button>

        </div>

      </div>

      <div className="section">

        <h2>💭 Daily Quote</h2>

        <p>
          Every page you write is proof that you kept going.
        </p>

      </div>

      <div className="section">

        <h2>🤖 InnerInk Companion</h2>

        <p>
          How are you feeling today?
        </p>

      </div>

    </div>
  );
}

export default Home;