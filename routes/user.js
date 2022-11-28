const express = require("express");
const { signupUser, loginUser } = require("../controllers/userController");
const router = express.Router();

//Login routes
router.post("/login", loginUser);

//SignUp route
router.post("/signup", signupUser);

module.exports = router;
