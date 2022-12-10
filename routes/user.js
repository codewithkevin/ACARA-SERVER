const express = require("express");
const {
  signupUser,
  loginUser,
  checkError,
  interestError,
  sendEmail,
  confirmedEmail,
} = require("../controllers/userController");
const router = express.Router();

//Login routes
router.post("/login", loginUser);

//SignUp route
router.post("/signup", signupUser);

//CheckError route
router.post("/check", checkError);

//Interest Error
router.post("/checkinterest", interestError);

//Send Email
router.post("/sendmail", sendEmail);

//Check Confirmation Code
router.post("/confirmcode", confirmedEmail);

module.exports = router;
