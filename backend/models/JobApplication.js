const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    address: String,
    age: String,
    workRights: String,
    experience: String,
    availability: String,
    message: String,
    images: [String],
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);