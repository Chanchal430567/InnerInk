const express = require("express");
const router = express.Router();
const Diary = require("../models/Diary");
const authMiddleware = require("../middleware/authMiddleware");

const {
   getEntries,
   createEntry,
    updateEntry,
    deleteEntry
} = require("../controllers/diaryController");

// Get  entries
router.get("/", authMiddleware, getEntries);
// Create entry
router.post("/", authMiddleware, createEntry);

// Update entry
router.put("/:id", authMiddleware, updateEntry);

// Delete entry
router.delete("/:id", authMiddleware, deleteEntry);

module.exports = router;