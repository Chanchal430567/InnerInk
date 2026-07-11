const Diary = require("../models/Diary");

const getEntries = async (req, res) => {

  try {

    console.log("Logged in user:", req.user);

    const entries = await Diary.find({
      userId: req.user.id,
    }).sort({ date: -1 });

    res.json(entries);

    console.log("Entries:", entries);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
const createEntry = async (req, res) => {

  try {

    const {
      title,
      content,
      mood,
      category,
    } = req.body;

    console.log("REQ.USER:", req.user);
console.log("REQ.BODY:", req.body);

    const newEntry = new Diary({
      title,
      content,
      mood,
      category,
      userId: req.user.id,
    });

    const savedEntry = await newEntry.save();

    res.status(201).json(savedEntry);

  } catch (error) {

    console.log("POST ERROR:", error);

    res.status(400).json({
      message: error.message,
    });

  }

};

const updateEntry = async (req, res) => {

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

};

const deleteEntry = async (req, res) => {
    try {
       await Diary.findByIdAndDelete(req.params.id);
       res.json({ message: "Entry deleted" });
     } catch (error) {
       res.status(500).json({ message: error.message });
     }
};

module.exports = {
   getEntries,
    createEntry,
    updateEntry,
    deleteEntry
};