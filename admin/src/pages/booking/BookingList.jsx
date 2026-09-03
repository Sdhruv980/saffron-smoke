import { useEffect, useState } from "react";
import {
  getBookings,
  updateBooking,
  deleteBooking,
} from "../../services/bookingservice";
import { FaCalendarCheck, FaTrash, FaCheck, FaTimes, FaCalendarAlt } from "react-icons/fa";

export default function BookingList({
  manage = false,
  refresh,
  onRefresh,
}) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, [refresh]);

  async function loadBookings() {
    try {
      setLoading(true);
      const data = await getBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(id, status) {
    try {
      await updateBooking(id, { status });
      loadBookings();
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
    }
  }

  async function removeBooking(id) {
    if (!window.confirm("Delete booking?")) return;

    try {
      await deleteBooking(id);
      loadBookings();
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
      case "Confirmed":
        return "status-badge accepted";
      case "Rejected":
      case "Cancelled":
        return "status-badge rejected";
      case "Completed":
        return "status-badge completed";
      default:
        return "status-badge pending";
    }
  };

  return (
    <div className="table-wrapper">
      <table className="luxury-table">
        <thead>
          <tr>
            <th>Guest Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Party Size</th>
            <th>Status</th>
            {manage && <th style={{ textAlign: "center" }}>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={manage ? 6 : 5} className="table-state-cell">
                <div className="table-spinner"></div>
                <span>Loading reservations...</span>
              </td>
            </tr>
          ) : bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="item-name-cell">
                  <strong>{booking.name}</strong>
                  {booking.phone && <div className="cell-subtext">{booking.phone}</div>}
                </td>

                <td>{booking.date || "—"}</td>

                <td>
                  <span className="time-pill">{booking.time || "—"}</span>
                </td>

                <td>
                  <span className="guest-count-pill">{booking.guests || 2} Guests</span>
                </td>

                <td>
                  <span className={getStatusClass(booking.status)}>
                    {booking.status || "Pending"}
                  </span>
                </td>

                {manage && (
                  <td style={{ textAlign: "center" }}>
                    <div className="action-buttons-group">
                      <button
                        onClick={() => changeStatus(booking.id, "Accepted")}
                        className="btn-action-accept"
                        title="Accept Reservation"
                      >
                        <FaCheck />
                        <span>Accept</span>
                      </button>

                      <button
                        onClick={() => changeStatus(booking.id, "Rejected")}
                        className="btn-action-reject"
                        title="Reject Reservation"
                      >
                        <FaTimes />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={() => changeStatus(booking.id, "Completed")}
                        className="btn-action-complete"
                        title="Mark Completed"
                      >
                        <FaCalendarCheck />
                        <span>Done</span>
                      </button>

                      <button
                        onClick={() => removeBooking(booking.id)}
                        className="btn-action-delete"
                        title="Delete Booking"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={manage ? 6 : 5} className="table-state-cell empty">
                <FaCalendarAlt className="empty-icon" />
                <p>No reservations currently booked.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}