const express = require("express");
const router = express.Router();

//Login routes
router.post("/login", (req, res) => {
  res.send("Hello World");
});

//SignUp route
router.post("/signup", (req, res) => {
  res.send("Hello World");
});


module.exports = router;
