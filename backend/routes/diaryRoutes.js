const express = require("express");
const router = express.Router();
const Diary = require("../models/Diary");

const {
   getEntries,
   createEntry,
    updateEntry,
    deleteEntry
} = require("../controllers/diaryController");

// Get  entries
router.get("/", getEntries);

// Create entry
router.post("/", createEntry);

// Update entry
router.put("/:id", updateEntry);

// Delete entry
router.delete("/:id", deleteEntry);

module.exports = router;