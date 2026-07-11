import CalendarView from "../components/CalendarView";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";


function Home() {

  const [user, setUser] = useState(null);

   const navigate = useNavigate();

  useEffect(() => {

  const token =
    localStorage.getItem("token");

  if (!token) {

    navigate("/login");

  }

  const storedUser = JSON.parse(
  localStorage.getItem("user")
);

setUser(storedUser);

}, []);


const [entries, setEntries] = useState([]);

useEffect(() => {

  fetchEntries();

}, []);

const fetchEntries = async () => {

  try {

   const token = localStorage.getItem("token");

const res = await axios.get(
  "http://localhost:5000/api/diary",
  {
    headers: {
      Authorization: `Bearer ${token}`,
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
    <>
<Header />
    <div className="home-container">

    <div className="hero-dashboard">

    <div className="hero-left">

       <div className="hero-section">

  <p className="hero-label">
    Welcome back 🌿
  </p>

  <h2 className="welcome-heading">

    Good {new Date().getHours() < 12
      ? "Morning"
      : new Date().getHours() < 18
      ? "Afternoon"
      : "Evening"}, {user?.name}!

  </h2>

  <p className="welcome-text">

    Every page you write today
    becomes a memory tomorrow.

  </p>

</div>

    </div>

    <div className="hero-right">

       <div className="dashboard-grid">

 

  <div
    className="write-card"
    onClick={() => navigate("/diary")}
  >

    <h3>Continue Writing →</h3>

    <p>
      Pick up where your thoughts left off.
    </p>

  </div>

</div>

    </div>

</div>


      <div className="calendar-card">

        <h2>Your Journal Calendar</h2>

<p className="calendar-subtitle">
    Select a day to revisit your memories.
</p>

        <CalendarView entries={entries} />

      </div>

     <div className="quote-card">

    <p className="quote-icon">
        ❝
    </p>

    <p className="quote-text">

        Every page you write
        is proof that you kept going.

    </p>

</div>
    </div>
    </>
  );
}

export default Home;