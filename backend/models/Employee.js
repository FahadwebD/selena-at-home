const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    description: String,
    images: [String],

    age: String,
    nationality: String,
    language: String,
    height: String,
    phone: String,
    speciality: String,

    isWorkingToday: {
      type: Boolean,
      default: false,
    },

    startTime: {
      type: String,
      default: "10:00",
    },

    endTime: {
      type: String,
      default: "16:00",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);