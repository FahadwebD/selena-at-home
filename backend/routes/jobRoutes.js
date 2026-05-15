const express = require("express");
const multer = require("multer");
const JobApplication = require("../models/JobApplication");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// CREATE JOB APPLICATION
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const images = req.files ? req.files.map((file) => file.filename) : [];

    const application = new JobApplication({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      age: req.body.age,
      workRights: req.body.workRights,
      experience: req.body.experience,
      availability: req.body.availability,
      message: req.body.message,
      images,
    });

    await application.save();

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL APPLICATIONS
router.get("/", async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// APPROVE APPLICATION
router.put("/:id/approve", async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { returnDocument: "after" }
    );

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE APPLICATION
router.delete("/:id", async (req, res) => {
  try {
    await JobApplication.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;