const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const User = require("../models/User");

function generateOTP() {

  return crypto
    .randomInt(100000, 1000000)
    .toString();

}


// Register User
router.post("/register", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

// Login User
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

   const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    const otp = generateOTP();

    user.otp = otp;

    user.otpExpiry =
      new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    await sendEmail(
      user.email,
      "InnerInk Password Reset OTP",
      `Your OTP is: ${otp}\n\nThis OTP is valid for 5 minutes.`
    );

    res.json({
      message: "OTP sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});

// Verify OTP
router.post("/verify-otp", async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    if (user.otp !== otp) {

      return res.status(400).json({
        message: "Invalid OTP",
      });

    }

    if (new Date() > user.otpExpiry) {

      return res.status(400).json({
        message: "OTP has expired",
      });

    }

    const resetToken = jwt.sign(
  {
    id: user._id,
    email: user.email,
    type: "password-reset",
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "10m",
  }
);

res.json({
  message: "OTP verified successfully",
  resetToken,
});

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

// Reset Password
router.post("/reset-password", async (req, res) => {

  try {

    const { resetToken, newPassword } = req.body;

    const decoded = jwt.verify(
      resetToken,
      process.env.JWT_SECRET
    );

    if (
      decoded.type !== "password-reset"
    ) {

      return res.status(401).json({
        message: "Invalid token",
      });

    }

    const user = await User.findById(
      decoded.id
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password = hashedPassword;

    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      message:
        "Password reset successfully",
    });

  } catch (error) {

    res.status(400).json({
      message:
        "Reset token expired or invalid",
    });

  }

});

module.exports = router;