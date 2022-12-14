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
  username: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

//Stateic SingUp Method
userSchema.statics.signup = async function (
  email,
  password,
  name,
  interest,
  username,
  gender
) {
  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("username already exists");
  }

  //Validation
  if (!name || !username || !gender) {
    throw new Error("All Feilds are required");
  }

  //Generate Salt
  const salt = await bcrypt.genSalt(10);

  //Hashing the password
  const hash = await bcrypt.hash(password, salt);

  //Create User
  const user = await this.create({
    email,
    password: hash,
    name,
    interest,
    username,
    gender,
  });

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

  if (!email || !password) {
    throw Error("All Feilds are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email not Valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not Strong");
  }
};

userSchema.statics.checkInterest = async function (interest) {
  if (interest.length < 3) {
    throw new Error("At least 3 interests are required");
  }
};

module.exports = mongoose.model("User", userSchema);
