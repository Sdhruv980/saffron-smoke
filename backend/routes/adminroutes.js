import express from "express";
import fs from "fs";

const router = express.Router();
const FILE = "./data/admin.json";

router.get("/", (req, res) => {
  res.json({
    message: "Admin Route Working"
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Read all admins from JSON file
  const admins = JSON.parse(fs.readFileSync(FILE, "utf8"));

  // Find matching admin
  const admin = admins.find(
    (a) => a.email === email && a.password === password
  );

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  res.json({
    success: true,
    message: "Login Successful",
    admin: {
      id: admin.id,
      email: admin.email,
    },
  });
});

export default router;