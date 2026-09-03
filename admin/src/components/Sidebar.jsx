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
      <div className="sidebar">
        <h2 className="logo">🍽 Food Admin</h2>
  
        <nav>
  
          <NavLink to="/dashboard" className="nav-item">
            <FaHome />
            <span>Dashboard</span>
          </NavLink>
  
          <NavLink to="/menu" className="nav-item">
            <FaUtensils />
            <span>Menu</span>
          </NavLink>
  
          <NavLink to="/bookings" className="nav-item">
            <FaCalendarAlt />
            <span>Bookings</span>
          </NavLink>
  
          <NavLink to="/reviews" className="nav-item">
            <FaStar />
            <span>Reviews</span>
          </NavLink>
  
          <NavLink to="/offers" className="nav-item">
            <FaGift />
            <span>Offers</span>
          </NavLink>
  
          <NavLink to="/gallery" className="nav-item">
            <FaImage />
            <span>Gallery</span>
          </NavLink>
  
          <NavLink to="/messages" className="nav-item">
            <FaEnvelope />
            <span>Messages</span>
          </NavLink>
  
          <NavLink to="/settings" className="nav-item">
            <FaCog />
            <span>Settings</span>
          </NavLink>
  
          <button className="logout-btn" onClick={logout}>
            <FaSignOutAlt />
            Logout
          </button>
  
        </nav>
      </div>
    );
  }