const express = require("express");
const Price = require("../models/Price");

const router = express.Router();

// CREATE PRICE
router.post("/", async (req, res) => {
  try {
    const price = new Price(req.body);
    await price.save();

    res.status(201).json(price);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL PRICES
router.get("/", async (req, res) => {
  try {
    const prices = await Price.find().sort({ createdAt: -1 });
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE PRICE
router.put("/:id", async (req, res) => {
  try {
    const price = await Price.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json(price);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE PRICE
router.delete("/:id", async (req, res) => {
  try {
    await Price.findByIdAndDelete(req.params.id);

    res.json({ message: "Price deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;