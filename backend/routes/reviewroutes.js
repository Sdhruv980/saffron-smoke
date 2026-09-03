import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const DATA_DIR = "./data";
const FILE = path.join(DATA_DIR, "reviews.json");

// Ensure data folder and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify([], null, 2));
}

// Read reviews
function readReviews() {
  try {
    const data = fs.readFileSync(FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
}

// Save reviews
function saveReviews(reviews) {
  fs.writeFileSync(FILE, JSON.stringify(reviews, null, 2));
}

// ====================
// Add Review
// ====================
router.post("/", (req, res) => {
  const { name, rating, review } = req.body;

  if (!name || !rating || !review) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  const reviews = readReviews();

  const newReview = {
    id: Date.now(),
    name,
    rating: Number(rating),
    review,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  reviews.push(newReview);

  saveReviews(reviews);

  res.status(201).json({
    message: "Review submitted successfully.",
    review: newReview,
  });
});

// ====================
// Get Reviews
// ====================
router.get("/", (req, res) => {
  res.json(readReviews());
});

// ====================
// Update Review
// ====================
router.put("/:id", (req, res) => {
  const reviews = readReviews();

  const index = reviews.findIndex(
    (review) => review.id == req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Review not found.",
    });
  }

  reviews[index] = {
    ...reviews[index],
    ...req.body,
  };

  saveReviews(reviews);

  res.json({
    message: "Review updated successfully.",
  });
});

// ====================
// Delete Review
// ====================
router.delete("/:id", (req, res) => {
  const reviews = readReviews();

  const updatedReviews = reviews.filter(
    (review) => review.id != req.params.id
  );

  saveReviews(updatedReviews);

  res.json({
    message: "Review deleted successfully.",
  });
});

export default router;