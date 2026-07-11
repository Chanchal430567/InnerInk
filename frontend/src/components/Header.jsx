import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 className="logo" onClick={() => navigate("/home")}>
        InnerInk
      </h1>

      <div className="header-actions">
        <button
          className="icon-btn"
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowMenu(false);
          }}
          aria-label="Notifications"
        >
          🔔
        </button>

        <button
          className="avatar-btn"
          onClick={() => {
            setShowMenu(!showMenu);
            setShowNotifications(false);
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </button>
      </div>

      {showNotifications && (
        <div className="profile-menu notification-menu">
          <h4>Notifications</h4>
          <p>No notifications yet</p>
        </div>
      )}

      {showMenu && (
        <div className="profile-menu">
          <h4>{user?.name}</h4>
          <p>{user?.email}</p>

          <hr />

          <button onClick={() => navigate("/profile")}>👤 My Profile</button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            🚪 Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;