import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  getMessages,
  updateMessage,
  deleteMessage,
} from "../services/messageService";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      setLoading(true);
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(id, status) {
    try {
      await updateMessage(id, { status });
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  }

  async function removeMessage(id) {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteMessage(id);
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  }

  const filtered =
    filter === "All" ? messages : messages.filter((m) => m.status === filter);

  const unreadCount = messages.filter((m) => m.status === "Unread").length;

  return (
    <AdminLayout>

      {/* Page Header */}
      <div className="page-header-bar">
        <div className="page-header-left">
          <div className="page-icon-pill amber">✉️</div>
          <div>
            <h2>Inquiries & Messages</h2>
            <p>Manage customer contact messages and enquiries</p>
          </div>
        </div>

        {unreadCount > 0 && (
          <div style={{
            background: "#fef3c7",
            border: "1px solid #fde68a",
            color: "#b45309",
            padding: "8px 16px",
            borderRadius: "var(--radius-pill)",
            fontSize: "13px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            📬 {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "16px",
        marginBottom: "28px",
      }}>
        {[
          { label: "Total", count: messages.length, icon: "📨", bg: "#f1f5f9", color: "#334155" },
          { label: "Unread", count: messages.filter(m => m.status === "Unread").length, icon: "🔴", bg: "#fef2f2", color: "#b91c1c" },
          { label: "Read", count: messages.filter(m => m.status === "Read").length, icon: "✅", bg: "#ecfdf5", color: "#047857" },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: "#fff",
            border: "1px solid rgba(212,168,83,0.16)",
            borderRadius: "var(--radius-md)",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "var(--shadow-sm)",
          }}>
            <div style={{
              width: "42px",
              height: "42px",
              borderRadius: "var(--radius-sm)",
              background: stat.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              flexShrink: 0,
            }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: "24px", fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--smoke)", lineHeight: 1 }}>
                {stat.count}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="admin-content-card">
        {/* Card header with filter tabs */}
        <div style={{
          padding: "16px 24px",
          borderBottom: "1px solid rgba(212,168,83,0.16)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "20px",
            color: "var(--smoke)",
            margin: 0,
          }}>
            All Messages
          </h3>

          {/* Filter Tabs */}
          <div style={{ display: "flex", gap: "8px" }}>
            {["All", "Unread", "Read"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "var(--radius-pill)",
                  border: filter === tab
                    ? "1px solid var(--saffron)"
                    : "1px solid #e2e8f0",
                  background: filter === tab
                    ? "var(--saffron-light)"
                    : "#fff",
                  color: filter === tab
                    ? "var(--saffron-dark)"
                    : "var(--text-muted)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrapper">
          <table className="luxury-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="table-state-cell">
                    <div className="table-spinner" />
                    Loading messages...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((msg) => (
                  <tr key={msg.id} style={{
                    background: msg.status === "Unread" ? "#fffdf7" : "transparent",
                  }}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          background: "var(--saffron-light)",
                          color: "var(--saffron-dark)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "14px",
                          flexShrink: 0,
                        }}>
                          {msg.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <span style={{ fontWeight: 600, color: "var(--smoke)" }}>
                          {msg.name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                        {msg.email}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--smoke)" }}>
                        {msg.subject || "—"}
                      </span>
                    </td>
                    <td>
                      <div style={{
                        fontSize: "13px",
                        color: "var(--text-muted)",
                        maxWidth: "260px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        lineHeight: 1.5,
                      }}>
                        {msg.message}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${msg.status === "Read" ? "accepted" : "pending"}`}>
                        {msg.status === "Read" ? "✓ Read" : "● Unread"}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-group">
                        {msg.status !== "Read" && (
                          <button
                            className="btn-action-accept"
                            onClick={() => changeStatus(msg.id, "Read")}
                          >
                            ✓ Mark Read
                          </button>
                        )}
                        {msg.status !== "Unread" && (
                          <button
                            className="btn-action-complete"
                            onClick={() => changeStatus(msg.id, "Unread")}
                          >
                            ↩ Unread
                          </button>
                        )}
                        <button
                          className="btn-action-delete"
                          onClick={() => removeMessage(msg.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="table-state-cell">
                    <div className="empty-icon">✉️</div>
                    <div>
                      {filter === "All"
                        ? "No messages yet."
                        : `No ${filter.toLowerCase()} messages.`}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  );
}
