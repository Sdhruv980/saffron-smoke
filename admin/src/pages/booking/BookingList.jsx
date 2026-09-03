import { useEffect, useState } from "react";
import {
  getBookings,
  updateBooking,
  deleteBooking,
} from "../../services/bookingService";

export default function BookingList({
  manage = false,
  refresh,
  onRefresh,
}) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, [refresh]);

  async function loadBookings() {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
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

  return (
    <table
      border="1"
      cellPadding="10"
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Guests</th>
          <th>Status</th>

          {manage && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.name}</td>

            <td>{booking.date}</td>

            <td>{booking.time}</td>

            <td>{booking.guests}</td>

            <td>{booking.status}</td>

            {manage && (
              <td>
                <button
                  onClick={() =>
                    changeStatus(booking.id, "Accepted")
                  }
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    changeStatus(booking.id, "Rejected")
                  }
                  style={{ marginLeft: 10 }}
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    changeStatus(booking.id, "Completed")
                  }
                  style={{ marginLeft: 10 }}
                >
                  Complete
                </button>

                <button
                  onClick={() => removeBooking(booking.id)}
                  style={{
                    marginLeft: 10,
                    background: "red",
                    color: "white",
                  }}
                >
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}