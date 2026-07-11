import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./Profile.css";

const menuItems = [
  { id: "overview", label: "Overview", icon: "✦", caption: "Profile snapshot" },
  { id: "entries", label: "Entries Count", icon: "📖", caption: "Journal footprint" },
  { id: "features", label: "Features", icon: "✨", caption: "Your tools" },
  { id: "help", label: "Help", icon: "💬", caption: "Support" },
  { id: "settings", label: "Settings", icon: "⚙️", caption: "Preferences" },
  { id: "privacy", label: "Privacy", icon: "🔒", caption: "Your comfort" },
];

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [activeSection, setActiveSection] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    nickname: "",
    birthdate: "",
    bio: "A thoughtful soul writing through every season.",
    location: "",
    pronouns: "",
  });

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/diary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEntries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);
    setProfileData({
      name: storedUser?.name || "",
      email: storedUser?.email || "",
      nickname: storedUser?.nickname || "",
      birthdate: storedUser?.birthdate || "",
      bio: storedUser?.bio || "A thoughtful soul writing through every season.",
      location: storedUser?.location || "",
      pronouns: storedUser?.pronouns || "",
    });

    fetchEntries();
  }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      ...profileData,
      name: profileData.name.trim() || "InnerInk User",
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <h2 className="profile-loading">Loading your inner world...</h2>;
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case "entries":
        return (
          <div className="detail-grid">
            <div className="info-card large">
              <p className="eyebrow">Journal footprint</p>
              <h3>{entries.length} entries saved</h3>
              <p>Every note you keep becomes part of your growing story.</p>
            </div>
            <div className="info-card">
              <p className="eyebrow">Latest reflection</p>
              <h4>{entries[0]?.title || "No entries yet"}</h4>
              <p>{entries[0]?.content ? `${entries[0].content.slice(0, 90)}...` : "Your newest thought will appear here."}</p>
            </div>
          </div>
        );
      case "features":
        return (
          <div className="detail-grid">
            <div className="info-card large">
              <p className="eyebrow">What is unlocked</p>
              <h3>Writing spaces that feel personal</h3>
              <p>Move between Diary, Gratitude, Wishes, Letters, and Blogs with calm ease.</p>
            </div>
            <div className="info-card">
              <p className="eyebrow">Highlights</p>
              <ul>
                <li>Warm, distraction-free writing experience</li>
                <li>Rich note previews and full detail view</li>
                <li>Moments captured by mood and category</li>
              </ul>
            </div>
          </div>
        );
      case "help":
        return (
          <div className="detail-grid">
            <div className="info-card large">
              <p className="eyebrow">Need a hand?</p>
              <h3>We are here for your soft reset</h3>
              <p>Need help organizing your notes or adjusting your experience? We have a calm support path ready.</p>
            </div>
            <div className="info-card">
              <p className="eyebrow">Support options</p>
              <ul>
                <li>Guided note organization</li>
                <li>Privacy and account assistance</li>
                <li>Quick help for anything feeling off</li>
              </ul>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="detail-grid">
            <div className="info-card large">
              <p className="eyebrow">Your preferences</p>
              <h3>Every detail shaped to feel like you</h3>
              <p>Choose the tone, pace, and rhythm of your inner space.</p>
            </div>
            <div className="info-card">
              <p className="eyebrow">Current mood</p>
              <h4>Calm and expressive</h4>
              <p>Your profile is designed to stay elegant, warm, and easy to revisit.</p>
            </div>
          </div>
        );
      case "privacy":
        return (
          <div className="detail-grid">
            <div className="info-card large">
              <p className="eyebrow">Privacy and comfort</p>
              <h3>Your thoughts stay close to you</h3>
              <p>Your personal details are stored right in your own space and can be updated whenever you want.</p>
            </div>
            <div className="info-card">
              <p className="eyebrow">Safe to explore</p>
              <ul>
                <li>Gentle profile editing</li>
                <li>Private journal experience</li>
                <li>Custom details that feel intentional</li>
              </ul>
            </div>
          </div>
        );
      default:
        return (
          <div className="detail-grid">
            <div className="info-card large">
              <p className="eyebrow">Welcome home</p>
              <h3>{profileData.name || "Your profile"}</h3>
              <p>{profileData.bio}</p>
            </div>
            <div className="info-card">
              <p className="eyebrow">At a glance</p>
              <ul>
                <li>Email: {profileData.email}</li>
                <li>Nickname: {profileData.nickname || "Not set"}</li>
                <li>Location: {profileData.location || "Not set"}</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="profile-page">
      <Header />

      <div className="profile-shell">
        <aside className="profile-sidebar">
          <div className="sidebar-brand">
            <div className="profile-badge">{profileData.name?.charAt(0).toUpperCase() || "U"}</div>
            <div>
              <p className="eyebrow">Inner space</p>
              <h2>Profile</h2>
            </div>
          </div>

          <nav className="profile-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? "active" : ""}`}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsEditing(false);
                }}
              >
                <span>{item.icon}</span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.caption}</small>
                </span>
              </button>
            ))}
          </nav>

          <div className="sidebar-panel">
            <p className="eyebrow">Today</p>
            <h3>{entries.length} notes kept</h3>
            <p>Your life feels calmer when it is written gently.</p>
          </div>
        </aside>

        <main className="profile-main">
          <section className="profile-hero">
            <div>
              <p className="eyebrow">Personal touch</p>
              <h1>{profileData.name || "Your profile"}</h1>
              <p className="hero-copy">A warm little space for your details, your rhythm, and your story.</p>
            </div>
            <div className="hero-actions">
              <button className="secondary-btn" onClick={() => navigate("/home")}>Go home</button>
              <button className="secondary-btn" onClick={handleLogout}>Logout</button>
              <button className="primary-btn" onClick={() => setIsEditing((prev) => !prev)}>
                {isEditing ? "Cancel" : "Edit profile"}
              </button>
            </div>
          </section>

          <section className="detail-panel">
            {isEditing ? (
              <div className="edit-form">
                <div className="form-heading">
                  <div>
                    <p className="eyebrow">Edit profile</p>
                    <h3>Let your details feel more like you</h3>
                  </div>
                  <button className="primary-btn" onClick={handleSaveProfile}>Save changes</button>
                </div>

                <div className="form-grid">
                  <label className="field">
                    <span>Full name</span>
                    <input name="name" value={profileData.name} onChange={handleInputChange} placeholder="Your name" />
                  </label>
                  <label className="field">
                    <span>Email</span>
                    <input name="email" type="email" value={profileData.email} onChange={handleInputChange} placeholder="you@example.com" />
                  </label>
                  <label className="field">
                    <span>Nickname</span>
                    <input name="nickname" value={profileData.nickname} onChange={handleInputChange} placeholder="Your nickname" />
                  </label>
                  <label className="field">
                    <span>Birthdate</span>
                    <input name="birthdate" type="date" value={profileData.birthdate} onChange={handleInputChange} />
                  </label>
                  <label className="field">
                    <span>Location</span>
                    <input name="location" value={profileData.location} onChange={handleInputChange} placeholder="Where you are" />
                  </label>
                  <label className="field">
                    <span>Pronouns</span>
                    <input name="pronouns" value={profileData.pronouns} onChange={handleInputChange} placeholder="she / he / they" />
                  </label>
                  <label className="field wide">
                    <span>Bio</span>
                    <textarea name="bio" value={profileData.bio} onChange={handleInputChange} rows="4" placeholder="Tell a little about yourself" />
                  </label>
                </div>
              </div>
            ) : (
              renderSectionContent()
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default Profile;