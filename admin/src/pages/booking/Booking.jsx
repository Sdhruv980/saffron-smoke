import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import BookingList from "./BookingList";

export default function Booking() {
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
        <h1>Booking Management</h1>

        <button
          onClick={() => navigate("/bookings/manage")}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Manage Bookings
        </button>
      </div>

      <BookingList />
    </AdminLayout>
  );
}