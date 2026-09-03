import {
  FaHome,
  FaUtensils,
  FaCalendarAlt,
  FaStar,
  FaGift,
  FaImage,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-badge">S&S</div>
        <div className="brand-text">
          <h2>Saffron & Smoke</h2>
          <span>Admin Portal</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-title">Overview</div>

        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaHome className="nav-icon" />
          <span>Dashboard</span>
        </NavLink>

        <div className="nav-section-title">Manage Content</div>

        <NavLink to="/menu" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaUtensils className="nav-icon" />
          <span>Menu</span>
        </NavLink>

        <NavLink to="/bookings" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaCalendarAlt className="nav-icon" />
          <span>Bookings</span>
        </NavLink>

        <NavLink to="/reviews" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaStar className="nav-icon" />
          <span>Reviews</span>
        </NavLink>

        <NavLink to="/offers" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaGift className="nav-icon" />
          <span>Offers</span>
        </NavLink>

        <NavLink to="/gallery" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaImage className="nav-icon" />
          <span>Gallery</span>
        </NavLink>

        <div className="nav-section-title">Communications</div>

        <NavLink to="/messages" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaEnvelope className="nav-icon" />
          <span>Messages</span>
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <FaCog className="nav-icon" />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          <FaSignOutAlt className="nav-icon" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}