import express from "express";
import cors from "cors";

import menuRoutes from "./routes/menuroutes.js";

import bookingRoutes from "./routes/bookingroutes.js";

import reviewRoutes from "./routes/reviewroutes.js";

import offerRoutes from "./routes/offerRoutes.js";

import adminRoutes from "./routes/adminroutes.js";

import galleryRoutes from "./routes/galleryRoutes.js";

import messageRoutes from "./routes/messageRoutes.js";
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());
app.use(express.json());

app.use("/api/menu", menuRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});