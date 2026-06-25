const express = require("express");
const router = express.Router();
const Diary = require("../models/Diary");

// Get  entries
router.get("/", async (req, res) => {
  try {

    const { userId } = req.query;

    const entries = await Diary.find({
      userId,
    }).sort({ date: -1 });

    res.json(entries);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

// Create entry
router.post("/", async (req, res) => {
  try {

    console.log("BODY:", req.body);

    const newEntry = new Diary(req.body);

    const savedEntry = await newEntry.save();

    res.status(201).json(savedEntry);

  } catch (error) {

    console.log("POST ERROR:", error);

    res.status(400).json({
      message: error.message
    });

  }
});

// Update entry
router.put("/:id", async (req, res) => {
  try {
    const updatedEntry = await Diary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete entry
router.delete("/:id", async (req, res) => {
  try {
    await Diary.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;