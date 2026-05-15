const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const serviceRoutes = require("./routes/serviceRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const priceRoutes = require("./routes/priceRoutes");
const jobRoutes = require("./routes/jobRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/services", serviceRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/prices", priceRoutes);
app.use("/api/jobs", jobRoutes);


app.get("/", (req, res) => {
  res.send("Backend Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));