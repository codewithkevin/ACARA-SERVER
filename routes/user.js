const express = require("express");
const {
  signupUser,
  loginUser,
  checkError,
  interestError,
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


module.exports = router;
