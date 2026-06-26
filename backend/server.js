const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const cors = require("cors");
require("dotenv").config();

connectDB();

const diaryRoutes = require("./routes/diaryRoutes");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/diary", diaryRoutes);
app.use("/api/test-email", testRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("InnerInk Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});