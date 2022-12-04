const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  interest: {
    type: Array,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Stateic SingUp Method
userSchema.statics.signup = async function (email, password, name, interest) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email Already Exist");
  }

  //Validation
  if (!email || !password || !name || !interest) {
    throw new Error("All Feilds are required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email not Valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not Strong");
  }

  if (interest.length < 3) {
    throw new Error("At least 3 interests are required");
  }

  //Generate Salt
  const salt = await bcrypt.genSalt(10);

  //Hashing the password
  const hash = await bcrypt.hash(password, salt);

  //Create User
  const user = await this.create({ email, password: hash, name });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

userSchema.statics.check = async function (email, password) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email Already Exist");
  }

  //Validation
  if (!email || !password) {
    throw new Error("All Feilds are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email not Valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not Strong");
  }
};

module.exports = mongoose.model("User", userSchema);
