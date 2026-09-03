import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import ReviewList from "./ReviewList";

export default function ManageReviews() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  function handleRefresh() {
    setRefresh(!refresh);
  }

  return (
    <AdminLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "15px" }}>
          <button
            onClick={() => navigate("/reviews")}
            style={{
              background: "#6b7280",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>

          <h1>Manage Reviews</h1>
        </div>
      </div>

      <ReviewList
        manage={true}
        refresh={refresh}
        onRefresh={handleRefresh}
      />
    </AdminLayout>
  );
}