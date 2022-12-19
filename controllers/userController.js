const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// const code = "1234";
var code;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};

//Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    const details = await User.find({ token });

    res.status(200).json({ email, token, details });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//SignUp
const signupUser = async (req, res) => {
  const { email, password, name, interest, username, gender } = req.body;

  try {
    const user = await User.signup(
      email,
      password,
      name,
      interest,
      username,
      gender
    );

    // create a token
    const token = createToken(user._id);

    const details = await User.find({ token });

    res.status(200).json({ email, token, details });
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

//Send Email Notification
const sendEmail = async (req, res) => {
  const { email } = req.body;

  generateRandomDigits();

  let mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  let details = {
    from: "ACARA MOBILE APP",
    to: `${email}`,
    subject: "Verification Code",
    text: `${code}`,
  };

  mailTransport.sendMail(details, (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ err: err.message });
    }
    if (!err) {
      console.log("Sucessfully sent mail");
      res.status(200).json({ email: "Email Sent" });
    }
  });
};

//Generate number
function generateRandomDigits() {
  // Generate four random digits
  var randomDigits = Math.floor(Math.random() * 9000) + 1000;

  // Update the global variable with the new random digits
  code = randomDigits;
}

//Check Email Confirmed
const confirmedEmail = async (req, res) => {
  const { confirm } = req.body;

  if (confirm == code) {
    res.status(200).json({ code: "Confirmed Email" });
  } else {
    res.status(400).json("Not Implemented");
  }
};

module.exports = {
  signupUser,
  loginUser,
  checkError,
  interestError,
  sendEmail,
  confirmedEmail,
};
