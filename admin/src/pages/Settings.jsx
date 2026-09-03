import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@saffronsmoke.com",
    phone: "",
    role: "Administrator",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [restaurant, setRestaurant] = useState({
    name: "Saffron & Smoke",
    address: "",
    phone: "",
    email: "",
    openTime: "",
    closeTime: "",
    currency: "INR",
  });

  const [notifications, setNotifications] = useState({
    newBooking: true,
    newMessage: true,
    newReview: false,
    dailySummary: false,
  });

  const [activeTab, setActiveTab] = useState("profile");

  const [saved, setSaved] = useState("");

  function showSaved(section) {
    setSaved(section);
    setTimeout(() => setSaved(""), 2500);
  }

  function handleProfileSave(e) {
    e.preventDefault();
    showSaved("profile");
  }

  function handlePasswordSave(e) {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }
    if (passwords.newPass.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    setPasswords({ current: "", newPass: "", confirm: "" });
    showSaved("password");
  }

  function handleRestaurantSave(e) {
    e.preventDefault();
    showSaved("restaurant");
  }

  function handleNotificationSave(e) {
    e.preventDefault();
    showSaved("notifications");
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "password", label: "Password", icon: "🔒" },
    { id: "restaurant", label: "Restaurant Info", icon: "🏠" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
  ];

  return (
    <AdminLayout>

      {/* Page Header */}
      <div className="page-header-bar">
        <div className="page-header-left">
          <div className="page-icon-pill gold">⚙️</div>
          <div>
            <h2>Settings & Profile</h2>
            <p>Manage your account preferences and restaurant details</p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>

        {/* Tab Sidebar */}
        <div style={{
          width: "220px",
          flexShrink: 0,
          background: "#fff",
          border: "1px solid rgba(212,168,83,0.16)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          boxShadow: "var(--shadow-sm)",
        }}>
          {/* Avatar */}
          <div style={{
            padding: "28px 20px 20px",
            borderBottom: "1px solid rgba(212,168,83,0.12)",
            textAlign: "center",
          }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "var(--saffron-gradient)",
              color: "var(--smoke)",
              fontSize: "26px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              boxShadow: "0 4px 14px rgba(212,168,83,0.35)",
            }}>
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--smoke)" }}>
              {profile.name}
            </div>
            <div style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--saffron-dark)",
              fontWeight: 600,
              marginTop: "2px",
            }}>
              {profile.role}
            </div>
          </div>

          {/* Tabs */}
          <nav style={{ padding: "10px 0" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "11px 20px",
                  background: activeTab === tab.id ? "rgba(212,168,83,0.12)" : "transparent",
                  border: "none",
                  borderLeft: activeTab === tab.id ? "3px solid var(--saffron)" : "3px solid transparent",
                  color: activeTab === tab.id ? "var(--saffron-dark)" : "var(--text-muted)",
                  fontSize: "14px",
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* ── Profile Tab ── */}
          {activeTab === "profile" && (
            <div className="admin-content-card">
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(212,168,83,0.16)" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", color: "var(--smoke)", margin: 0 }}>
                  Profile Information
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "4px" }}>
                  Update your personal details
                </p>
              </div>
              <form onSubmit={handleProfileSave} style={{ padding: "24px" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "18px",
                  marginBottom: "24px",
                }}>
                  <div className="settings-field-group">
                    <label className="settings-label">Full Name</label>
                    <input
                      className="settings-input"
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="settings-field-group">
                    <label className="settings-label">Email Address</label>
                    <input
                      className="settings-input"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="admin@example.com"
                    />
                  </div>
                  <div className="settings-field-group">
                    <label className="settings-label">Phone Number</label>
                    <input
                      className="settings-input"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  <div className="settings-field-group">
                    <label className="settings-label">Role</label>
                    <input
                      className="settings-input"
                      type="text"
                      value={profile.role}
                      disabled
                      style={{ background: "#f8f5f0", color: "var(--text-muted)", cursor: "not-allowed" }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <button type="submit" className="btn-luxury-primary">
                    💾 Save Profile
                  </button>
                  {saved === "profile" && <SavedBadge />}
                </div>
              </form>
            </div>
          )}

          {/* ── Password Tab ── */}
          {activeTab === "password" && (
            <div className="admin-content-card">
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(212,168,83,0.16)" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", color: "var(--smoke)", margin: 0 }}>
                  Change Password
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "4px" }}>
                  Keep your account secure with a strong password
                </p>
              </div>
              <form onSubmit={handlePasswordSave} style={{ padding: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "420px", marginBottom: "24px" }}>
                  <div className="settings-field-group">
                    <label className="settings-label">Current Password</label>
                    <input
                      className="settings-input"
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="settings-field-group">
                    <label className="settings-label">New Password</label>
                    <input
                      className="settings-input"
                      type="password"
                      value={passwords.newPass}
                      onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                      placeholder="Min. 6 characters"
                      required
                    />
                  </div>
                  <div className="settings-field-group">
                    <label className="settings-label">Confirm New Password</label>
                    <input
                      className="settings-input"
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      placeholder="Re-enter new password"
                      required
                    />
                  </div>
                </div>

                {/* Password strength hint */}
                <div style={{
                  background: "#faf7f2",
                  border: "1px solid rgba(212,168,83,0.2)",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 16px",
                  marginBottom: "24px",
                  maxWidth: "420px",
                }}>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                    🔐 Use at least 6 characters. Mix letters, numbers and symbols for a stronger password.
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <button type="submit" className="btn-luxury-primary">
                    🔒 Update Password
                  </button>
                  {saved === "password" && <SavedBadge />}
                </div>
              </form>
            </div>
          )}

          {/* ── Restaurant Info Tab ── */}
          {activeTab === "restaurant" && (
            <div className="admin-content-card">
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(212,168,83,0.16)" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", color: "var(--smoke)", margin: 0 }}>
                  Restaurant Information
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "4px" }}>
                  Details shown on your public pages and receipts
                </p>
              </div>
              <form onSubmit={handleRestaurantSave} style={{ padding: "24px" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "18px",
                  marginBottom: "24px",
                }}>
                  <div className="settings-field-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="settings-label">Restaurant Name</label>
                    <input
                      className="settings-input"
                      type="text"
                      value={restaurant.name}
                      onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
                      placeholder="Restaurant name"
                    />
                  </div>
                  <div className="settings-field-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="settings-label">Address</label>
                    <input
                      className="settings-input"
                      type="text"
                      value={restaurant.address}
                      onChange={(e) => setRestaurant({ ...restaurant, address: e.target.value })}
                      placeholder="Full address"
                    />
                  </div>
                  <div className="settings-field-group">
                    <label className="settings-label">Contact Phone</label>
                    <input
                      className="settings-input"
                      type="tel"
                      value={restaurant.phone}
                      onChange={(e) => setRestaurant({ ...restaurant, phone: e.target.value })}
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  <div className="settings-field-group">
                    <label className="settings-label">Contact Email</label>
                    <input
                      className="settings-input"
                      type="email"
                      value={restaurant.email}
                      onChange={(e) => setRestaurant({ ...restaurant, email: e.target.value })}
                      placeholder="info@restaurant.com"
                    />
                  </div>
                  <div className="settings-field-group">
                    <label className="settings-label">Opening Time</label>
                    <input
                      className="settings-input"
                      type="time"
                      value={restaurant.openTime}
                      onChange={(e) => setRestaurant({ ...restaurant, openTime: e.target.value })}
                    />
                  </div>
                  <div className="settings-field-group">
                    <label className="settings-label">Closing Time</label>
                    <input
                      className="settings-input"
                      type="time"
                      value={restaurant.closeTime}
                      onChange={(e) => setRestaurant({ ...restaurant, closeTime: e.target.value })}
                    />
                  </div>
                  <div className="settings-field-group">
                    <label className="settings-label">Currency</label>
                    <select
                      className="settings-input"
                      value={restaurant.currency}
                      onChange={(e) => setRestaurant({ ...restaurant, currency: e.target.value })}
                    >
                      <option value="INR">INR — Indian Rupee (₹)</option>
                      <option value="USD">USD — US Dollar ($)</option>
                      <option value="EUR">EUR — Euro (€)</option>
                      <option value="GBP">GBP — British Pound (£)</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <button type="submit" className="btn-luxury-primary">
                    💾 Save Restaurant Info
                  </button>
                  {saved === "restaurant" && <SavedBadge />}
                </div>
              </form>
            </div>
          )}

          {/* ── Notifications Tab ── */}
          {activeTab === "notifications" && (
            <div className="admin-content-card">
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(212,168,83,0.16)" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", color: "var(--smoke)", margin: 0 }}>
                  Notification Preferences
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "4px" }}>
                  Choose what alerts you receive
                </p>
              </div>
              <form onSubmit={handleNotificationSave} style={{ padding: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "28px" }}>
                  {[
                    { key: "newBooking", label: "New Booking", desc: "Get notified when a table is booked" },
                    { key: "newMessage", label: "New Message", desc: "Get notified when a customer sends a message" },
                    { key: "newReview", label: "New Review", desc: "Get notified when a new review is posted" },
                    { key: "dailySummary", label: "Daily Summary", desc: "Receive a daily report of activity" },
                  ].map((item) => (
                    <label
                      key={item.key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 20px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid rgba(212,168,83,0.14)",
                        cursor: "pointer",
                        background: notifications[item.key] ? "#fffdf7" : "#fff",
                        transition: "all 0.2s",
                        marginBottom: "8px",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--smoke)" }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                          {item.desc}
                        </div>
                      </div>
                      <div
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                        style={{
                          width: "44px",
                          height: "24px",
                          borderRadius: "9999px",
                          background: notifications[item.key] ? "var(--saffron)" : "#e2e8f0",
                          position: "relative",
                          cursor: "pointer",
                          transition: "background 0.2s",
                          flexShrink: 0,
                        }}
                      >
                        <div style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: "#fff",
                          position: "absolute",
                          top: "3px",
                          left: notifications[item.key] ? "23px" : "3px",
                          transition: "left 0.2s",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                        }} />
                      </div>
                    </label>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <button type="submit" className="btn-luxury-primary">
                    💾 Save Preferences
                  </button>
                  {saved === "notifications" && <SavedBadge />}
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

      <style>{`
        .settings-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .settings-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--smoke);
        }
        .settings-input {
          padding: 10px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-family: var(--font-body);
          color: var(--smoke);
          background: #fdfbf7;
          outline: none;
          transition: all 0.2s;
          width: 100%;
        }
        .settings-input:focus {
          border-color: var(--saffron);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(212,168,83,0.15);
        }
        .settings-input option {
          background: #fff;
        }
      `}</style>

    </AdminLayout>
  );
}

function SavedBadge() {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      background: "#ecfdf5",
      color: "#047857",
      border: "1px solid #a7f3d0",
      padding: "6px 14px",
      borderRadius: "var(--radius-pill)",
      fontSize: "13px",
      fontWeight: 600,
    }}>
      ✓ Saved
    </span>
  );
}
