const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// const createToken = (_id) => {
//   return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
// };

//Login a user
const loginUser = async (req, res) => {
  res.send("Hello World");
};

//SignUp
const signupUser = async (req, res) => {
  res.send("Hello World");
};


module.exports = { signupUser, loginUser };
