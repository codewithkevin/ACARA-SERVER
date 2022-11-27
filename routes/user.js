const express = require("express");
const { signupUser, loginUser } = require("../controllers/userController");
const router = express.Router();

//Login routes
router.post("/login", signupUser);

//SignUp route
router.post("/signup", loginUser);

module.exports = router;
