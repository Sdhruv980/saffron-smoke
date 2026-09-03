import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import ReviewList from "./reviewList";

export default function Reviews() {
  const navigate = useNavigate();

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
        <h1>Reviews</h1>

        <button
          onClick={() => navigate("/reviews/manage")}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Manage Reviews
        </button>
      </div>

      <ReviewList />
    </AdminLayout>
  );
}