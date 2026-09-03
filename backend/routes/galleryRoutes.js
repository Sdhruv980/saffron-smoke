import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const DATA_DIR = "./data";
const FILE = path.join(DATA_DIR, "gallery.json");

// Create data folder if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Create gallery.json if it doesn't exist
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify([], null, 2));
}

// Read gallery
function readGallery() {
  try {
    const data = fs.readFileSync(FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Save gallery
function saveGallery(gallery) {
  fs.writeFileSync(FILE, JSON.stringify(gallery, null, 2));
}

// ======================
// Get All Images
// ======================
router.get("/", (req, res) => {
  res.json(readGallery());
});

// ======================
// Add Image
// ======================
router.post("/", (req, res) => {
  const { title, image, description } = req.body;

  if (!title || !image) {
    return res.status(400).json({
      message: "Title and Image are required.",
    });
  }

  const gallery = readGallery();

  const newImage = {
    id: Date.now(),
    title,
    image,
    description: description || "",
    createdAt: new Date().toISOString(),
  };

  gallery.push(newImage);

  saveGallery(gallery);

  res.status(201).json({
    message: "Image added successfully.",
    image: newImage,
  });
});

// ======================
// Update Image
// ======================
router.put("/:id", (req, res) => {
  const gallery = readGallery();

  const index = gallery.findIndex(
    (item) => item.id == req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Image not found.",
    });
  }

  gallery[index] = {
    ...gallery[index],
    ...req.body,
  };

  saveGallery(gallery);

  res.json({
    message: "Image updated successfully.",
  });
});

// ======================
// Delete Image
// ======================
router.delete("/:id", (req, res) => {
  const gallery = readGallery();

  const updatedGallery = gallery.filter(
    (item) => item.id != req.params.id
  );

  saveGallery(updatedGallery);

  res.json({
    message: "Image deleted successfully.",
  });
});

export default router;