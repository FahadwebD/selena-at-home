const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    therapistName: {
      type: String,
      required: true,
    },

    serviceName: {
      type: String,
      required: true,
    },

    bookingTime: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
      default: 60,
    },

    endTime: {
      type: String,
      required: true,
    },

    note: {
      type: String,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);