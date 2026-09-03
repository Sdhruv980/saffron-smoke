import express from "express";
import fs from "fs";

const router = express.Router();

const FILE = "./data/menu.json";

// GET all menu items
router.get("/", (req, res) => {
  const menu = JSON.parse(fs.readFileSync(FILE, "utf8"));
  res.json(menu);
});

// POST new menu item
router.post("/", (req, res) => {
  const menu = JSON.parse(fs.readFileSync(FILE, "utf8"));

  const newItem = {
    id: Date.now(),
    ...req.body,
  };

  menu.push(newItem);

  fs.writeFileSync(FILE, JSON.stringify(menu, null, 2));

  res.status(201).json({
    message: "Menu item added successfully",
    data: newItem,
  });
});

// =========================
// UPDATE MENU ITEM
// =========================
router.put("/:id", (req, res) => {
  const menu = JSON.parse(fs.readFileSync(FILE, "utf8"));

  const id = Number(req.params.id);

  const index = menu.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Menu item not found",
    });
  }

  menu[index] = {
    ...menu[index],
    ...req.body,
  };

  fs.writeFileSync(FILE, JSON.stringify(menu, null, 2));

  res.json({
    message: "Menu updated successfully",
    data: menu[index],
  });
});

// =========================
// DELETE MENU ITEM
// =========================
router.delete("/:id", (req, res) => {
  const menu = JSON.parse(fs.readFileSync(FILE, "utf8"));

  const id = Number(req.params.id);

  const updatedMenu = menu.filter((item) => item.id !== id);

  fs.writeFileSync(FILE, JSON.stringify(updatedMenu, null, 2));

  res.json({
    message: "Menu deleted successfully",
  });
});

export default router;