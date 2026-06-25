const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  mood: {
    type: String,
    default: "😌",
  },

  category: {
    type: String,
    default: "Diary",
  },

  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Diary", diarySchema);