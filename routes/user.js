const express = require("express");
const {
  signupUser,
  loginUser,
  checkError,
} = require("../controllers/userController");
const router = express.Router();

//Login routes
router.post("/login", loginUser);

//SignUp route
router.post("/signup", signupUser);

//CheckError route
router.post("/check", checkError);

module.exports = router;
