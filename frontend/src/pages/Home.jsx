import CalendarView from "../components/CalendarView";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {

   const navigate = useNavigate();

  useEffect(() => {

  const token =
    localStorage.getItem("token");

  if (!token) {

    navigate("/login");

  }

}, []);
const [entries, setEntries] = useState([]);

useEffect(() => {

  fetchEntries();

}, []);

const fetchEntries = async () => {

  try {

   const res = await axios.get(
  "http://localhost:5000/api/diary",
  {
    params: {
      userId:
        localStorage.getItem("userId"),
    },
  }
);

    setEntries(res.data);

  } catch (error) {

    console.log(error);

  }

};     

 const handleLogout = () => {

  localStorage.removeItem("token");
localStorage.removeItem("user");
localStorage.removeItem("userId");

  navigate("/login");

};

  return (
    <div className="home-container">

      <h1>InnerInk ✨</h1>

      <button
  onClick={handleLogout}
>
  Logout
</button>
      <div className="section">

  <h2>Your Journey 📖</h2>

  <p>Total Entries: {entries.length}</p>

</div>

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

        <CalendarView entries={entries} />

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