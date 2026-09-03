import express from "express";
import fs from "fs";

const router = express.Router();

const FILE = "./data/booking.json";

// ==========================
// GET ALL BOOKINGS
// ==========================
router.get("/", (req, res) => {
  const bookings = JSON.parse(fs.readFileSync(FILE, "utf8"));
  res.json(bookings);
});

// ==========================
// ADD BOOKING
// ==========================
router.post("/", (req, res) => {
  const bookings = JSON.parse(fs.readFileSync(FILE, "utf8"));

  const newBooking = {
    id: Date.now(),
    status: "Pending",
    createdAt: new Date().toISOString(),
    ...req.body,
  };

  bookings.push(newBooking);

  fs.writeFileSync(FILE, JSON.stringify(bookings, null, 2));

  res.status(201).json({
    message: "Booking created successfully",
    data: newBooking,
  });
});

// ==========================
// UPDATE BOOKING
// ==========================
router.put("/:id", (req, res) => {
  const bookings = JSON.parse(fs.readFileSync(FILE, "utf8"));

  const id = Number(req.params.id);

  const index = bookings.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Booking not found",
    });
  }

  bookings[index] = {
    ...bookings[index],
    ...req.body,
  };

  fs.writeFileSync(FILE, JSON.stringify(bookings, null, 2));

  res.json({
    message: "Booking updated successfully",
    data: bookings[index],
  });
});

// ==========================
// DELETE BOOKING
// ==========================
router.delete("/:id", (req, res) => {
  const bookings = JSON.parse(fs.readFileSync(FILE, "utf8"));

  const id = Number(req.params.id);

  const updatedBookings = bookings.filter((b) => b.id !== id);

  fs.writeFileSync(FILE, JSON.stringify(updatedBookings, null, 2));

  res.json({
    message: "Booking deleted successfully",
  });
});

export default router;