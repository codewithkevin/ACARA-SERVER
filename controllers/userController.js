const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};

//Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//SignUp
const signupUser = async (req, res) => {
  const { email, password, name, interest } = req.body;

  try {
    const user = await User.signup(email, password, name, interest);

    // create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token, name, interest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//CheckError
const checkError = async (req, res) => {
  const { email, password } = req.body;

  try {
    const faultyerror = await User.check(email, password);
    res.status(200).json({ email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//CheckInterest
const interestError = async (req, res) => {
  const { interest } = req.body;

  try {
    const faultyerror = await User.checkInterest(interest);
    res.status(200).json({ interest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, checkError, interestError };
