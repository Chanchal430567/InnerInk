const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../services/emailService");

const {
    register,
    login,
    forgotPassword,
    verifyOTP,
    resetPassword,
} = require("../controllers/authController");

const User = require("../models/User");

function generateOTP() {

  return crypto
    .randomInt(100000, 1000000)
    .toString();

}

router.post("/register", register);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", resetPassword);

module.exports = router;