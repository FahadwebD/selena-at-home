const express = require("express");
const multer = require("multer");
const Employee = require("../models/Employee");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// CREATE THERAPIST
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const images = req.files ? req.files.map((file) => file.filename) : [];

    const employee = new Employee({
      name: req.body.name,
      role: req.body.role,
      description: req.body.description,

      age: req.body.age,
      nationality: req.body.nationality,
      language: req.body.language,
      height: req.body.height,
      phone: req.body.phone,
      speciality: req.body.speciality,

      images,

      isWorkingToday: false,

      startTime: req.body.startTime || "10:00",
      endTime: req.body.endTime || "16:00",
    });

    await employee.save();

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ALL THERAPISTS
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({
      createdAt: -1,
    });

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ACTIVE TODAY THERAPISTS
router.get("/today", async (req, res) => {
  try {
    const employees = await Employee.find({
      isWorkingToday: true,
    });

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE THERAPIST
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      role: req.body.role,
      description: req.body.description,

      age: req.body.age,
      nationality: req.body.nationality,
      language: req.body.language,
      height: req.body.height,
      phone: req.body.phone,
      speciality: req.body.speciality,

      startTime: req.body.startTime,
      endTime: req.body.endTime,
    };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.filename);
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        returnDocument: "after",
      }
    );

    res.json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// TOGGLE ACTIVE TODAY
router.put("/:id/toggle-working", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Therapist not found",
      });
    }

    employee.isWorkingToday = !employee.isWorkingToday;

    await employee.save();

    res.json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE THERAPIST
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      message: "Therapist deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;