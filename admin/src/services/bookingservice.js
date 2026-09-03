import API_BASE from "./config";
const API = `${API_BASE}/api/bookings`;

// ==========================
// GET ALL BOOKINGS
// ==========================
export async function getBookings() {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to load bookings");
  }

  return await response.json();
}

// ==========================
// ADD BOOKING
// ==========================
export async function addBooking(booking) {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    throw new Error("Failed to add booking");
  }

  return await response.json();
}

// ==========================
// UPDATE BOOKING
// ==========================
export async function updateBooking(id, booking) {
  const response = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    throw new Error("Failed to update booking");
  }

  return await response.json();
}

// ==========================
// DELETE BOOKING
// ==========================
export async function deleteBooking(id) {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete booking");
  }

  return await response.json();
}