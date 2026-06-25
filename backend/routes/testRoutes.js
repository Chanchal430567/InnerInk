const express = require("express");
const router = express.Router();

const sendEmail = require("../utils/sendEmail");

router.get("/", async (req, res) => {

  try {

    await sendEmail(
      process.env.EMAIL_USER,
      "🎉 InnerInk Test",
      "Congratulations! Your email service is working perfectly."
    );

    res.json({
      message: "Email sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;