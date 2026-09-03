import { useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard Overview",
  "/menu": "Menu Management",
  "/menu/manage": "Add / Edit Menu Item",
  "/bookings": "Table Reservations",
  "/bookings/manage": "Manage Bookings",
  "/reviews": "Customer Reviews",
  "/reviews/manage": "Moderate Reviews",
  "/offers": "Special Offers & Promos",
  "/gallery": "Restaurant Gallery",
  "/messages": "Inquiries & Messages",
  "/settings": "Settings & Profile",
};

export default function Navbar() {
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname] || "Admin Portal";

  const adminData = (() => {
    try {
      return JSON.parse(localStorage.getItem("admin")) || {};
    } catch {
      return {};
    }
  })();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-page-title">{currentTitle}</h1>
      </div>

      <div className="navbar-right">
        <div className="admin-status-indicator">
          <span className="status-dot"></span>
          <span className="status-label">Live System</span>
        </div>

        <div className="admin-profile-chip">
          <div className="admin-avatar">A</div>
          <div className="admin-meta">
            <span className="admin-name">{adminData.email ? adminData.email.split("@")[0] : "Admin"}</span>
            <span className="admin-role">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}