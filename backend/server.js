const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const diaryRoutes = require("./routes/diaryRoutes");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

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