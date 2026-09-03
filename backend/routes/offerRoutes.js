import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const DATA_DIR = "./data";
const FILE = path.join(DATA_DIR, "offers.json");

// Create data folder if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Create offers.json if it doesn't exist
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify([], null, 2));
}

// Read offers
function readOffers() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return [];
  }
}

// Save offers
function saveOffers(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// =======================
// GET All Offers
// =======================
router.get("/", (req, res) => {
  res.json(readOffers());
});

// =======================
// ADD Offer
// =======================
router.post("/", (req, res) => {
  const {
    title,
    description,
    discount,
    image,
    startDate,
    endDate,
    status,
  } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Title and Description are required.",
    });
  }

  const offers = readOffers();

  const newOffer = {
    id: Date.now(),
    title,
    description,
    discount,
    image,
    startDate,
    endDate,
    status: status || "Active",
    createdAt: new Date().toISOString(),
  };

  offers.push(newOffer);

  saveOffers(offers);

  res.status(201).json({
    message: "Offer added successfully.",
    offer: newOffer,
  });
});

// =======================
// UPDATE Offer
// =======================
router.put("/:id", (req, res) => {
  const offers = readOffers();

  const index = offers.findIndex(
    (offer) => offer.id == req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Offer not found.",
    });
  }

  offers[index] = {
    ...offers[index],
    ...req.body,
  };

  saveOffers(offers);

  res.json({
    message: "Offer updated successfully.",
  });
});

// =======================
// DELETE Offer
// =======================
router.delete("/:id", (req, res) => {
  const offers = readOffers();

  const updatedOffers = offers.filter(
    (offer) => offer.id != req.params.id
  );

  saveOffers(updatedOffers);

  res.json({
    message: "Offer deleted successfully.",
  });
});

export default router;