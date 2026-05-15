const express = require("express");
const multer = require("multer");
const Service = require("../models/Service");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// CREATE service
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const service = new Service({
      name: req.body.name,
      description: req.body.description,
      image: req.file ? req.file.filename : "",
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE service
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const service = await Service.findByIdAndUpdate(req.params.id, updateData, 
        { returnDocument: "after" },
    );

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE service
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;