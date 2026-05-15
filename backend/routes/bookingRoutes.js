const express = require("express");
const Booking = require("../models/Booking");
const Employee = require("../models/Employee");

const router = express.Router();

const timeToMinutes = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

const minutesToTime = (minutes) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}`;
};

const getCurrentTimeInMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

// CREATE BOOKING WITH DURATION + OVERLAP VALIDATION
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      phone,
      therapistId,
      therapistName,
      serviceName,
      bookingTime,
      duration,
      note,
    } = req.body;

    const bookingDuration = Number(duration);

    const therapist = await Employee.findById(therapistId);

    if (!therapist) {
      return res.status(404).json({
        message: "Therapist not found",
      });
    }

    if (!therapist.isWorkingToday) {
      return res.status(400).json({
        message: "This therapist is not available today",
      });
    }

    const therapistStart = timeToMinutes(therapist.startTime || "10:00");
    const therapistEnd = timeToMinutes(therapist.endTime || "16:00");

    const requestedStart = timeToMinutes(bookingTime);
    const requestedEnd = requestedStart + bookingDuration;

    const currentTime = getCurrentTimeInMinutes();

    if (requestedStart < currentTime) {
      return res.status(400).json({
        message: "You cannot book a past time today",
      });
    }

    if (requestedStart < therapistStart || requestedEnd > therapistEnd) {
      return res.status(400).json({
        message: `Please choose a time between ${therapist.startTime} and ${therapist.endTime}`,
      });
    }

    const bookings = await Booking.find({
      therapistId,
      status: { $ne: "Cancelled" },
    });

    const hasOverlap = bookings.some((booking) => {
      const existingStart = timeToMinutes(booking.bookingTime);
      const existingEnd = timeToMinutes(booking.endTime);

      return requestedStart < existingEnd && requestedEnd > existingStart;
    });

    if (hasOverlap) {
      return res.status(400).json({
        message:
          "This therapist already has a booking during that time. Please choose another time.",
      });
    }

    const booking = new Booking({
      customerName,
      phone,
      therapistId,
      therapistName,
      serviceName,
      bookingTime,
      duration: bookingDuration,
      endTime: minutesToTime(requestedEnd),
      note,
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ALL BOOKINGS
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET BOOKINGS FOR ONE THERAPIST
router.get("/therapist/:therapistId/times", async (req, res) => {
  try {
    const bookings = await Booking.find({
      therapistId: req.params.therapistId,
      status: { $ne: "Cancelled" },
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// APPROVE BOOKING
router.put("/:id/approve", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { returnDocument: "after" }
    );

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE BOOKING
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      message: "Booking deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;