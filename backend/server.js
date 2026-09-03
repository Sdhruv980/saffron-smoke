import express from "express";
import cors from "cors";

import menuRoutes from "./routes/menuRoutes.js";

import bookingRoutes from "./routes/bookingRoutes.js";

import reviewRoutes from "./routes/reviewroutes.js";

import offerRoutes from "./routes/offerRoutes.js";

import adminRoutes from "./routes/adminroutes.js";

import galleryRoutes from "./routes/galleryRoutes.js";

import messageRoutes from "./routes/messageRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/messages", messageRoutes);

app.listen(5000, () => {
  console.log("Server Running on 5000");
});