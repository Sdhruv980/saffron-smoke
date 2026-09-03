import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import BookingList from "./BookingList";
import { FaCalendarAlt, FaCog } from "react-icons/fa";

export default function Booking() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="page-header-bar">
        <div className="page-header-left">
          <div className="page-icon-pill amber">
            <FaCalendarAlt />
          </div>
          <div>
            <h2>Table Reservations</h2>
            <p>Monitor guest requests, dining schedules, and table occupancy</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/bookings/manage")}
          className="btn-luxury-primary"
        >
          <FaCog style={{ marginRight: "8px" }} />
          Moderate Reservations
        </button>
      </div>

      <div className="admin-content-card">
        <BookingList />
      </div>
    </AdminLayout>
  );
}